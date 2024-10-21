import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import Login from '../views/auth/login.vue'
import Orders from '@/views/orders.vue'
import CreateFood from '@/views/createFood.vue'
import Dashboard from '@/components/dashboard.vue'
import Analytics from '@/components/analytics.vue'
import Food from '@/components/foodList.vue'
import Settings from '@/views/dropdown/settings.vue'
import NotFound from '@/components/error/notFound.vue'
import Signup from '@/views/auth/signup.vue'
import ForgotPassword from '@/views/auth/forgotPassword.vue'
import ResetPassword from '@/views/auth/resetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'orders',
          name: 'orders',
          component: Orders
        },
        {
          path: 'food',
          name: 'food',
          component: Food
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: Analytics
        },
        {
          path: 'create-food',
          name: 'create-food',
          component: CreateFood
        },

        {
          path: '/settings',
          name: 'settings',
          component: Settings
        }
      ]
    },

    {
      // path: "*",
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
