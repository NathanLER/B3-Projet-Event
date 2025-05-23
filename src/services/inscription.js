import { ref } from 'vue'
import api from './axios';


export async function inscription(event, token) {
    try {

        
      const response = await api.post(`/events/${event._id}/register`,{}, {
        headers: {
          Authorization: `Bearer ${token}`

        }
        
      })
      event.isRegistered= true
      event.participantsCount+=1
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erreur lors de l inscription l\'événement :', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur inconnue'
      }
    }
  }
  
  export async function deinscription(event, token) {
    try {

        
      const response = await api.post(`/events/${event._id}/unregister`,{}, {
        headers: {
          Authorization: `Bearer ${token}`

        }
        
      })
      event.isRegistered= false
      event.participantsCount-=1
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erreur lors de l inscription l\'événement :', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur inconnue'
      }
    }
  }