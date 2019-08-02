<template>
  <div class="infi-content">
    <div class="left-nav">
      <h4>路由</h4>
      <a v-for="item in NavRouter" @click="pathRoute(item.url)" >{{item.name}}</a>
    </div>
    <div class="right-content">
      <router-view v-if="isRouterAlive" />
      <!--<app-messages></app-messages>-->
    </div>
  </div>

  <!--<div id="app">-->
    <!--<router-view v-if="isRouterAlive" />-->
  <!--</div>-->
</template>

<script>
  import  '../static/style/index.scss'
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true,
      NavRouter:[
      {
        id:'1',
        name:'测试－跳转',
        url:'/modArrOne',
      },{
        id:'2',
        name:'仿抖音桌面',
        url:'/picture'
      },
      {
        id:'3',
        name:'登录',
        url:'/layout'
      },
    ]
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        //在完成对模型的操作后，视图层还未更新，无法获取ｄｏｍ.ｎｅｘｔＴｉｃｋ函数是对视图层的一个监控，从而拿到新的ｄｏｍ元素
        this.isRouterAlive = true
      })
    },
    pathRoute(url){
      this.$router.push({path:url})
    }
  },
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
</style>
