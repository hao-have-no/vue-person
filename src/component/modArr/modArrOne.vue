<template>
  <div>
    this is modArrOne
    <button @click="loadOtherRouter">跳转</button>
    <button @click="loadquest">发送请求</button>
  </div>
</template>

<script>
  import api from '../../axios/api'
    export default {
        name: "modArrOne",

      methods:{
          loadOtherRouter:function () {
            this.$router.push({path:"/modArrOne/detail"})
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
