import { createRouter, createWebHistory } from 'vue-router'
import PoemList from '@/views/PoemList.vue'
import PoemDetail from '@/views/PoemDetail.vue'

const routes = [
  {
    path: '/',
    name: 'PoemList',
    component: PoemList
  },
  {
    path: '/poem/:id',
    name: 'PoemDetail',
    component: PoemDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router