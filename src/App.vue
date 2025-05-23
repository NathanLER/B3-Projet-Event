<template>
  <div class="min-h-screen bg-gray-50" >
    <nav class="bg-white shadow-md p-4 flex items-center justify-between">
      <div class="flex space-x-6">
        <router-link
          to="/"
          class="text-gray-700 hover:text-blue-600 font-semibold"
        >Accueil</router-link>

        <router-link
          v-if="!token"
          to="/login"
          class="text-gray-700 hover:text-blue-600 font-semibold"
        >Connexion</router-link>

        <template v-if="token">
          <router-link
            to="/profile"
            class="text-gray-700 hover:text-blue-600 font-semibold"
          >Profile</router-link>
          <router-link
            v-if="currentUser?.admin"
            to="/events"
            class="text-gray-700 hover:text-blue-600 font-semibold"
          >Ajouter Événements</router-link>
          <router-link
            to="/listevents"
            class="text-gray-700 hover:text-blue-600 font-semibold"
          >Liste des Événements</router-link>
          <router-link
            v-if="currentUser?.admin"
            to="/listusers"
            class="text-gray-700 hover:text-blue-600 font-semibold"
          >Liste des utilisateurs</router-link>
          <router-link
            v-if="currentUser?.admin"
            to="/createuser"
            class="text-gray-700 hover:text-blue-600 font-semibold"
          >Créer un utilisateur</router-link>
        </template>
      </div>

      <button
        v-if="token"
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Se déconnecter
      </button>

    </nav>

    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { token } from './services/setToken'
import { logout } from './services/logout'
import { getCurrentUser, currentUser } from './services/useAuth' // <-- ici

const router = useRouter()

function handleLogout() {
  logout(router)
  currentUser.value = null // <-- reset propre
  router.push('/login')
}

onMounted(async () => {
  if (token.value) {
    await getCurrentUser()
  }
})
</script>