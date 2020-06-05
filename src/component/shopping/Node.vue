<template>
  <div>
    <div style="text-align: left" @click="toggle">
      <!--建议最好再封一层组件，现在的层次结构不太好，这一层最后只做数据的传导-->
      <span :style="{'padding-left':level+'em'}">{{data.name}}</span>
      <span v-if="isFolder">{{open?'-':'+'}}</span>
    </div>
    <div v-show="open" v-if="isFolder">
      <Node v-for="n in data.children" :key="n.name" :data="n" :level="level+1"></Node>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Node",
        props:{
          data:{
            type:Object,
            require:true
          },
          level:{
            type:Number,
            default:1
          }
        },
      data(){
          return{
            open:false
          }
      },
      computed:{
          // indent(){
          //   return (this.level == 0?5:this.level *3)
          // }

        isFolder(){
          return this.data.children&&this.data.children.length
        }
      },
      methods:{
          toggle(){
            if (this.isFolder){
              this.open = !this.open;
            }
          }
      }
    }
</script>

<style scoped>

</style>
