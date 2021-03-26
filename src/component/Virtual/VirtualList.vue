<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{height:listHeight+'px'}"></div>
    <div class="infinite-list" :style="{top:getTop}">
        <virtual-item
          v-for="item in visibleData"
          class="infinite-list-item"
          ref="items"
          :article="item"
          :key = item._id
          :style="{height:itemSize+'px'}"
        ></virtual-item>
    </div>
  </div>
</template>

<script>
  import VirtualItem from './VirtualItem'
  export default {
    name:'VirtualList',
    data() {
      return {
        //可视区域高度
        screenHeight:800,
        //偏移量
        startOffset:0,
        //起始索引
        start:0,
        //结束索引
        end:4,
      };
    },
    props:{
      //所有数据列表
      listData:{
        type:Array,
        default:()=>[]
      },
      itemSize:{
        type:Number,
        default:200
      }
    },
    //watch监听一个数去改变其他参数状态
    //computed监听一个数，这个数由其他多个数的状态改变控制
    computed:{
      //列表总高度
      listHeight(){
        return this.listData.length*this.itemSize;
      },
      //可显示的列表项
      visibleCount(){
        return Math.ceil(this.screenHeight/this.itemSize);
      },
      //偏移量对应的的style
      getTop(){
        return `${this.startOffset}px`
      },
      //获取真实数据
      visibleData(){
        console.log(this.listData,this.start,this.end);
        return this.listData.slice(this.start, Math.min(this.end,this.listData.length));
      }
    },
    methods:{
      scrollEvent(){
        //当前滚动位置
        let scrollTop = this.$refs.list.scrollTop;
        //此时的开始索引
        this.start = Math.floor(scrollTop / this.itemSize);
        //此时的结束索引
        this.end = this.start + this.visibleCount;
        //此时的偏移量
        this.startOffset = scrollTop - (scrollTop % this.itemSize);
      }
    },
    mounted(){
      this.start = 0;
      this.end = this.start + this.visibleCount;
    },
    components:{
      VirtualItem
    },
  }
</script>

<style scoped>
  .infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
  }

  .infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }

  .infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
  }

  .infinite-list-item {
    padding: 10px;
    color: #555;
    border-bottom: 1px solid #999;
  }
</style>
