import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';

export async function getListEvents() {
    try {
      const response = await api.get('/events', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        }
      })

      return response.data.data.events
    } catch (err) {
      console.error('Erreur lors de la récupération du profil :', err)
      return null
    }
  }
  