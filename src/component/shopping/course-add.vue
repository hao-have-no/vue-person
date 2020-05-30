<template>
  <div>
    <!--@input监听input输入-->
    <input type="text" :value="value" @input="onInput" v-on:keydown.enter="addCourse" />
    <button @click="addCourse">添加</button>
  </div>
</template>

<script>
    export default {
        name: "course-add",
        props:['value'],
        //自定义组件，默认props接收（value:接受老爹传进来的value）
      //自定义组件默认情况下：props接受value，同时声明:value,和@input事件
      //用来抛出新值
        methods:{
          addCourse(){
            this.$emit('add-course');
          },
          onInput(e){
            //为了能够将最新的value值获取到并传出去，替代v-model
            //拿进来的值，才传出去最新的
            this.$emit('input',e.target.value);
          }
        }
    }
</script>

<style scoped>

</style>
