<template>
<div>
  <h1>注销</h1>
  <Button @click="logout">注销</Button>
</div>
</template>

<script>
  import api from '../../axios/api'
  export default {
    name: "logout",
    methods:{
      async logout(){
        const url=api.getLogout();
        const result = await this.$http.get(url).then(data=>data.data);
        this.$store.commit('changeLogin',{result})

      }
    }
  }
</script>

<style scoped>

</style>
