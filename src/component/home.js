
export default [
  {
    path: '/',
    component:resolve => require(['./hello'],resolve),
    name:'index'
  },
  {
    path: '/layout',
    component: resolve => require(['./login/index'], resolve),
    name: 'other',
  },
  {
        path:'/login',
        component:resolve=>require(['./login/Login'],resolve),
        name:'login'
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
  {
    path:'/picture',
    component:resolve　=>require(['./picture'],resolve),
  }
]
