<template>
  <div>
    <h1>登录</h1>
    <Button @click="login">登录</Button>
  </div>
</template>

<script>
  import api from '../../axios/api'
  export default {
    data(){
      return{

      }
    },
    methods:{
      async login(){
        const url=api.getLogin();
        const result = await this.$http.get(url).then(data=>data.data);
        console.log(result);
        await this.$store.commit('changeLogin',{result})
        if (this.$store.state.login){
          this.$router.push({path:'/'})
        }
      }
    },

  }
</script>

<style scoped>
</style>
