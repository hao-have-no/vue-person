
export default [
  {
    path: '/modArrOne',
    component: resolve => require(['../../component/modArr/modArrOne'],resolve)
  },
  {
    path: '/modArrOne/detail',
    component: resolve => require(['../../component/modArr/modArrTwo'],resolve)
  }
]
