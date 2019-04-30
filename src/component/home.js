
export default [
  {
    path: '/',
    component:resolve => require(['./hello'],resolve)
  },
  {
    path:'/picture',
    component:resolve　=>require(['./picture'],resolve)
  }
]
