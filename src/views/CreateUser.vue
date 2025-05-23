<template>
    <div class="events max-w-lg mx-auto p-6">
      <h1 class="text-3xl font-semibold mb-6 text-center">Gestion des utilisateurs</h1>
  
      <!-- Création d'événement -->
      <form @submit.prevent="handleCreateUser" class="space-y-4">
        <h2 class="text-xl font-medium mb-4">Créer un utilisateur</h2>
  
        <input
          v-model="newUser.lastName"
          placeholder="Nom"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newUser.firstName"
          placeholder="Prenom"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newUser.email"
          placeholder="Email"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <input
          v-model="newUser.password"
          placeholder="Mot de passe"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p class="w-full  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">Utilisateur Admin ?</p>
        <select v-model="newUser.admin" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="false" selected>Non</option>
                <option value="true">Oui</option>
        </select>
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
import { createUser } from '../services/AddUser' // <-- Remplace le nom si nécessaire
import { token } from '../services/setToken'

// Données du formulaire
const newUser = ref({
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  admin: false, // "non" sélectionné par défaut
})

const loading = ref(false)
const message = ref('')
const success = ref(false)

// Création de l'utilisateur
async function handleCreateUser() {
  loading.value = true
  message.value = ''
  success.value = false

  try {
    const response = await createUser(newUser.value, token.value)

    if (response.success) {
      message.value = 'Utilisateur créé avec succès !'
      success.value = true

      // Réinitialiser le formulaire
      newUser.value = {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        admin: 'non',
      }
    } else {
      message.value = response.message || 'Erreur lors de la création.'
    }
  } catch (error) {
    message.value = 'Erreur serveur : ' + error.message
  } finally {
    loading.value = false
  }
}
</script>