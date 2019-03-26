<template>
    <div>
        <top-nav></top-nav>
      <button @click="loadRouter">跳转</button>
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
  }
      }

    }
</script>

<style scoped>

</style>
