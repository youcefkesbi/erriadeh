import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { guest: true },
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/ServicesView.vue'),
    meta: { guest: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { guest: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue'),
    meta: { guest: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresActive: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (!auth.loading && !auth.user) {
    await auth.fetchUser()
  }

  if (to.meta.requiresActive) {
    if (!auth.isAuthenticated) return next({ name: 'Login' })
    if (!auth.isActive) {
      // pending or rejected: redirect to home with message
      return next({ name: 'Home', query: { message: 'pending' } })
    }
    return next()
  }

  if (to.meta.requiresAdmin) {
    if (!auth.isAuthenticated) return next({ name: 'Login' })
    if (!auth.isAdmin) return next({ name: 'Home' })
    return next()
  }

  if (to.meta.guest && auth.isAuthenticated && auth.isActive && to.name === 'Home') {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
