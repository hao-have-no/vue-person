
export default [
  {
      path:'/',
      redirect:'/list',
  },
  {
    path: '/list',
    component:resolve => require(['./hello'],resolve),
    name:'index',
    meta:{
      //增加权限标识
      auth:true
    }
  },
  {
    path: '/login',
    component:resolve=>require(['./login/index'],resolve),
    name: 'login'
  },
  {
    path:'/logout',
    component:resolve=>require(['./login/Logout'],resolve),
    name:'logout'
  },
  {
    path:'/me',
    component:resolve=>require(['./login/me'],resolve),
    name:'me'
  },
  // {
  //   path:'/picture',
  //   component:resolve　=>require(['./picture'],resolve),
  // },
  {
    path: '/shopping',
    component: resolve => require(['./shopping/view'],resolve),
    // component: resolve => require(['./carts/Cart'],resolve),
    meta:{
      //增加权限标识
      auth:true
    }
  },
]
