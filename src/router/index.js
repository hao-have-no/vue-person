import Vue from 'vue'
import Router from 'vue-router'

import home from '../../component/home';
import modArr from '../../component/modArr/modArrRouter';
import modList from '../../component/modList/modListRouter';

Vue.use(Router)



export default new Router({
  mode:"history",
  base:process.env.BASE_URL,
  routes: [
    ...home,
    ...modArr,
    ...modList,
  ]
})
