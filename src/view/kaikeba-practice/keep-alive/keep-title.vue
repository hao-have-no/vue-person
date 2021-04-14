<template>
    <div>
      <span v-for="title in titleEnum" :key="title" @click="currentTitle = title" :class="{'active':currentTitle == title}">{{title}}</span>
    </div>
</template>

<script>
    export default {
        name: "keep-title",
        data(){
          return{
            titleEnum:['old','now','later'],
            currentTitle:'old'
          }
        }
    }
</script>

<style scoped>
  .active{
    color:#039be5;
    font-size: 18px;
    font-weight: bold;
  }
</style>
