import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './components/Home.vue';
import AboutView from './components/About.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: HomeView },
        { path: '/about', name: 'About', component: AboutView },
    ],
});

export default router;