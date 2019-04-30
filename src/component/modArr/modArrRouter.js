
export default [
  {
    path: '/modArrOne',
    component: resolve => require(['./modArrOne'],resolve)
  },
  {
    path: '/modArrOne/detail',
    component: resolve => require(['./modArrTwo'],resolve)
  }
]
