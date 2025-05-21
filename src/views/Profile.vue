<template>
  <div v-if="user">
    <h1>Bienvenue, {{ user.name }}</h1>
    <p>Email : {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Chargement du profil...</p>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted  } from 'vue'
import { getCurrentUser } from '../services/useAuth'
const user = ref(null)

onMounted(async () => {
user.value = await getCurrentUser()})

  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 2rem;
  }
  </style>
  