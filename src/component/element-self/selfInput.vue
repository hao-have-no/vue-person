<template>
    <div>
      <input :type="type" :value="value" @input="onInput"></input>
    </div>
</template>

<script>
    export default {
        name: "self-input",
        props:{
          value:{
            type:String,
            default:""
          },
          type:{
            type:String,
            default: "text"
          }
          },
        methods:{
          onInput(e){
            //v-model:监听input事件，绑定value值
            //模拟双向绑定
            let value=e.target.value;
            this.$emit('input',value);
            this.$parent.$emit('validate')
          }
        }
    }
</script>

<style scoped>

</style>
