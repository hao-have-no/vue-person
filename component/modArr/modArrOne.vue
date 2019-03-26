<template>
  <div>
    this is modArrOne
    <button @click="loadOtherRouter">跳转</button>
  </div>
</template>

<script>
    export default {
        name: "modArrOne",

      methods:{
          loadOtherRouter:function () {
            this.$router.push({path:"/modArrOne/detail"})
          }
      }
    }
</script>

<style scoped>

</style>
