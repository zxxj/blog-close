import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { beforeEachGuard } from './guard'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import NotFound from '@/views/notFound/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    name: 'Layout'
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

beforeEachGuard(router)

export default router
