<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadCrumbData">
          <span v-if="index === breadCrumbData.length-1">{{item.title}}</span>
          <a href="javascript:" v-if="index !== breadCrumbData.length-1" @click="pageJump(item.url)">{{item.title}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
    import {breadCrumb} from '../../utils/contentFilter'
    export default {
        name: "BreadCrumb",
        data(){
          return{
            breadCrumbData:{
              type:Array,
              default:[]
            },
          }
        },
        methods:{
          pageJump(url){
            this.$router.push(url);
          }
        },
        created(){
          this.breadCrumbData = breadCrumb({
            opera: 'get'
          });

          this.$bus.$on('changeBreadCrumb',()=> {
            this.breadCrumbData = breadCrumb({
              opera: 'get'
            });
            console.log('breadCrumbData',this.breadCrumbData);
          })
        }
      }
</script>

<style scoped>

</style>
