
export default [
  {
    path: '/modArrOne',
    component: resolve => require(['../../component/modArr/modArrOne'],resolve)
  },
  {
    path: '/modArrTwo',
    component: resolve => require(['../../component/modArr/modArrTwo'],resolve)
  }
]
