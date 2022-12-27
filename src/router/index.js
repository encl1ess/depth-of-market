import { createRouter, createWebHistory } from 'vue-router'
import BookView from '@/views/BookView'
import DiffInfoView from '@/views/DiffInfoView'

const routes = [
  {
    path: '/book',
    component: BookView
  },
  {
    path: '/info',
    component: DiffInfoView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
