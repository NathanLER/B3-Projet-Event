// src/services/useAuth.js
import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';

export const currentUser = ref(null); // <-- réactif et exporté

export async function getCurrentUser() {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      }
    });
    currentUser.value = response.data; // <-- met à jour la ref
    return response.data;
  } catch (err) {
    console.error('Erreur lors de la récupération du profil :', err);
    currentUser.value = null;
    return null;
  }
}

export async function login(email, password) {
  try {
    const response = await api.post('/login', {
      email,
      password
    });
    const jwt = response.data.data.token;
    setToken(jwt);

    // ⬇️ récupère l'utilisateur après login
    await getCurrentUser();

    return { success: true };
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    return {
      success: false,
      message: err.response?.data?.message || 'Erreur inconnue'
    };
  }
}

export function useAuth() {
  return {
    login,
    getCurrentUser,
    currentUser, // <-- retourne la ref ici si tu veux l'utiliser avec `useAuth()`
  }
}
