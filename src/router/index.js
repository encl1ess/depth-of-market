import { createRouter, createWebHistory } from 'vue-router'
import BookView from '@/views/BookView'
import DiffInfoView from '@/views/DiffInfoView'
import MainView from '@/views/MainView'

const routes = [
  {
    path: '/',
    component: MainView
  },
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
