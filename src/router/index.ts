import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { LoginPage, AdminPage } from '../views'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [ 
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/',
    name: 'AdminPage',
    component: AdminPage
  },
]

const router = new VueRouter({
  routes
})

export default router
