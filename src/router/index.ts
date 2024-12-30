import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        // Si el usuario ya está autenticado, redirigirlo al dashboard
        if (userStore.user) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        // Si el usuario ya está autenticado, redirigirlo al dashboard
        if (userStore.user) {
          next('/dashboard');
        } else {
          next();
        }
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        // Verifica si el usuario está autenticado antes de permitirle acceder al dashboard
        if (!userStore.user) {
          next('/'); // Redirigir al login si no está autenticado
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
