<template>
  <div>
    this is modArrOne
    <button @click="loadOtherRouter">跳转</button>
    <button @click="loadquest">发送请求</button>
  </div>
</template>

<script>
    export default {
        name: "modArrOne",

      methods:{
          loadOtherRouter:function () {
            this.$router.push({path:"/modArrOne/detail"})
          },
        loadquest:function () {
            console.log("111")
            var params={
              'item':1,
              'id':333
            }
          this.$http.get('report/api/getNewsList').then((response)=>{
            if (response.data.errir_code=200){
              console.log("ｓｕｃｃｅｓｓ");
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
