import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';

export async function isAdmin() {
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
  