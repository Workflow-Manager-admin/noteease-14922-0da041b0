import { createRouter, createWebHistory } from 'vue-router'
import NotesContainer from '../components/NotesContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotesContainer
    }
  ]
})

export default router
