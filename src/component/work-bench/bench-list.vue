<template>
  <div>
    <ul class="margin-top-md display-flex">
      <li v-for="item in flowList" class="display-inline-block text-align-center margin-right-sm cursor-pointer" @click="changeWorkStatus(item)" :class="{'home-flow-active':item.taskId === workStatus}">
        <p class="margin-top-md font-weight-bold font-size-18">{{item.taskName}}</p>
        <p class="font-weight-bold font-size-18">{{item.finishedCount||0}}/{{item.totalCount||0}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "WorkBench",
        props:{
          flowList:Array
        },
        data(){
          return{
            workStatus:""
          }
        },
      methods:{
        changeWorkStatus(item){
          this.workStatus = item.taskId;
          this.$emit('work-status',item.taskId);
        },
      },
      created() {
          this.workStatus = this.flowList[0]['taskId']
      }
    }
</script>

<style>

</style>
