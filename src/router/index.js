// router/index.js

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 당장은 라우터를 안 쓰기 때문에 routes 배열을 비워도 됨
  ],
})

export default router
