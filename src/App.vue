<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {isRouterAlive: true}
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
