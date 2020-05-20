<template>
    <div>
      <h2>大文件上传-断点续传</h2>
      <div>
        <input type="file" @change="handleFileChange" />
        <!-- <el-button type="primary" @click="handleUpload" :disabled="uploadDisabled">上传</el-button> -->
        <el-button type="primary" @click="handleUpload">上传</el-button>
        <el-button type="primary" @click="handleUpload1">慢启动上传</el-button>
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
    import {request,post} from "../../utils/upload";

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

    export default {
        data:()=>({
          container:{
            file:null
          },
          chunks:[], //碎片列表
          hashProgress:0, //计算hash的进度
          requestList:[],  //请求列表，方便abort
          STATUS,
          status:STATUS.wait, //默认等待状态
          fakeProgress:0
        }),

      computed:{
          //进度条改善为正方形
          cubWidth(){
            return Math.ceil(Math.sqrt(this.chunks.length))*16
          },

          //上传不可用
          uploadDisabled(){
            return (
              !this.container.file||[STATUS.pause,STATUS.uploading].includes(this.status)
            )
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
          async handleResume(){
            this.status = STATUS.uploading;

            const { uploadList } = await this.verify(
              this.container.file.name,
              this.container.hash
            );

            await  this.uploadChunks(uploadList)
          },

          handlePause(){
            this.status = STATUS.pause;
            // this.requestList.forEach(file,size=SIZE){
            //   //生成文件块
            //   const chunks = [];
            //   let cur = 0;
            //   while (cur< file.size){
            //     chunks.push({file:file.slice(cur,cur+size)});
            //     cur +=size;
            //   }
            // }
          }
      }
    }
</script>
