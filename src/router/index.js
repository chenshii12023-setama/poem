import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const PoemList = () => import('@/views/PoemList.vue')
const PoemDetail = () => import('@/views/PoemDetail.vue')
const LoginView = () => import('@/views/LoginView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/poems',
    name: 'PoemList',
    component: PoemList,
    meta: { requiresAuth: true }
  },
  {
    path: '/poems/:id',
    name: 'PoemDetail',
    component: PoemDetail,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/poems')
  } else {
    next()
  }
})

export default router