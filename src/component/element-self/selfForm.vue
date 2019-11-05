<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: "self-form-item",
    props:{
      model:{
        type:"Object",
        required:true
      },
      rules:{
        type:"Object",
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
