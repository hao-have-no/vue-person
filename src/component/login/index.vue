<template>
    <div>
      <login></login>
    </div>
</template>

<script>
  import login from './Login'
  import logout from './Logout'
  import me from './me'
  import api from '../../axios/api'
    export default {
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
