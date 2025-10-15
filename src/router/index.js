import { createRouter, createWebHistory } from 'vue-router'
import PoemList from '@/views/PoemList.vue'
import PoemDetail from '@/views/PoemDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/poems'
  },
  {
    path: '/poems',
    name: 'PoemList',
    component: PoemList
  },
  {
    path: '/poems/:id',
    name: 'PoemDetail',
    component: PoemDetail
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router