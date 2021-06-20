import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import cookies from '../utils/cookies'

const requireAuth = () => (to, from, next) => {
  if (cookies.getAuthFromCookie() !== '' && cookies.getAuthFromCookie() !== null) {
    return next()
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customer',
    component: () => import('@/views/Customer.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/customerHome.vue')
      },
      {
        path: 'register',
        component: () => import('@/views/customerRegister.vue')
      },
      {
        path: 'list',
        component: () => import('@/views/customerVocList.vue')
      }
    ]
  },
  {
    path: '/manager',
    beforeEnter: requireAuth(),
    component: () => import('@/views/Manager.vue'),
    children: [
      {
        name: 'manager',
        path: '',
        component: () => import('@/views/managerHome.vue')
      },
      {
        path: 'assign',
        component: () => import('@/views/managerAssign.vue')
      },
      {
        path: 'reply',
        component: () => import('@/views/managerReply.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/ManagerLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
