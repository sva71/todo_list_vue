import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: () => import('../views/Article.vue')
    },
    {
      path: '*',
      name: 'P404',
      component: () => import('../views/P404.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
