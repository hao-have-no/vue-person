<template>
    <div>
        <div>
          <h3>Element表单</h3>
          <hr>
          <el-form :model="model" :rules="rules" ref="loginForm">
             <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" autocomplete="off"></el-input>
             </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="model.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "element-practice",
        data(){
          return {
            model:{
              username:"",
              password:""
            },
            rules:{
              username:[{required:true,message:"请输入用户名"}],
              password:[{required:true,message:"请输入密码"}]
            }
          }
        },
      methods:{
          submitForm:function (form) {
            this.$refs[form].validate(valid=>{
              if (valid){
                console.log("请先登录");
              } else{
                console.log("校验失败");
              }
            })
          }
      }
    }
</script>

<style scoped>

</style>
