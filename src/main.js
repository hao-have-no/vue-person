// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from "./store/index"
import i18n from "./lang/index"
import App from './App'
import router from './router' //官方router
// import router from './krouter/kvue-router'

import "./assets/iconfont.css"
import axios from "./axios/http"
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import CreateAPI from 'vue-create-api';
// import CartAnim from './component/cart-anim/CartAnim';
import filters from './utils/filters' //全局筛选

//创建组件实例
import craete from './utils/create'
import Notice from './component/Notice'

//引用第三方组件
// import modal from 'fh-modal';
// import 'fh-modal/ui-modal.css';
// import modal from 'qf-modal';
// Vue.use(modal);

Vue.config.productionTip = false;

//给vue注册实例方法,使用$createCardAnim来创建

//全局动态注册过滤器
for (var i in filters) {
  Vue.filter(i, filters[i]);
}

//动态导入
axios.defaults.baseURL = process.env.API_ROOT;

Vue.use(VueI18n,{
  i18n:(key,value)=> i18n.t(key,value)
});

Vue.use(element);

// Vue.use(CreateAPI, {
//   componentPrefix: 'cube-',
//   apiPrefix: '$create-'
// });
//
// Vue.createAPI(CartAnim,['ontransitionend']);

//使用自定义的create-api
Vue.prototype.$create=craete;

//创建弹窗组件
Vue.prototype.$notice=function(props){
      return craete(Notice,props);
}

axios.defaults.timeout=300000;
Vue.prototype.$http= axios;
Vue.prototype.$store=store;
Vue.prototype.$bus = new Vue();
//
// router.beforeEach((to,from,next)=>{
//   console.log('berore each',to,from)
//   next();
// });
// router.beforeResolve((to,from,next)=>{
//   console.log('berore resolve',to,from);
//   next();
// });
// router.afterEach((to,from,next)=>{
//   console.log('after each')
// })

//增加全局路由守卫
// beforeEach(经常用，一般用于权限鉴定),beforeResolve（比前置钩子晚一些）,afterEach（）

//路由独享守卫，卸载配置文件（ｒｏｕｔｅｒ的ｉｎｄｅｘ文件中）
//beforeEnter,afterEnter

//组件内路由守卫
//beforeRouterEnter(渲染组件的路由被confirm前调用，但是ｔｈｉｓ获取不了任何值，并为实例化),
// beforeRouterUpdate(路由改变后，ｔｈｉｓ可以拿到相关值)
// beforeRouterLeave（导航离开时，访问组件，通过ｎｅｘｔ（ｆａｌｓｅ）防止未保存前的离开）


/* eslint-disable no-new */
var vue=new Vue({
  el: '#app',
  router,
  i18n,
  store,
  axios,
  render:h=>h(App)
}).$mount('#app');

// h函数就是createElement函数(官方文档)

//$mount 中会执行 render 得到　vnode 从而挂在根元素上

//vue中的app.vue的app和index.html中的app为什么不会冲突
// index.html中的app会作为挂在目标从而挂在vue实例
//根实例的render选项，接收createElement方法作为第一个参数用来创建VNode。而createElement又接收APP组件作为参数。
//render渲染函数生成的VNode将会替换掉挂载元素，即App.vue组件的模板内容将会替换掉index.html中的挂载元素’#app’。
// 最终渲染出来的页面中的’#app’元素是App.vue组件中的。

// render渲染函数是字符串模板template的代替方案，是运行时的方案
// 包含编译器的运行时版，而template一定要通过编译器编译成渲染函数

export default vue
