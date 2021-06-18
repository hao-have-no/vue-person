<template>
    <div class="text-align-left fontSize">
      <i class="el-icon-collection-tag fontColor"></i>
      <span v-if="modalTitle">{{modalTitle}}</span>
    </div>
</template>

<script>
    export default {
        name: "PageTitle",
        props:{
          modalTitle:{
            type:String,
            default:""
          }
        },
      created() {
          this.$bus.$on('updateMes',(data)=>{
            console.log('updateMes',data);
          })
      }
    }
</script>

<style scoped>
  .fontSize{
    font-size: 1.2rem;
  }
  .fontColor{
    color: #0099ff;
    /*background-color:  #0099ff;*/
  }
</style>
