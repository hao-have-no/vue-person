<template>
  <div id="app">
    <!--<div class="left-nav">-->
      <!--<h4>路由</h4>-->
      <!--<a v-for="item in NavRouter" @click="pathRoute(item)" v-bind:class="{active:activeRouter === item.id}" style="position: relative">-->
        <!--{{item.name}}-->
        <!--<span v-if="item.name.indexOf('购物车') > -1 &&cartTotal >0" class="cart-num">{{cartTotal}}</span>-->
      <!--</a>-->
    <!--</div>-->
    <div class="infi-header">
      <top-header></top-header>
    </div>
    <div class="infi-content">
      <nav-menu></nav-menu>
      <div class="right-content">
        <!--<transition name="route-move">-->
        <div class="basic-content">
          <router-view/>
        </div>
        <div style="position: relative">
          <infi-footer></infi-footer>
        </div>
        <!--</transition>-->

        <!--路由缓存
          <keep-alive>
          //<keep-alive include='admin,login'　max='10'>
          //可以变成表达式和数组的形式，方便管理
          //ｍａｘ标识最多的缓存书，多的话就会把最早的顶掉
          //判断哪些组件可以缓存
          //admin:组件的name
            router-view
          </keep-alive>
        -->
      </div>
    </div>
  </div>
</template>
<!--<template>-->
  <!--<div id="app">-->
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> ｜-->
      <!--<router-link to="/modListOne">About</router-link>-->
    <!--</div>-->
    <!--<router-view></router-view>-->
  <!--</div>-->
<!--</template>-->

<script>
  import  '../static/style/index.scss'
  import {mapGetters} from 'vuex';
  import NavMenu from "./component/pageModule/nav-menu";
  import InfiFooter from "./component/pageModule/infi-footer";
  import TopHeader from "./component/pageModule/topNav";
export default {
  name: 'App',
  components: {TopHeader, InfiFooter, NavMenu},
  data() {
    return {
      isRouterAlive: true,
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        console.log('dom');
        //在完成对模型的操作后，视图层还未更新，无法获取ｄｏｍ.ｎｅｘｔＴｉｃｋ函数是对视图层的一个监控，从而拿到新的ｄｏｍ元素
        this.isRouterAlive = true
      })
    },
    pathRoute(option) {
      this.activeRouter = option.id;
      this.$router.push({path: option.url})
    },
  },
  mounted() {
    console.log(process.env)
  },
  computed: {
    ...mapGetters({
      cartTotal: 'cartTotal' //购物车
    })
  },
  mounted(){
    console.log('env',process.env)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
/*}*/

/*#nav {*/
  /*padding: 30px;*/
/*}*/

/*#nav a {*/
  /*font-weight: bold;*/
  /*color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
  /*color: #42b983;*/
/*}*/


/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 2px;*/
/*}*/
/*.cart-num{*/
  /*content:'';*/
  /*position: absolute;*/
  /*right: 20px;*/
  /*top: 8px;*/
  /*display: inline-block;*/
  /*width: 20px;*/
  /*height: 20px;*/
  /*color: #fff;*/
  /*padding-top: 2px;*/
  /*border-radius: 10px;*/
  /*background: #f56c6c;*/
/*}*/
/*.route-move-enter{*/
  /*transform: translate3d(0,-100%,0);*/
/*}*/
/*.route-move-leave-to{*/
  /*transform: translate3d(0,100%,0);*/
/*}*/
/*.route-move-enter-active,.route-move-leave-active{*/
  /*transition: transform .3s;*/
/*}*/
</style>
