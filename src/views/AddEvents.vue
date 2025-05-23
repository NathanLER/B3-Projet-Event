<template>
  <div class="events max-w-lg mx-auto p-6">
    <h1 class="text-3xl font-semibold mb-6 text-center">Gestion des Événements</h1>

    <!-- Création d'événement -->
    <form @submit.prevent="handleCreateEvent" class="space-y-4">
      <h2 class="text-xl font-medium mb-4">Créer un événement</h2>

      <input
        v-model="newEvent.title"
        placeholder="Titre"
        required
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="newEvent.date"
        type="date"
        required
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="newEvent.description"
        placeholder="Description"
        required
        rows="4"
        class="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <input
        v-model="newEvent.location"
        placeholder="Lieu"
        required
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model.number="newEvent.capacity"
        type="number"
        min="1"
        placeholder="Nombre max de participants"
        required
        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {{ loading ? 'Création...' : 'Créer' }}
      </button>
    </form>

    <hr class="my-6" />

    <div v-if="message" :class="success ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createEvent } from '../services/AddEvent'
import { token } from '../services/setToken'

const newEvent = ref({
  title: '',
  date: '',
  description: '',
  location: '',
  capacity: 1,
})

const loading = ref(false)
const message = ref('')
const success = ref(false)

async function handleCreateEvent() {
  loading.value = true
  message.value = ''
  success.value = false

  const eventData = {
    title: newEvent.value.title,
    date: newEvent.value.date,
    description: newEvent.value.description,
    location: newEvent.value.location,
    capacity: newEvent.value.capacity,
  }

  const result = await createEvent(eventData, token.value)
  loading.value = false

  if (result.success) {
    success.value = true
    message.value = 'Événement créé avec succès !'

    // Reset form
    newEvent.value = {
      title: '',
      date: '',
      description: '',
      location: '',
      capacity: 1,
    }
  } else {
    success.value = false
    message.value = result.message || "Erreur lors de la création de l'événement."
  }
}
</script>
