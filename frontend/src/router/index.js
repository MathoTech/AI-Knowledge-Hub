import { createRouter, createWebHistory } from 'vue-router'; 
import HomeView from '../views/HomeView.vue';
import ChatView from '../views/ChatView.vue';

const routes = [
  { path: '/home', component: HomeView },
  { path: '/chat', component: ChatView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
