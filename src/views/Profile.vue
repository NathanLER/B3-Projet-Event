<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <div v-if="user">
      <h1 class="text-2xl font-bold mb-4">Bienvenue, {{ user.name }}</h1>
      <p class="text-gray-700">Email : {{ user.email }}</p>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>Chargement du profil...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentUser } from '../services/useAuth'

const user = ref(null)

onMounted(async () => {
  user.value = await getCurrentUser()
})
</script>
