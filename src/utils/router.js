import { createMemoryHistory, createRouter } from 'vue-router'

import Main from '../views/Main.vue'
import AnnouncementContent from "../views/AnnouncementContent.vue";

const routes = [
    { path: '/fileShowContent\.php\?id\=:id', component: AnnouncementContent},
    { path: '/', component: Main }
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})