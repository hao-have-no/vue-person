import Vue from 'vue'
import Router from 'vue-router'

import home from '../../component/hello';
import modArr from '../../component/modArr/modArrRouter';
import modList from '../../component/modList/modListRouter';

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '＊',
      name: 'home',
      component:home
    },
    ...modArr,
    ...modList,
    ...home
  ]
})
