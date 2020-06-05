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
  methods:{
      validate(cb){
        //全局校验
        //获取所有的formItem

        //组件实例的数组在执行完，变为执行结果的数组[Promise...]
        const tasks = this.$children
          .filter(item => item.prop)//过滤没有prop的子组件
          .map(item=> item.validator()); //这样不合理，如果不是子类，就gg
        Promise.all(tasks).then(()=>cb(true)).catch(cb(false))
        //执行他们的校验方法，如果大家的Promise都是resolve,正确，reject处理错误信息
        //

      }
  }
  }
</script>

<style scoped>

</style>
