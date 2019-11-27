<template>
  <div>
    this is nest parent
    {{id}}
    <router-link :to="'/nest/'+id+'/test'">跳子路由</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "parent-view",
        props:['id'],
        path:'',
        mounted() {
          //常规
          console.log(this.$route.params['id']);
          //通过ｐｒｏｐｓ的设定直接取值
          console.log(this.id);
          this.path='/nest/'+this.id+'/test';
        },



      beforeRouteEnter(to,from,next){
        console.log('beforeRouteEnter');
       next()
      },

      beforeRouteUpdate(to,from,next){
          //需要用跳转的方式进行路由切换，否则不会触发
      console.log('beforeRouteUpdate');
      next()
      },

      beforeRouteLeave(to,from,next){
      console.log('beforeRouteLeave');
       next()
      },
    }
</script>

<style scoped>

</style>
