<template>
    <div>
      <div class="item" v-for="item in data" :key="item.id">
          <div class="left">
              <img :src="item.img">
          </div>
          <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="info">
                  <span>{{item.count}}人购买</span>
                <el-button  @click.stop.prevent="addCart($event,item)">+购买</el-button>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        props:["data"],
        methods:{
          addCart(event,item){
            this.$store.commit("addcart",item);
            this.$emit('cartanim',event.target);
          }
        },
        computed:{

        }
    }
</script>

<style scoped>

</style>
