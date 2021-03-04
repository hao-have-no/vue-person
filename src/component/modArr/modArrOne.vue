<template>
  <div>
    this is modArrOne
    <button @click="loadOtherRouter">跳转</button>
    <button @click="loadquest">发送请求</button>
    <div>{{$store.state.counts}}</div>
    <!--<div>{{$store.getters.debountce}}</div>-->
    <p @click="$store.commit('add')">commit增加</p>
    <p @click="$store.dispatch('add')">dispatch增加</p>
    <!--$store是怎么来的?-->

    <modal :visible="show"></modal>
  </div>
</template>

<script>
  import api from '../../axios/api';
  // import modal from 'fh-modal'
  // import store from '../../store/index'
    export default {
        name: "modArrOne",
      data(){
        return{
          show:false
        }
      },
      methods:{
          loadOtherRouter:function () {
            //携带参数，params(刷新页面参数丢失)和query（刷新页面参数不丢失）
            // this.$router.push({path:"/modArrOne/detail"})
            this.show = true;
          },
        loadquest:function () {
            var params={
              'item':1,
              'id':333
            }
            console.log(this.url);
          var url=api.getUserList();
          this.$http.get(url).then((response)=>{
            if (response.data.errir_code=200){
              console.log("success");
            }
          }).catch((response)=>{
            if (response.data&&response.data.error_msg){

            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
