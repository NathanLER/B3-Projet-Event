import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';

export async function getListUsers() {
    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        }
      })
      
      return response.data.data.users
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err)
      return null
    }
  }