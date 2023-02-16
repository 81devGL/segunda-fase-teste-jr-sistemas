import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { LoginPage, AdminPage, RegisterPeoplePage, EditPeoplePage } from '../views'

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
  {
    path: '/register-people',
    name: 'RegisterPeoplePage',
    component: RegisterPeoplePage
  },
  {
    path: '/edit-people',
    name: "EditPeoplePage",
    component: EditPeoplePage
  }
]

const router = new VueRouter({
  routes
})

export default router
