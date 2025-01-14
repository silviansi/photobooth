import { createApp } from 'vue';
import App from './App.vue';
import HomeView from './components/Home.vue';

const app = createApp(App);
app.component('HomeView', HomeView);
app.mount('#app');