import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';


export async function updateUser(id, updatedData, token) {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${id}`, // adapte l'URL à ton backend
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erreur mise à jour user :', error.response?.data || error.message)
      return { success: false, message: error.response?.data?.message || error.message }
    }
  }
  