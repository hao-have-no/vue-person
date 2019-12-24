<template>
  <div class="home">
    <el-carousel trigger="click" class="img-slider">
      <el-carousel-item v-for="(item,index) in slider" :key="index">
          <img class="slider" :src="item.img">
      </el-carousel-item>
    </el-carousel>

    <!--商品类表-->
    <!--<good-list :data="goods" @cartanim="$refs.ca.start($event)"></good-list>-->
    <good-list :data="goods" @cartanim="startCardAnim"></good-list>
    <!--<card-anim ref="ca"></card-anim>-->
  </div>
</template>

<script>
    import {mapState,mapActions,mapGetters} from 'vuex';
    import GoodList from '../component/goods/goodsList';
    import CardAnim from '@/component/cart-anim/CartAnim';
    //一个实例,现在采用全局组件
    
    export default {
        name: "hello",
        //组价无状态化,在vuex中进行数据的管理
        created(){
          this.getGood();//数据初始化
        },
        computed:{
          ...mapState({slider:state=> state.goods.slider}),//映射需要使用的参数,当前循环使用(由于store中module的原因,所以在映射时需要紧缺指向)
          ...mapGetters(['goods'])//映射goods(处理相关数据后的映射),放给good-list,对数据进行共享
        },
        methods:{
          ...mapActions(['getGood']),//分发功能
          startCardAnim(el){
            //创建小球动画的实例
            // const anim=this.$createCartAnim({
            //     ontransitionend(){
            //       anim.remove();
            //     }
            // });
            //
            // anim.start(el);

            //自定义实现
            const anim=this.$create(CardAnim,{pos:{left:"30%",bottom:"16px"}});
            anim.start(el);
            anim.$on('ontransitionend',anim.remove);
          }
        },
      components:{
        GoodList,
        CardAnim
      }
    }
</script>

<style scoped>
  .slider{
    max-width: 800px;
    margin: 0;
  }
  .img-slider{
    width: 800px;
    margin: 0 auto;
  }
  .cube-slider{
    height:auto
  }
</style>
