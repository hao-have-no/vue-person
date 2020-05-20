<template>
  <div id="app" class="infi-content">
    <div class="left-nav">
      <h4>路由</h4>
      <a v-for="item in NavRouter" @click="pathRoute(item)" v-bind:class="{active:activeRouter === item.id}" style="position: relative">
        {{item.name}}
        <span v-if="item.name.indexOf('购物车') > -1 &&cartTotal >0" class="cart-num">{{cartTotal}}</span>
      </a>
    </div>
    <div class="right-content">
      <!--<transition name="route-move">-->
        <router-view v-if="isRouterAlive" />
        <router-view name="child" v-if="isRouterAlive"></router-view>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
  import  '../static/style/index.scss'
  import {mapGetters} from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true,
      activeRouter: "",
      NavRouter: [
        // {
        //   id:'1',
        //   name:'测试－跳转',
        //   url:'/modArrOne',
        // },
        //   {
        //   id:'2',
        //   name:'仿抖音桌面',
        //   url:'/picture'
        // },
        {
          id: '1',
          name: '主页',
          url: '/',
        },
        {
          id: '3',
          name: '登录',
          url: '/login'
        },
        {
          id: '4',
          name: '开课吧购物车',
          url: '/shopping'
        },
        {
          id: '5',
          name: '开课吧-element组件使用',
          url: '/element-first'
        },
        {
          id: '6',
          name: '自定义element组件',
          url: '/element-myself'
        },
        // {
        //   id: '7',
        //   name: '复合视图（匿名视图）',
        //   url: '/recombination'
        // },
        // {
        //   id: '8',
        //   name: '父子路由（匿名视图）',
        //   url: '/nest'
        // }
      ],
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        //在完成对模型的操作后，视图层还未更新，无法获取ｄｏｍ.ｎｅｘｔＴｉｃｋ函数是对视图层的一个监控，从而拿到新的ｄｏｍ元素
        this.isRouterAlive = true
      })
    },
    pathRoute(option) {
      this.activeRouter = option.id;
      this.$router.push({path: option.url})
    },
    findRoute() {
      let onRoute = window.location.pathname
      let isHas = this.NavRouter.find(item => item.url.indexOf(onRoute) > -1);
      this.activeRouter = isHas ? isHas.id : this.NavRouter[0].id;
    }
  },
  mounted() {
    this.findRoute();
  },
  computed: {
    ...mapGetters({
      cartTotal: 'cartTotal' //购物车
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2px;
}
  .cart-num{
    content:'';
    position: absolute;
    right: 20px;
    top: 8px;
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #fff;
    padding-top: 2px;
    border-radius: 10px;
    background: #f56c6c;
  }
  .route-move-enter{
    transform: translate3d(0,-100%,0);
  }
.route-move-leave-to{
  transform: translate3d(0,100%,0);
}
  .route-move-enter-active,.route-move-leave-active{
    transition: transform .3s;
  }
</style>
