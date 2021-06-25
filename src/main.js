import Vue from "vue";
import App from "./App.vue";
// import router from './router'
import createRouter from "./router";
import { createStore } from "./store";

Vue.config.productionTip = false;

// 添加一个全局混入：beforeMount钩子在服务端不会触发，所以这个混入只会在客户端执行
Vue.mixin({
  beforeMount() {
    const {asyncData} = this.$options
    //挂载之前，从当前组件的实例获取asyncData
    if (asyncData) {
      // 如果存在则执行该异步调用
      asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

// 工厂模式:每个请求创建一个实例
// 调用者是entry-server(传入上下文对象)
export function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  }).$mount("#app");
  return {app, router, store}
}

