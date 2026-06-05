import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PacientesView from '@/views/PacientesView.vue'
import AdminView from '@/views/AdminView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pacientes',
    component: PacientesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const user = authService.getSession()

  if (to.meta.requiresAuth && !user) {
    return '/login'
  }

  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return '/dashboard'
  }
})

export default router
