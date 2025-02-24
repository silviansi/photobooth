import { createRouter, createWebHistory } from 'vue-router';
import Camera from './components/Camera.vue'; // Ubah path ke components
import Edit from './components/Edit.vue'; // Jika Edit.vue ada di views

const routes = [
  { path: '/', component: Camera },
  { path: '/edit', component: Edit }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
