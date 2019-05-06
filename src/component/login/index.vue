<template>
    <div>
      <h1>登录主页</h1>
      <div>结果:{{result}}</div>
      <div>登录状态{{this.$store.state.login}}</div>
      <login></login>
      <logout></logout>
      <me></me>
    </div>
</template>

<script>
  import login from './Login'
  import logout from './Logout'
  import me from './me'
  import api from '../../axios/api'
    export default {
        name: "index",
        data(){
          return {
            result:""
          }
        },

      methods:{

      },
      components:{
        login,logout,me
      }
    }
</script>

<style scoped>

</style>
