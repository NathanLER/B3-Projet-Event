<template>

<div v-if="!token" class="home max-w-3xl mx-auto text-center mt-16 px-4">
    <h1 class="text-4xl font-bold mb-6">Bienvenue sur notre site</h1>
    <p class="text-lg mb-4">Ceci est la page d'accueil.</p>
    <p class="text-sm text-gray-500">{{ token }}</p>
  </div>


<div v-if="token"><h2 class="text-3xl font-semibold mb-6 text-center" >Prochain événement auquel vous êtes inscrit</h2></div>


<div v-if="token" class="max-w-6xl mx-auto p-4">
    <h2 class="text-3xl font-semibold mb-6 text-center"></h2>

    <div v-if="loading" class="text-center italic text-gray-600">Chargement des événements...</div>
    <div v-else-if="error" class="text-center text-red-600 font-semibold">{{ error }}</div>
    <div v-else>
      <div v-if="listEvents.length === 0" class="text-center text-gray-500 text-lg py-10">Aucun événement disponible.</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in listEvents"
          :key="event._id"
          class="relative bg-white rounded-lg shadow-md p-5 flex flex-col justify-between"
        >

          <div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">{{ event.title }}</h3>

            <p class="text-gray-700 mb-3">{{ event.description }}</p>
            <p class="text-gray-600 text-sm mb-1"><strong>Date :</strong> {{ formatDate(event.date) }}</p>
            <p class="text-gray-600 text-sm mb-1"><strong>Lieu :</strong> {{ event.location }}</p>
            <!-- <p class="text-gray-600 text-sm"><strong>   :</strong> {{  event.participantsCount  }} / {{ event.capacity }}</p> -->
            <!-- <p class="text-gray-600 text-sm"><strong>Capacité :</strong> {{ event.capacity   }}</p> -->
          </div >




        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { inject } from 'vue'
import { ref,onMounted } from 'vue'
import {getListEventsRegister} from '../services/getListEventRegister'
import { token } from '../services/setToken'


const loading = ref(false)
const error = ref(null)
const listEvents = ref([])


onMounted(async () => {
  // user.value = await getListEventsRegister()

  loading.value = true
  error.value = null
  try {
    // listEvents.value = await getListEventsRegister()
    // console.log(getListEventsRegister())
    listEvents.value = await getListEventsRegister()
    // console.log(listEvents.value.value)

  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement des événements.'
  } finally {
    loading.value = false
  }
})


function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// console.log(listEvents.value)
// Si tu as un token injecté ou défini globalement, sinon tu peux le récupérer ici autrement
// const token = inject('token', '')  
</script>

