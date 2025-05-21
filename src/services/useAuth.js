// src/services/useAuth.js
import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';



export async function getCurrentUser() {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      }
    })
    return response.data
  } catch (err) {
    console.error('Erreur lors de la récupération du profil :', err)
    return null
  }
}





export async function login(email, password) {
  try {
    const response = await api.post('/login', {
      email,
      password
    });
    console.log(response.data)
    const jwt = response.data.data.token;
    setToken(jwt);

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
  }
}
