import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import home from '../component/home';
import modArr from '../component/modArr/modArrRouter';
import modList from '../component/modList/modListRouter';

Vue.use(Router)



const router = new Router({
  mode:"history",
  base:process.env.BASE_URL,
  routes: [
    ...home,
    ...modArr,
    ...modList,
  ]
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if (to.name !='other' && to.name !='index'){
    console.log('123',this.$store);
    store.dispatch('checkMe')
  }
  next()
});

export default router;
