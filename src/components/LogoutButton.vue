<script lang="ts" setup>
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout(); // Esto limpiará el estado de usuario en el store
  router.push('/'); // Redirigir al login
};
</script>

<template>
  <button @click="handleLogout">Logout</button>
</template>
