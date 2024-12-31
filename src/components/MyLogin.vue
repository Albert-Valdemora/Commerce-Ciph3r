<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    //Aqui capturamos los datos ingresados por el usuario
    const body = new URLSearchParams();
    body.append('email', email.value);
    body.append('password', password.value);

    //Aqui hacemos el envio a la api
    const response = await fetch('https://api.takeit.ciph3r.co/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    //Verificamos que la repuesta de la api sea exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el login');
    }

    const data = await response.json();
    const { token, email: emailRes, name, user } = data.data;

    //Actualizamos el Store del usuario
    userStore.setUser({
      id: user.uuid,
      name: name,
      email: emailRes,
      token: token,
    });

    // Redirigir al usuario a la página principal o al dashboard
    router.push('/dashboard');
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <div class="w-96 p-7 custom-shadow rounded-lg bg-gray-800">
    <h2 class="text-3xl text-center mb-3 font-extrabold">Login</h2>
    <p class="text-center text-md font-medium">Ingresa tus credenciales para acceder a tu cuenta</p>

    <form @submit.prevent="handleLogin">
      <div class="flex flex-col gap-6 mt-6">
        <input
          class="bg-slate-600 rounded-md p-3"
          label="Email"
          placeholder="a@example.com"
          type="email"
          v-model="email"
        />

        <input
          class="max-w-xs bg-slate-600 rounded-md p-3"
          v-model="password"
          placeholder="Password"
          label="Password"
          :type="isVisible ? 'text' : 'password'"
        />

        <Button radius="sm" class="w-full h-11 font-bold mb-5 bg-blue-600" type="submit">
          Login
        </Button>
      </div>
    </form>

    <div class="text-center mt-7 text-md font-medium">
      <router-link to="/register" class="link"> Quieres crear una cuenta? </router-link>
    </div>
  </div>
</template>

<style scoped></style>
