<template>
  <!--<div>-->
    <!--<h1>登录</h1>-->
    <!--<Button @click="login">登录</Button>-->
  <!--</div>-->
  <div class="login-modal" v-if="!$store.state.user.isLogin">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('ruleForm')">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
  <div class="login-modal" v-else="$store.state.user.isLogin">
    <div>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      {{$store.state.user.userName}}
    </div>
    <el-button type="danger" round @click="loginOut">退出登录</el-button>
  </div>
</template>

<script>

  export default {
    data(){
      //验证密码
      var checkPassword = (rule, value, callback) => {
        if (value === ''){
          return callback(new Error('密码不能为空'));
        }else{
          if (this.ruleForm.password !== ''){
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };

      return{
        ruleForm:{
          name:'',
          pass:''
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            {min: 3, max:8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
          ],
          pass: [
            { required: true, validator: checkPassword, trigger: 'blur' }
          ],
        }
      };
    },
    methods:{
      loginOut(){
       this.$store.dispatch('logout');
      },
      // async login(){
      //   const url=api.getLogin();
      //   const result = await this.$http.get(url).then(data=>data.data);
      //   await this.$store.commit('changeLogin',{result})
      //   if (this.$store.state.login){
      //     this.$router.push({path:'/layout'})
      //   }
      // }
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              //异步行为在action中使用
              this.$store.dispatch('login',this.ruleForm).then(code=>{
                if (code === 200){
                  //登陆成功
                  const path=this.$route.query.redirect||'/';
                  this.$router.push(path);
                }else{
                  this.$notify({
                    title: '警告',
                    message: code.message,
                    type: 'warning',
                    showClose: false,
                    duration:1500
                  });
                }
              }).catch(error=>{
                //有错误发生或者登录失败
                this.$notify({
                  title: '警告',
                  message: error.message||error.response.data.message||'登录失败',
                  type: 'warning'
                });
              });
          } else {
            return false;
          }
        });
      }
    },
  }
</script>

<style scoped>
  .login-modal{
    width: 40%;
    margin: 4% 30%;
    padding: 40px 40px 0 0;
    border: 1px solid #039be5;
  }
</style>
