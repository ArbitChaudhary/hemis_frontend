import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { CoHome, CoSchool, FaUserGraduate, LaChalkboardTeacherSolid } from 'oh-vue-icons/icons'
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

addIcons(CoHome, CoSchool, FaUserGraduate, LaChalkboardTeacherSolid)

// Register the component globally

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('v-icon', OhVueIcon)
app.use(VueQueryPlugin)
app.mount('#app')
