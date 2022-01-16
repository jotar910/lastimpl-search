import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { RouteNames } from '@/router/route-names'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/search',
    name: RouteNames.Search,
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/projects',
    name: RouteNames.Projects,
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
