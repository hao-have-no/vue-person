<template>
  <div>qwerty
    <button v-on:click="leave">返回</button>
  </div>

</template>

<script>
    export default {
    name: "person",
      methods:{
        leave(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>

</style>
