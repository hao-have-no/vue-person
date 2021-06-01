import Vue from 'vue'
import Router from 'vue-router'
// import Router from '../krouter/kvue-router'
import store from '../store/index'
import home from '../component/home';
import vue from '../main';
import modArr from '../component/modArr/modArrRouter';
import modList from '../component/modList/modListRouter';
import practice from './practice'

Vue.use(Router);



const router = new Router({

  mode:"history",
  base:process.env.BASE_URL,
  routes: [
    ...home,
    ...practice,
    ...modArr,
    ...modList,
  ]
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

//路由守卫
router.beforeEach((to,from,next)=>{
  //增加登录判断,令牌验证，无令牌返回值为401,跳转登录登陆成功，服务器签发令牌（token），缓存本地，后续请求中携带该令牌
  //服务器无状态话
  console.log('to',to,vue);
  if (to.meta.auth){ //通过对路由的判断，来验证是否登录
    const token=localStorage.getItem('token');
    if (token){
      next();
    }else{
      vue&&vue.$message({
        showClose: false,
        message: '登录状态异常，请重新登录',
        type: 'error',
        duration:1000,
      });
      next({
        path:'login',
        query:{redirect:to.path}//无权限来源路由，友好跳转
      })
    }
  }else{
    next();
  }
});

export default router;
