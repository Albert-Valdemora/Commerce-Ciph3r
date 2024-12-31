<!-- /**
 * Maneja el proceso de regisro de usuario.
 * Envía los datos del usuario (name, correo y contraseña) a la API para registrar al usuario.
 * Si el registro es exitosa, guarda el token y la información del usuario en el store.
 * Luego, redirige al usuario al dashboard.
 */ -->

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const c_password = ref('');

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    //Aqui capturamos los datos ingresados por el usuario
    const body = new URLSearchParams();
    body.append('name', name.value);
    body.append('email', email.value);
    body.append('password', password.value);
    body.append('c_password', c_password.value);

    //Aqui hacemos el envio a la api
    const response = await fetch('https://api.takeit.ciph3r.co/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const data = await response.json();

    //Verificamos que la repuesta de la api sea exitosa
    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    const { token, name: nameRes, user } = data.data;

    //Actualizamos el Store del usuario
    userStore.setUser({
      id: user.uuid,
      name: nameRes,
      email: user.email,
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
  <div class="p-7 custom-shadow rounded-lg bg-gray-800">
    <h2 class="text-3xl text-center mb-3 font-extrabold">Registro</h2>
    <p class="text-center text-md font-medium">Ingresa tus datos para crear a tu cuenta</p>

    <form @submit.prevent="handleLogin">
      <div class="flex flex-col gap-6 mt-6">
        <input
          class="bg-slate-600 rounded-md p-3"
          label="Name"
          placeholder="Albert"
          type="text"
          v-model="name"
        />

        <input
          class="bg-slate-600 rounded-md p-3"
          label="Email"
          placeholder="a@example.com"
          type="email"
          v-model="email"
        />

        <input
          type="password"
          class="max-w-xs bg-slate-600 rounded-md p-3"
          v-model="password"
          placeholder="Password"
          label="Password"
        />
        <input
          type="password"
          class="max-w-xs bg-slate-600 rounded-md p-3"
          v-model="c_password"
          placeholder="Password"
          label="c_password"
        />

        <Button radius="sm" class="w-full h-11 font-bold mb-5 bg-blue-600" type="submit">
          Registrar
        </Button>
      </div>
    </form>

    <div class="text-center mt-7 text-md font-medium">
      <router-link to="/" class="link"> Ya tienes una cuenta? </router-link>
    </div>
  </div>
</template>
