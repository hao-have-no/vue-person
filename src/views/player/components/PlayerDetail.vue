<template>
  <div>
    <el-form ref="form" :model="playerForm">
      <el-form-item prop="acountname" label="账户名">
        <el-input v-model="playerForm.acountname"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="playerForm.nickname"></el-input>
      </el-form-item>

      <!--头像上传-->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list = "false"
        :before-upload = "beforeAvatarUpload"
        :on-success = "handleAvatarSuccess"
      >
        <img v-if="imageUrl" type="primary" :src="imageUrl" class="avatar"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form-item>
        <el-button type="primary" @click="submitForm">{{$t('player.btnSubmit')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {createPlayer, defaultPlayerData, getPlayer, updatePlayer} from "../../../api/players";
  import {ElUploadInternalFileDetail} from "element-ui/types/upload";
@Component
export default class PlayerDetail extends Vue{

  //编辑模式
  @Prop({default:false})

  isEdit!: boolean;

  //数据模型,默认为空
  playerForm = Object.assign({},defaultPlayerData)

  //加载状态
  loading = false;

  //上传图片的预览地址
  imageUrl = '';

  //根据isEdit状态决定是否需要获取
  created(): void {
    //编辑状态－＞router players/edit/:id
    if (this.isEdit){
      const id = this.$route.params&&this.$route.params.id;
      this.fetchData(parseInt(id));
    }
  }

  async fetchData(id){
    try {
      const {data} = await getPlayer(id);
      this.playerForm = data.player;
    }catch (e) {
      console.error(e);
    }
  }


  //上传头像之前的校验
  beforeAvatarUpload(file:ElUploadInternalFileDetail){
    const isLt1M=file.size / 1024 /1024 < 1;
    if (isLt1M){
      this.$message.error('上传的头像图片大小不能超过1M')
    }

    return isLt1M;
  }

  //上传成功的预览
  handleAvatarSuccess(res:any,file:ElUploadInternalFileDetail){
      //预览图片
    this.imageUrl = URL.createObjectURL(file.raw);

    //赋值 todo avator应该在resposne中提取
    this.playerForm.avatar = file.name;
  }

  //提交表单
  async submitForm(){
    this.loading = true;

    try{
      if (this.isEdit){
        await updatePlayer(this.playerForm.id,this.playerForm)
      }else{
        await createPlayer(this.playerForm);
      }

      //操作成功的提示
      this.$notify({
        title:'操作成功',
        message:`${this.isEdit?'更新':'新增'}玩家成功`,
        type:'success',
        duration:2000
      });

      this.loading = false;

    }catch (e) {
      console.error(e);
    }
  }

}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
