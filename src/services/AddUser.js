import { ref } from 'vue'
import api from './axios';


export async function createUser(eventData, token) {
  try {
    console.log(eventData)
    const response = await api.post('/users', eventData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement :', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Erreur inconnue'
    }
  }
}
