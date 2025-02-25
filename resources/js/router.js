import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Camera from './views/Camera.vue'; 
import Edit from './views/Edit.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/camera', component: Camera },
  { path: '/edit', component: Edit }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;