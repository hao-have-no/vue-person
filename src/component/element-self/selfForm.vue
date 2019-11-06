<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: "self-form",
    provide(){
      return {
        kForm: this
      }
    },
    props:{
      //约束传进来的数据类型
      model:{
        type:Object,
        required:true
      },
      rules:{
        type:Object,
        required:false
      }
    },
    data(){
      return{
        errorMessage:"",
        errStatus:false
      }
    },
    methods:{
    }
  }
</script>

<style scoped>

</style>
