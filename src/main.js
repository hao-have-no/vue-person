// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from "./store/index"
import i18n from "./lang/index"
import App from './App'
import router from './router'
import "./assets/iconfont.css"
import axios from "./axios/http"
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CreateAPI from 'vue-create-api';
import CartAnim from './component/cart-anim/CartAnim';
// import create from './utils/utils' //小球

//创建组件实例
import craete from './utils/create'
import Notice from './component/Notice'

Vue.config.productionTip = false;

//给vue注册实例方法,使用$createCardAnim来创建

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
// Vue.prototype.$create=create;

//创建弹窗组件
Vue.prototype.$notice=function(props){
      return create(Notice,props);
}

axios.defaults.timeout=300000;
Vue.prototype.$http= axios;
Vue.prototype.$store=store;
Vue.prototype.$bus = new Vue();

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

export default vue
