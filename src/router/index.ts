import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/about/AboutView.vue'
import LoginView from '@/views/login/LoginView.vue'
import HomeView from '@/views/home/HomeView.vue'
import StudentsView from '@/views/students/list/StudentsView.vue'
import AddStudentView from '@/views/students/add/AddStudentView.vue'
import BatchListView from '@/views/settings/batch/list/BatchListView.vue'
import LevelView from '@/views/settings/level/list/LevelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentsView,
      meta: { requiresAuth: true },
    },

    {
      path: '/students/add',
      name: 'students-add',
      component: AddStudentView,
      meta: { requiresAuth: true },
    },
    {
      path: '/batch',
      name: 'batch',
      component: BatchListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/levels',
      name: 'levels',
      component: LevelView,
      meta: { requiresAuth: true },
    },
  ],
})

function isAuthenticated() {
  return !!localStorage.getItem('access_token')
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
