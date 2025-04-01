import { createRouter, createWebHistory } from 'vue-router'

import FinalUser from './pages/FinalUser.vue'
import CreateCatalog from './pages/CreateCatalog.vue'

const routes = [
    { path: '/', component: CreateCatalog },
    { path: '/shop/:shopUrl', component: FinalUser },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})