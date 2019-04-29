// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from "./store/index"
import i18n from "./lang/index"
import App from './App'
import router from './router'
import "./assets/iconfont.css"
import axios from "axios"

Vue.config.productionTip = false

Vue.config.productionTip=false;

Vue.use(VueI18n,{
  i18n:(key,value)=> i18n.t(key,value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
