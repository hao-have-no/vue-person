<template>
   <div>
     <div class="good" v-for="(item,index) in cart" :key="item.id">
        {{item.title}}
       <div class="right">
         <i class="cubeic-remove" @click="removeCart(index)">-</i>
         <span>{{item.cartCount}}</span>
         <i class="cubeic-add" @click="addCart(index)">+</i>
       </div>
     </div>
     <div>总共:{{cartTotal}}----总价:{{total}}</div>
     <el-button type="warning" :disabled="true" v-if="total<minTotal">还差{{minTotal-total}}</el-button>
     <el-button type="primary" v-else>下单
     </el-button>
   </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex';
    export default {
        name: "Cart",
        data(){
          return {
            minTotal:1000
          };
        },
      computed:{
          ...mapState({cart:state=>state.cart.cart}),
        ...mapGetters({
          total:'total',//需要计算的属性
          cartTotal:'cartTotal'
        })
      },
      methods:{
          addCart(index){
            this.$store.commit("cartadd",index);
          },
          removeCart(index){
            this.$store.commit("cartremove",index);
          }
      }
    }
</script>

<style scoped>

</style>
