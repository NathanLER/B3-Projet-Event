<template>
  <div>
    <nav>
      <router-link to="/">Accueil</router-link> 
      <router-link v-if="!token" to="/login">Connexion</router-link>
      <router-link v-if="token" to="/profile">Profile</router-link>
      <router-link  v-if="token" to="/events">Ajouter Événements</router-link>
      <router-link  v-if="token" to="/listevents">Liste des Événements</router-link>
      <button v-if="token" @click="handleLogout">Se déconnecter</button>
    </nav>
    <router-view />
  </div>
  
</template>

<script setup >
import { ref } from 'vue'
import { useAuth } from './services/useAuth'
import { useRouter } from 'vue-router'
import { logout } from './services/logout'
import { token } from './services/setToken' 
const router = useRouter()

function handleLogout() {
  logout(router)
  router.push('/login')
}

</script>

<style>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
}
a {
  margin: 0 1rem;
  text-decoration: none;
}
</style>
