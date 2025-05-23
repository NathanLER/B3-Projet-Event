import { ref } from 'vue'
import api from './axios';


export async function deleteUser(id, token) {
    try {
      const response = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur inconnue'
      }
    }
  }
  