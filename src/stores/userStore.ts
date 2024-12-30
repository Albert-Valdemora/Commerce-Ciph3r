import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const useUserStore = defineStore('user', {
  state: () => {
    // Verificar si ya hay un usuario guardado en localStorage
    const storedUser = localStorage.getItem('user');
    return {
      user: storedUser ? JSON.parse(storedUser) : null, // Si hay, cargarlo; si no, inicializar como null
    };
  },
  actions: {
    setUser(user: User) {
      this.user = user;
      // Guardar el usuario en localStorage cuando se actualice el estado
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      this.user = null;
      // Limpiar localStorage cuando el usuario cierre sesión
      localStorage.removeItem('user');
    },
  },
});
