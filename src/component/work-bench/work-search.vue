<template>
  <div>
    <input type="text" :value="value" @input="onInput"></input>
  </div>
</template>

<script>
    export default {
        name: "WorkSearch",
        props:{
          value:{
            type:String,
            default:""
          },
        },
        methods:{
          onInput(e){
            let value=e.target.value;
            this.$emit('input',value)
          }
        }
    }
</script>

<style scoped>

</style>
