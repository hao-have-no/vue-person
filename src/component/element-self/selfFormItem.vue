<template>
    <div>
      <label>{{label}}</label>
      <div>
        <slot></slot>
        <p v-if="">{{errorMessage}}</p>
      </div>
    </div>
</template>

<script>
    // import Schema from 'async-validator'

    export default {
        name: "self-form-item",
        props:["label","prop"],
        data(){
          return{
            errorMessage:"",
            errStatus:false
          }
        },
      mounted(){
        this.$on('validate',this.validator);
      },
        methods:{
         validator(){

         }
        }
    }
</script>

<style scoped>

</style>
