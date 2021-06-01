
export default [
  {
    path: '/element-first',
    component: resolve => require(['../view/kaikeba-practice/element-practice'],resolve),
    meta:{
      //增加权限标识
      auth:true
    }
  },
  {
    path: '/element-myself',
    component: resolve => require(['../view/kaikeba-practice/element-myself'],resolve),
    meta:{
      //增加权限标识
      auth:true
    }
  },
  {
    path:'/user-list',
    component:resolve=>require(['../view/home/list'],resolve),
    meta:{
      //增加权限标识
      auth:true
    }
  },
  {
    path:'/user-detail/:id',
    component:resolve=>require(['../view/home/detail'],resolve),
    meta:{
      //增加权限标识
      auth:true
    }
  },
  {
    //验证-匿名视图-复合路由
    path:'/recombination',
    name:'recombination',
    components:{
      default: resolve =>require(['../view/router-components/parent-component'],resolve),
      child: resolve =>require(['../view/router-components/children-components'],resolve)
    }
  },
  {
    //父子路由
    path:'/nest/:id',
    props:true,//允许参数共用（route.params的另外一种取值方法），
    component:resolve =>require(['../view/router-components/parent-view'],resolve),
    children:[{
      path:'test',
      component:resolve =>require(['../view/router-components/children-components'],resolve)
    }]
  },
  {
    path:'/fileUpload',
    component:resolve=>require(['../component/upload/fileUpload'],resolve)
  }
]
