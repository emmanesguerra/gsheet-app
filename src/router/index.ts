import { createRouter, createWebHistory } from 'vue-router'
import SheetView from '../views/SheetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sheet',
      component: SheetView
    }
  ],
})

export default router
