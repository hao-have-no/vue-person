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
              <!--{{chunk.index}}-->
               <i v-if="chunk.progress<100" class="el-icon-loading" style="color:#F56C6C;"></i>
            </div>
          </div>
        </div>
        <div v-if="fileAddress">
          <h3>上传成功</h3>
          <p>文件地址:<a :href="fileAddress">{{fileName}}</a></p>
        </div>
      </div>
    </div>
</template>

<style lang="stylus" scoped>
  .cube-container
    width 100px
    overflow hidden
  .cube
    width 80px
    height 80px
    line-height 80px;
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

  const SIZE = 0.2 * 1024 * 1024;
  const Status = {
    wait: "wait",
    pause: "pause",
    uploading: "uploading",
    error: "error",
    done: "done",
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
          Status,　//常量枚举档案
          status:Status.wait, //默认等待状态
          fakeProgress:0, //总的文件上传进度（通过监听各切片计算得出的）
          fileAddress:null,
          fileName:null
        }),

      computed:{
          //进度条改善为正方形
          cubeWidth(){
            return Math.ceil(Math.sqrt(this.chunks.length))*84
          },

        //更新进度条
        uploadProgress(){
            console.log(this.container.file,this.chunks.length);
            if (!this.container.file||!this.chunks.length) return 0;
            const loaded = this.chunks.map(item=>item.size*item.progress)
              .reduce((acc,cur)=>acc+cur);
            console.log('progress',loaded,this.container.file.size);
            return parseInt((loaded/this.container.file.size).toFixed(2));
        }
      },

      watch:{
          uploadProgress(now){
            console.log('fake',now);
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
            this.status = Status.uploading;

            const uploadList = await this.verify(
              this.container.file.name,
              this.container.hash
            );

            await this.uploadChunks(uploadList)
          },

          //暂停
          handlePause(){
            this.status = Status.pause;
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
            return new Promise((resolve, reject) => {
                const len = urls.length;
                let counter = 0; //已上传文件数
                const retryList = []; //abort（暂停）的列表
                const start = async ()=>{
                    //控制并发数
                    while (counter<len && max>0){
                      console.log(urls,max);
                      max--;　//如果有请求进来，占用并发数
                      const i = urls.findIndex(v=>v.status == Status.wait || v.status == Status.error);//等待或者error
                      if (i == -1){
                        if (counter === len){
                          resolve();
                          return;
                        }else{
                          console.log('error-url',urls);
                            start();
                          return;
                        }
                      }

                      urls[i].status = Status.uploading; //修改状态
                      const form = urls[i].form;
                      const index = urls[i].index;
                      if (typeof retryList[index] == 'number'){
                          console.log('重试',index);
                      }

                      //todo
                      //疑问点:catch还没捕获错误的时候，已经error
                      //导致重发成功后状态不改变

                      request({
                        url:'/upload',
                        data:form,
                        onProgress:this.createProgressHandler(this.chunks[index]),
                        requestList:this.requestList
                      }).then(()=>{
                          urls[i].status = Status.done;

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
                        console.log(i.urls);

                        const j = urls.filter(v=>v.status == Status.done);//等待或者error

                        if (j.length === urls.length){
                          resolve();
                          return;
                        }


                        urls[i].status = Status.error;
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
              }).then((result)=>{
                if (result.filePath){
                  this.fileAddress = result.filePath;
                  this.fileName = result.fileName
                }
              });
        },

        //上传所有的文件碎片
        async uploadChunks(uploadedList = []){
            //瞬发所有的片段，容易造成tcp堵塞,需要进行异步请求的并发控制

          //获取所有的文件碎片列表
          const list = this.chunks
            .filter(chunk=>uploadedList.indexOf(chunk.hash)  == -1)
            .map(({chunk,hash,index},i)=>{
              const form = new FormData();
              form.append("chunk", chunk);

              form.append("hash", hash);
              form.append("filename", this.container.file.name);
              form.append("fileHash", this.container.hash);
              return {form,index,status:Status.wait}
            });

            try{
              console.log(list,uploadedList);
              if(list&&list.length>0)await this.sendRequest(list,4);　//等待所有的碎片上传完毕
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
            console.log('timer----reject');
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
                  console.log('count',count, chunks.length,this.hashProgress);
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
        format(num){
          if(num>1024*1024*1024){
            return (num/(1024*1024*1024)).toFixed(2)+'GB'
          }
          if(num>1024*1024){
            return (num/(1024*1024)).toFixed(2)+'MB'
          }
          if(num>1024){
            return (num/(1024)).toFixed(2)+'KB'
          }
          return num+'B'
        },


        async uploadSlow(){
          //动态计算网速比率,确认每一个碎片的大小
          const file = this.container.file
          if (!file) return;
          this.status = Status.uploading;
          const fileSize = file.size;
          let offset = 1024*1024;
          let cur = 0;
          let count =0;
          this.container.hash = await this.calculateHashSample();
          //动态切割，每切一次发送一个请求，根据请求的情况调整下一次的大小
          while (cur > fileSize){
            const chunk = file.slice(cur,cur+offset);
            cur += offset;
            const chunkName = this.container.hash;
              //封装请求体
            const form = new FormData();
            form.append("chunk", chunk);
            form.append("hash", chunkName);
            form.append("filename", file.name);
            form.append("fileHash", this.container.hash);
            form.append("size", chunk.size);

            let start = new Date().getTime();
            await request({ url: '/upload',data: form })
            const now = new Date().getTime();

            //根据时间比较传输效率
            const time = ((now -start)/1000).toFixed(4)
            let rate = time/30;

            //匹配速率，比如定义标准，每个碎片要３０秒之内传完
            //根据时间等比调整碎片大小
            if(rate<0.5) rate=0.5;
            if(rate>2) rate=2;

            // 新的切片大小等比变化
            console.log(`切片${count}大小是${this.format(offset)},耗时${time}秒，是30秒的${rate}倍，修正大小为${this.format(offset/rate)}`)
            offset = parseInt(offset/rate);
            // if(time)
            count++
          }


        },

        //文件上传－切片比较进行上传
        async handleUpload() {
            if (!this.container.file) return;
            this.status = Status.uploading;

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
                chunk:chunk.file,
                index,
                hash:chunkName,
                progress:uploadedList.indexOf(chunkName)>-1?100:0,
                size:chunk.file.size
              }
            });

            //传入已经上传过的切片清单
            await this.uploadChunks(uploadedList);
        }

      }
    }
</script>
