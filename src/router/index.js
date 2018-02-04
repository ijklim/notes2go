import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Note from '@/components/Note'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/note',
      component: Note
    }
  ]
})
