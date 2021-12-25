import Vue from 'vue'
import VueRouter from 'vue-router'
import TheHome from '../views/TheHome.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TheHome',
    component: TheHome
  },
  {
    path: '/edit/:id',
    name: 'TheEdit',
    component: () => import('../views/TheEdit.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
