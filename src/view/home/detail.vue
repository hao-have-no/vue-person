<template>
  <div>
    <module-title #titleName>
       <p>详情<span class="color-red">12</span></p>
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
    export default {
        name: "UserDetail",
        components: {FollowDetail, WorkSearch, ModuleTitle},
        props: {
            msg: String
          },
        data(){
          return{
            filterContent:"",
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

        }
    }
</script>

<style scoped>

</style>
