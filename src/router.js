
import MainPage from "./pages/MainPage.vue";
import { createRouter, createWebHistory } from "vue-router";



const routes = [
    {
        path: '/',
        component: MainPage
    }
]

const router = createRouter( {
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;