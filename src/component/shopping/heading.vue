<template>
    
</template>

<script>
    export default {
        name: "heading",
      functional:true, //函数式组件
      //函数式组件，无状态，无生命周期，无监听，没有响应
      props:{},
      render(h, context) {
          //所有参数没有this,参数必须通过上下文获取
          //context.xx
        //详细用法参考官方文档
      }
    }
</script>

<style scoped>

</style>
