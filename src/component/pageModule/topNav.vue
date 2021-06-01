<template>
    <div v-if="$store.state.user.isLogin">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
    </div>
</template>

<script>
    export default {
      name:'top-header',
      data(){
        return{
          isCollapse:false
        }
      },
      // methods:{
      //   updateStatus(){
      //     this.isCollapse = !this.isCollapse;
      //
      //   }
      // }
      watch:{
        isCollapse:function(val, oldVal){
          console.log(this.isCollapse);
          this.$bus.$emit('update-status', this.isCollapse);
        }
      }
    }

</script>

<style scoped>

</style>
