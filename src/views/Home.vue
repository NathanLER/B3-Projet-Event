<template>
  <div class="home max-w-3xl mx-auto text-center mt-16 px-4">
    <h1 class="text-4xl font-bold mb-6">Bienvenue sur notre site</h1>
    <p class="text-lg mb-4">Ceci est la page d'accueil.</p>
    <p class="text-sm text-gray-500">{{ token }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// Si tu as un token injecté ou défini globalement, sinon tu peux le récupérer ici autrement
const token = inject('token', '') 
</script>

<style scoped>
/* Tu peux supprimer ce style car Tailwind s'en charge */
</style>
