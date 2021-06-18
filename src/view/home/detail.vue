<template>
  <div>
    <bread-crumb></bread-crumb>
    <module-title #titleName>
       <p>{{pageTitle}}</p>
    </module-title>
    <div class="panel panel-default">
        <work-search v-model="filterContent"></work-search>
        <span>{{content}}</span>
        <follow-detail :content="content+'--test'"></follow-detail>
        <el-button @click="showMes">查看</el-button>
    </div>
  </div>
</template>

<script>
    import ModuleTitle from "../../component/module-title/module-title";
    import WorkSearch from "../../component/work-bench/work-search";
    import FollowDetail from "../../component/work-bench/followDetail/follow-detail";
    import BreadCrumb from "../../component/utils/bread-crumb";
    import {breadCrumb} from '@/utils/contentFilter'
    export default {
        name: "UserDetail",
        components: {BreadCrumb, FollowDetail, WorkSearch, ModuleTitle},
        props: {
            msg: String
          },
        data(){
          return{
            filterContent:"",
            pageTitle:"详情",
            content:"init"
          }
        },
        methods:{
          showMes(){
            console.log('details',this.filterContent,this.content)
            this.content = this.content+'$';
          }
        },
        computed:{

        },
        watch:{
          filterContent:function(newVal,oldVal){
            console.log('detail',oldVal,newVal);
            this.content = newVal?newVal + '$':'init';
          }
        },
        created(){
          breadCrumb({
            opera: 'save',
            data: {
              title: this.pageTitle,
              level: 2,
            }
          });
        }
    }
</script>

<style scoped>

</style>
