<template>
  <div class="max-w-6xl mx-auto p-4">
    <h2 class="text-3xl font-semibold mb-6 text-center">Événements disponibles</h2>

    <div v-if="loading" class="text-center italic text-gray-600">Chargement des événements...</div>
    <div v-else-if="error" class="text-center text-red-600 font-semibold">{{ error }}</div>
    <div v-else>
      <div v-if="events.length === 0" class="text-center text-gray-500 text-lg py-10">Aucun événement disponible.</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in events"
          :key="event._id"
          class="relative bg-white rounded-lg shadow-md p-5 flex flex-col justify-between"
        >
        <button
    v-if="user?.admin"
    @click="editEvent(event)"
    class="absolute top-2 right-2 text-gray-500 hover:text-yellow-600"
    title="Modifier"
  >
  ✏️
  </button>
          <div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">{{ event.title }}</h3>

            <p class="text-gray-700 mb-3">{{ event.description }}</p>
            <p class="text-gray-600 text-sm mb-1"><strong>Date :</strong> {{ formatDate(event.date) }}</p>
            <p class="text-gray-600 text-sm mb-1"><strong>Lieu :</strong> {{ event.location }}</p>
            <p class="text-gray-600 text-sm"><strong>Participant :</strong> {{  event.participantsCount  }} / {{ event.capacity }}</p>
            <!-- <p class="text-gray-600 text-sm"><strong>Capacité :</strong> {{ event.capacity   }}</p> -->
          </div >
          <div class="flex items-center space-x-2 mt-4">
          <button
            :disabled="event.participantsCount == event.capacity"
            v-if="!event.isRegistered"
            @click="inscription(event,token)"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            S'inscrire
          </button>
          <button
            v-if="event.isRegistered"
            @click="deinscription(event,token)"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Se désinscrire
          </button>
          <button
            v-if="user?.admin"
            @click="askDelete(event)"
            class="w-auto bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
            title="Supprimer"
          >
            🗑️
          </button>
        </div>
                  <!-- <button
                  v-if="user?.admin"
                  @click="editEvent(event)"
                  class="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
                >
                  Modifier
                </button> -->
                <EditEventDialog
          :visible="showEdit"
          :event="eventToEdit"
          :token="token"
          @cancel="showEdit = false"
          @updated="handleEventUpdated"
        />

        </div>
      </div>
    </div>

    <!-- Popup de confirmation -->
    <ConfirmDialog
      :visible="showConfirm"
      @confirm="handleConfirmDelete"
      @cancel="showConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getListEvents } from '../services/getListEvents'
import { getCurrentUser } from '../services/useAuth'
import { token } from '../services/setToken'
import { deleteEvent } from '../services/deleteEvent'
import ConfirmDialog from './ConfirmDialog.vue'
import { inscription, deinscription } from '../services/inscription'

const events = ref([])
const loading = ref(false)
const error = ref(null)
const user = ref(null)
const showConfirm = ref(false)
const eventToDelete = ref(null)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// function inscrire(event) {
//   alert(`Inscription à l'événement : ${event.title}`)
// }



// Étape 1 : Demande confirmation
function askDelete(event) {
  // console.log(event)
  eventToDelete.value = event
  showConfirm.value = true
}

// Étape 2 : Suppression confirmée
async function handleConfirmDelete() {
  const result = await deleteEvent(eventToDelete.value._id, token.value)
  if (result.success) {
    events.value = events.value.filter(e => e._id !== eventToDelete.value._id)
  } else {
    console.error("Erreur suppression :", result.message)
  }
  showConfirm.value = false
}

onMounted(async () => {
  user.value = await getCurrentUser()

  loading.value = true
  error.value = null
  try {
    events.value = await getListEvents()
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des événements.'
  } finally {
    loading.value = false
  }
})

import EditEventDialog from './EditEventDialog.vue'
//import { getListUsers } from '@/services/GetListUsers'

const showEdit = ref(false)
const eventToEdit = ref(null)

function editEvent(event) {
  // console.log(event)
  eventToEdit.value = event
  showEdit.value = true
}

function handleEventUpdated(updatedEvent) {
  // console.log(updatedEvent.data.updatedEvent._id)

  events.value  = events.value.map(e =>
  e._id === updatedEvent.data.updatedEvent._id ? updatedEvent.data.updatedEvent : e
)

  
  showEdit.value = false
}


</script>
