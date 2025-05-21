<template>
  <div class="events">
    <h2>Événements disponibles</h2>

    <div v-if="loading" class="loading">Chargement des événements...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="events-grid">
      <div v-if="events.length === 0" class="no-events">Aucun événement disponible.</div>
      <div v-for="event in events" :key="event._id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
        <p><strong>Date :</strong> {{ formatDate(event.date) }}</p>
        <p><strong>Lieu :</strong> {{ event.location }}</p>
        <p><strong>Max participants :</strong> {{ event.maxParticipants }}</p>
        <button class="btn-inscrire" @click="inscrire(event)">S'inscrire</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getListEvents } from '../services/getListEvents'

const events = ref([])
const loading = ref(false)
const error = ref(null)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
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
</script>

<style scoped>
.events {
  max-width: 900px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  padding: 0 10px;
}

.loading {
  font-style: italic;
  text-align: center;
  color: #555;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
}

.no-events {
  text-align: center;
  color: #777;
  padding: 20px 0;
  font-size: 1.1rem;
}

/* Flex grid container */
.events-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Each event card */
.event-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  width: calc(33.333% - 20px); /* 3 cards per row with gap */
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.event-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}

.event-card h3 {
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 1.2rem;
}

.event-card p {
  margin: 5px 0;
  color: #444;
  font-size: 0.9rem;
}

/* Responsive tweaks */
@media (max-width: 900px) {
  .event-card {
    width: calc(50% - 20px); /* 2 cards per row */
  }
}

@media (max-width: 600px) {
  .event-card {
    width: 100%; /* 1 card per row */
  }
}

.btn-inscrire {
  margin-top: 15px;
  padding: 8px 15px;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-inscrire:hover {
  background-color: #2980b9;
}
</style>
