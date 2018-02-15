import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import View from '@/views/View'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/view/:id', component: View }
]

export default new Router({
  mode: 'history',
  routes: routes
})
