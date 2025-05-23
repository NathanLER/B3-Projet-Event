// src/services/updateEvent.js
import axios from 'axios'

export async function updateEvent(id, updatedData, token) {
  try {
    const response = await axios.put(
      `http://localhost:3000/events/${id}`, // adapte l'URL à ton backend
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
    console.error('Erreur mise à jour événement :', error.response?.data || error.message)
    return { success: false, message: error.response?.data?.message || error.message }
  }
}
