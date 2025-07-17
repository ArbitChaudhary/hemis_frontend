import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import HomeView from '@/views/home/HomeView.vue'
import StudentsView from '@/views/students/list/StudentsView.vue'
import AddStudentView from '@/views/students/add/AddStudentView.vue'
import BatchListView from '@/views/settings/batch/list/BatchListView.vue'
import LevelView from '@/views/settings/level/list/LevelView.vue'
import FacultyView from '@/views/settings/faculty/list/FacultyView.vue'
import ProgramsView from '@/views/settings/programs/list/ProgramsView.vue'
import CollegeListView from '@/views/college/list/CollegeListView.vue'
import CollegeAddView from '@/views/college/add/CollegeAddView.vue'
import CollegeEditView from '@/views/college/edit/CollegeEditView.vue'
import UsersView from '@/views/users/UsersView.vue'
import TeacherView from '@/views/teachers/list/TeacherView.vue'
import AddTeacherView from '@/views/teachers/add/AddTeacherView.vue'
import StaffView from '@/views/staffs/list/StaffView.vue'
import AddStaffView from '@/views/staffs/add/AddStaffView.vue'
import StaffEditView from '@/views/staffs/edit/StaffEditView.vue'

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
      path: '/college',
      name: 'college',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CollegeListView,
    },
    {
      path: '/college/add',
      name: 'college-add',
      component: CollegeAddView,
      meta: { requiresAuth: true },
    },
    {
      path: '/college/edit/:id',
      name: 'college-edit',
      component: CollegeEditView,
      meta: { requiresAuth: true },
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
      path: '/users',
      name: 'users',
      component: UsersView,
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
    {
      path: '/faculty',
      name: 'faculty',
      component: FacultyView,
      meta: { requiresAuth: true },
    },
    {
      path: '/programs',
      name: 'programs',
      component: ProgramsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: TeacherView,
      meta: { requiresAuth: true },
    },
    {
      path: '/teachers/add',
      name: 'teachers-add',
      component: AddTeacherView,
      meta: { requiresAuth: true },
    },
    {
      path: '/staffs',
      name: 'staffs',
      component: StaffView,
      meta: { requiresAuth: true },
    },
    {
      path: '/staffs/add',
      name: 'staffs-add',
      component: AddStaffView,
      meta: { requiresAuth: true },
    },
    {
      path: '/staffs/edit/:id',
      name: 'staffs-edit',
      component: StaffEditView,
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
