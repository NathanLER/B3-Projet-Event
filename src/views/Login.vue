<template>
    <div class="login">
      <h1>Connexion</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email :</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">Se connecter</button>
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
  
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 3rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  input {
    display: block;
    width: 95%;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
  }
  </style>
  