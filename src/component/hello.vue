<template>
    <div>
        <top-nav></top-nav>
      <button @click="loadRouter">测试－跳转</button>
      <button @click="loadPicture">仿抖音桌面</button>
    </div>
</template>

<script>
  import topNav from './pageModule/topNav';
    export default {
        name: "hello",
      components: {topNav},

      methods:{
        loadRouter: function (){
        this.$router.push({path:"/modArrOne"})
         },

        loadPicture:function () {
        this.$router.push({path:"/picture"})
        }
      }
    }
</script>

<style scoped>

</style>
