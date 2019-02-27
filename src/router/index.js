import Vue from 'vue'
import Router from 'vue-router'
import HelloWord from '../components/HelloWorld.vue'
import Person from '../components/person.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component:HelloWord
    },
    {
      path: '/Person',
      name: 'Person',
      component:Person
    },
    {
      path: '*',
      redirect: '/Hello'
    }
  ]
})
