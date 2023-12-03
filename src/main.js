import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Ranking from './components/Ranking.vue';
import Scoreboard from './components/Scoreboard.vue';

const routes = [
  { path: '/', component: Ranking},
  { path: '/scoreboard', component: Scoreboard},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
