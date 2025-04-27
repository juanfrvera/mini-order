import { createRouter, createWebHistory } from 'vue-router'

import FinalUser from './pages/FinalUser.vue'
import CreateCatalog from './pages/CreateCatalog.vue'
import ShopDashboard from './pages/ShopDashboard.vue'

const routes = [
    { path: '/', component: CreateCatalog },
    { path: '/shop/:shopUrl', component: FinalUser }, // View shop's catalog as final user
    { path: '/dashboard', component: ShopDashboard }, // Edit shop's catalog as shop owner
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})