import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '/src/pages/b/views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/b',
  routes
})

export default router
