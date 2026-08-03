import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/admin',
    component: () => import('../pages/AdminPage.vue')
  },
  {
    path: '/user',
    component: () => import('../pages/UserPage.vue')
  }
]

export default routes