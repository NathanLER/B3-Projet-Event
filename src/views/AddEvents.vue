<template>
  <div class="events">
    <h1>Gestion des Événements</h1>

    <!-- Création d'événement -->
    <form @submit.prevent="handleCreateEvent">
      <h2>Créer un événement</h2>
      <input v-model="newEvent.title" placeholder="Titre" required />
      <input v-model="newEvent.date" type="date" required />
      <textarea v-model="newEvent.description" placeholder="Description" required />
      <input v-model="newEvent.location" placeholder="Lieu" required />
      <input v-model.number="newEvent.maxParticipants" type="number" min="1" placeholder="Nombre max de participants" required />
      <button type="submit" :disabled="loading">{{ loading ? 'Création...' : 'Créer' }}</button>
    </form>

    <hr />

    <div v-if="message" :class="{'error': !success, 'success': success}">
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
  maxParticipants: 1,
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
    maxParticipants: newEvent.value.maxParticipants,
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
      maxParticipants: 1,
    }
  } else {
    success.value = false
    message.value = result.message || 'Erreur lors de la création de l\'événement.'
  }
}
</script>
  
  <style scoped>
  .events {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input, textarea {
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
  }
  </style>
  