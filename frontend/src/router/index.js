import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomePages from '../views/HomePages.vue'
import Dashboard from '../views/Dashboard.vue'
import Suggestions from '../views/Suggestions.vue'
import SelfReport from '../views/SelfReport.vue'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePages',
      component: HomePages
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/suggestions',
      name: 'Suggestions',
      component: Suggestions
    },
    {
      path: '/self_report',
      name: 'SelfReport',
      component: SelfReport
    }
  ]
})

export default router
