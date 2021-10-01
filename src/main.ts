import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import i18n from './ts/i18n/i18n'


import './css/index.css'
import 'animate.css'

// import Home from '@/pages/Home.vue'
// import Social from '@/pages/Social.vue'
// import Alive from '@/pages/Alive.vue'
// import Archive from '@/pages/Archive.vue'

// const routes= [
//     { path: '/', component: Home },
//     { path: '/social', component: Social },
//     { path: '/alive', component: Alive },
//     { path: '/archive', component: Archive }
    
// ]
// const router = new VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes,
// })

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// createApp(App).mount('#app')
