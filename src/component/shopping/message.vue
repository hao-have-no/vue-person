<template>
    <div v-if="show">
        <strong><slot name="title"></slot></strong>
      <slot></slot>
      <!--组件自己管理状态-->
        <span class="message-box-close"
          @click="toggle"
        >X</span>
      <!--@click="$emit('close',false)" 1.正常的交互，通过事件绑定-->
      <!--@click="$emit('update:show',false)"　2.通过sync事件关联-->
    </div>
</template>

<script>
    export default {
      name: "message",
      // props:['show'],
      data(){
        return{
          show:false
        }
      },
      mounted() {
        this.$bus.$on('message-close',()=>{
          this.$emit('update:show',false);
        })
      },
      methods:{
        toggle:function(){
          this.show = !this.show;
        }
      }
    }
</script>

<style scoped>
  .message-box-close{
    float: right;
  }
</style>
