<template>
  <div class="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
    <h1 class="text-3xl font-semibold mb-6 text-center">Connexion</h1>
    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label for="email" class="block text-gray-700 font-medium mb-1">Email :</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="password" class="block text-gray-700 font-medium mb-1">Mot de passe :</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/useAuth'

const email = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  const { success, message } = await login(email.value, password.value)

  if (success) {
    router.push('/profile')
  } else {
    alert(message || 'Échec de la connexion')
  }
}
</script>
