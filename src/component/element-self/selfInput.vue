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
            this.$parent.$emit('validate');//数据变化，实行校验

              //使用$parent,$children不科学

              //参考$dispatch和$broadcast
              //通过制定 this.$dispatch('selfFormItem','validate')
            //通过往上级一层层的查询，最终找到名称为这个的组件，调用validate
              //同理 $broastcast 往下一级寻找，实现全局校验功能
            //需要借助minmax混入模式，可以从参考一下element源码
          }
        }
    }
</script>

<style scoped>

</style>
