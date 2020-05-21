<template>
    <div>
      <h2>大文件上传-断点续传</h2>
      <div>
        <input type="file" @change="handleFileChange" />
        <!-- <el-button type="primary" @click="handleUpload" :disabled="uploadDisabled">上传</el-button> -->
        <el-button type="primary" @click="handleUpload">上传</el-button>
        <el-button type="primary" @click="uploadSlow">慢启动上传</el-button>
        <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
        <el-button
          v-else
          :disabled="status !== Status.uploading || !container.hash"
          @click="handlePause"
        >暂停</el-button>
        <div>
          <div>计算文件 hash</div>
          <el-progress :percentage="hashProgress"></el-progress>
          <div>总进度</div>
          <el-progress :percentage="fakeProgress"></el-progress>
        </div>
        <div class="cube-container" :style="{width:cubeWidth+'px'}">
          <div class="cube"
               v-for="chunk in chunks"
               :key="chunk.hash">
            <div
            :class="{
            'uploading':chunk.progress>0&&chunk.progress<100,
            'success':chunk.progress==100,
            'error':chunk.progress<0,
            }"
              :style="{height:chunk.progress+'%'}"
            >
              {{chunk.index}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" scoped>
  .cube-container
    width 100px
    overflow hidden
  .cube
    width 14px
    height 14px
    line-height 12px;
    border 1px solid black
    background  #eee
    float left
    >.success
      background #67C23A
    >.uploading
      background #409EFF
    >.error
      background #F56C6C
</style>

<script>
  import sparkMd5 from "spark-md5";
  import {post, request} from "../../utils/upload";

  //定义文件的基本常量
    const　SIZE = 0.2*1024*1024;
    //定义基本的状态标识
    const STATUS = {
      wait:'WAIT',
      pause:'PAUSE',
      uploading: "UPLOADING",
      error: "ERROR",
      done: "DONE",
    };

    //技术点:
    //由于大文件上传采用hash计算，随后进行切分,意外情况下每一个片段也不会丢掉错乱
    //1.计算hash需要大量的内存和时间，采用requestIdleCallback来获取每一帧的空闲时间，去解决该部分
    //2.时间切片分解任务量，执行任务速率提升
    //3. 抽样hash进行处理，判断文件是否存在,
    //网络请求并发控制
    //tcp用塞问题，动态调整每一部分的大小
    //

    export default {
        data:()=>({
          container:{
            file:null
          },
          chunks:[], //碎片列表
          hashProgress:0, //计算hash的进度
          requestList:[],  //请求列表，方便abort
          STATUS,　//常量枚举档案
          status:STATUS.wait, //默认等待状态
          fakeProgress:0 //总的文件上传进度（通过监听各切片计算得出的）
        }),

      computed:{
          //进度条改善为正方形
          cubeWidth(){
            return Math.ceil(Math.sqrt(this.chunks.length))*16
          },

        //更新进度条
        uploadProgress(){
            if (this.container.file||!this.chunks.length) return 0;
            const loaded = this.chunks.map(item=>item.size*item.progress)
              .reduce((acc,cur)=>acc+cur);
            return parseInt((loaded/this.container.file.size).toFixed(2));
        }
      },

      watch:{
          uploadProgress(now){
             if (now>this.fakeProgress){
               this.fakeProgress = now;
             }
          }
        },

      methods:{
          handleFileChange(e){
            const [file] = e.target.files;
            if (!file)return;
            this.container.file = file;
          },

          //重新发送
          async handleResume(){
            this.status = STATUS.uploading;

            const { uploadList } = await this.verify(
              this.container.file.name,
              this.container.hash
            );

            await  this.uploadChunks(uploadList)
          },

          //暂停
          handlePause(){
            this.status = STATUS.pause;
            this.requestList.forEach(xhr=>xhr&&xhr.abort());//.push等用法实际是xhr.abort(),因为原型链的关系
            this.requestList = [];
          },

          //文件切片
          createFileChunk(file,size=SIZE){
              //生成文件块
              const chunks = [];
              let cur = 0;
              while (cur< file.size){
                chunks.push({file:file.slice(cur,cur+size)});
                cur +=size;
            }
              return chunks;
          },

          //创建并更新上传进度条
          createProgressHandler(item){
            return e=>{
              item.progress = parseInt(String((e.loaded/e.total)*100));
            }
          },

          //异步上传文件切片－进行并发控制
          async sendRequest(urls,max = 4,retrys = 3){
            console.log(urls,max);
            return new Promise((resolve, reject) => {
                const len = urls.length;
                let idx = 0;
                let counter = 0; //已上传文件数
                const retryList = []; //abort（暂停）的列表
                const start = async ()=>{
                    //控制并发数
                    while (counter<len && max>0){
                      max--;　//如果有请求进来，占用并发数
                      console.log(idx,'start');
                      const i = urls.findIndex(v=>v.status === STATUS.wait || v.status === STATUS.error);//等待或者error
                      urls[i].status = STATUS.uploading; //修改状态
                      const form = urls[i].form;
                      const index = urls[i].index;
                      if (typeof retryList[index] === 'number'){
                          console.log('重试',index);
                      }
                      request({
                        url:'/upload',
                        data:form,
                        onProgress:this.createProgressHandler(this.chunks[index]),
                        requestList:this.requestList
                      }).then(()=>{
                          urls[i].status = STATUS.done;
                          max++;
                          counter++;
                          urls[counter].done = true;
                          if (counter === len){
                            resolve();
                          }else{
                            start();
                          }
                      }).catch(()=>{
                        //初始值
                        urls[i].status = STATUS.error;
                        if (typeof retryList[index] !== 'number'){
                          retryList[index] = 0;
                        }

                        //次数累加
                        retryList[index]++

                        //允许一个请求重试三次
                        if (retryList[index] >= 2){
                          return reject()
                        }
                        console.log(index, retryList[index],'次报错')
                        // 3次报错以内的 重启
                        this.chunks[index].progress = -1; //报错的进度
                        max++; //释放通道，但是counter不累加

                        start();
                      })
                    }
                }
                start();
            });
          },

        //文件合并发送
        async mergeRequest(){
              await post("/merge",{
                filename:this.container.file.name,
                size:SIZE,
                fileHash: this.container.hash
              });
        },

        //上传所有的文件碎片
        async uploadChunks(uploadedList = []){
            //瞬发所有的片段，容易造成tcp堵塞,需要进行异步请求的并发控制

          //获取所有的文件碎片列表
          const list = this.chunks
            .filter(chunk=>chunk=>uploadedList.indexOf(chunk.hash)  === -1)
            .map(({chunk,hash,index},i)=>{
              const form = new FormData();
              form.append("chunk", chunk);
              form.append("hash", hash);
              form.append("filename", this.container.file.name);
              form.append("fileHash", this.container.hash);
              return {form,index,status:STATUS.wait}
            });

            try{
              const ret = await this.sendRequest(list,4);　//等待所有的碎片上传完毕
              if (uploadedList.length + list.length === this.chunks.length){
                await this.mergeRequest();
              }
            }catch (e) {
              this.$message.error('亲 上传失败了,考虑重试下呦');
            }

        },

        /**
         * 获取文件的hash
         * 1.全量计算-太慢了－借助worker线程也不行，大并发直接干死
         * 2.通过requestIdleCallback，分析浏览器的控制时间
         * 3.抽样计算，牺牲识别率来减少计算时间
         * @returns {Promise<*>}
         */
        //通过requestIdleCallback
        async calculateHashIdle(chunks){
          return new Promise((resolve, reject) => {
            const spark = new sparkMd5.ArrayBuffer();
            let count = 0;
            const appendToSpark = async file=>{
              return new Promise(resolve=>{
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload =e=>{
                  spark.append(e.target.result);
                  resolve();
                };
              });
            };

            const workLoop = async deadline =>{
              //有任务但是当前帧数还没结束
              while (count < chunks.length&&deadline.timeRemaining() > 1){
                await appendToSpark(chunks[count].file);
                count++;
                // 没有了 计算完毕
                if (count < chunks.length) {
                  // 计算中
                  this.hashProgress = Number(
                    ((100 * count) / chunks.length).toFixed(2)
                  );
                  // console.log(this.hashProgress)
                } else {
                  // 计算完毕
                  this.hashProgress = 100;
                  resolve(spark.end());
                }
              }
              window.requestIdleCallback(workLoop);
            };
            window.requestIdleCallback(workLoop);
          });
        },

        //抽样计算hash
        async calculateHashSample(){
            return new Promise((resolve, reject) => {
              const spark = new sparkMd5.ArrayBuffer();
              const reader = new FileReader();
              const file = this.container.file;

              const size = this.container.file.size;
              //设定刚开始的文件大小
              let offset = 2*1024*1024;

              //切分文件,取头部和尾部．中部各取一部分进行hash抽样
              let chunks = [file.slice(0,offset)];

              let cur = offset;
              while(cur < size){
                  if (cur+offset > size){
                    chunks.push(file.slice(cur,cur+offset))
                  } else{
                    //每一部分的前中后各取两个字节
                    const mid = cur+offset/2;
                    const end = cur+offset;
                    chunks.push(file.slice(cur,cur+2));
                    chunks.push(file.slice(mid,mid+2));
                    chunks.push(file.slice(end-2,end));
                  }
                  cur +=offset;
              }

              reader.readAsArrayBuffer(new Blob(chunks));
              reader.onload = e =>{
                spark.append(e.target.result);

                resolve(spark.end());
              };

            });
        },


        //核查－获取已上传的文件列表
        async verify(filename, hash) {
          return await post("/verify", {filename, hash});
        },


        //文件上传－结合tcp慢启动的文件上传
        async uploadSlow(){

        },

        //文件上传－切片比较进行上传
        async handleUpload() {
            if (!this.container.file) return;
            this.status = STATUS.uploading;

            //切片文件
            const chunks = this.createFileChunk(this.container.file);
            console.log(`碎片${chunks}`);

            console.time("samplehash");

            //进行抽样，大概率确定文件是否存在,获取文件的hash
            //之前的文件碎片命名（不安全）：文件名 + 切片下标作为切片 hash

            // this.container.hash = await this.calculateHashIdle(chunks);
            // console.log("hash1", this.container.hash);

            //改进，通过解析整个文件来确定hash，全量计算hash太慢．采用抽样的方式计算
            //计算hash
            this.container.hash = await this.calculateHashSample();

            console.timeEnd("samplehash");

            //判断文件是否存在，如果不存在，获取已经上传的切片
            const {uploaded,uploadedList} = await this.verify(
              this.container.file.name,
              this.container.hash
            );

            if (uploaded){
              return this.$message.success('秒传:上传成功');
            }

            this.chunks = chunks.map((chunk,index)=>{
              //保证每个块都有独特的标识
              const chunkName = this.container.hash +"-"+ index;
              return {
                fileHash:this.container.hash,
                chunk:this.file,
                index,
                progress:uploadedList.index(chunkName)>-1?100:0,
                size:chunk.file.size
              }
            });

            //传入已经上传过的切片清单
            await this.uploadChunks(uploadedList);
        }
      }
    }
</script>
