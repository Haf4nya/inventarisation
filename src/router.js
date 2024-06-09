import ItemPage from "./pages/ItemPage.vue";
import MainPage from "./pages/MainPage.vue";
import ScannerPage from "./pages/ScannerPage.vue";
import CreateItemPage from "./pages/CreateItemPage.vue";
import { createRouter, createWebHistory } from "vue-router";



const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/item/:id',
        name: 'item',
        component: ItemPage
     },
    {
        path: '/createItem/:id',
        name: 'createItem',
        component: CreateItemPage
    },
    {
        path: '/scanner',
        name: 'scanner',
        component: ScannerPage
    }
]

const router = createRouter( {
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;