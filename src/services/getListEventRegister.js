import { ref } from 'vue'
import api from './axios';
import { setToken, token } from './setToken';
import {getListEvents} from './getListEvents';
import {getCurrentUser} from './useAuth';
 

export async function getListEventsRegister() {
    const users = ref([])
    users.value = await getCurrentUser()
    const id = users.value.id


    const listEvents = ref([])
    listEvents.value = await getListEvents()
    const listeEventsRegister = ref([])
    // console.log(listEvents.value)
    listEvents.value.forEach(event => {
        event.participants.forEach((participant => {
            // console.log(participants==id)
            if (participant==id) {
            listeEventsRegister.value.push(event)

            }
          }))
      })
    // console.log('aaaaaaaaaaaaaaaaaaaaaa')
    return listeEventsRegister.value



  }
  

