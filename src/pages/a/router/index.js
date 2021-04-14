import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Test from '../views/test'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },{
    path: '/test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/a',
  routes
})

export default router
