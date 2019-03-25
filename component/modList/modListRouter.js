export default [
  {
    path: '/modListOne',
    component: resolve => require(['../../component/modList/modListOne'], resolve)
  },
  {path: '/modListTwo',
    component: resolve => require(['../../component/modList/modListTwo'], resolve)
  }
]
