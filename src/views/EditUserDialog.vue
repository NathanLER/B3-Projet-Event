<template>
    <div v-if="visible" class="fixed inset-0  bg-opacity-50  flex justify-center items-center z-50 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative ">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">Modifier l'événement</h2>
  
        <form @submit.prevent="submitEdit">
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Nom</label>
            <input v-model="form.lastName" type="text" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Prenom</label>
            <input v-model="form.firstName" type="text" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input v-model="form.email" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
  
          
  
          <div class="flex justify-end space-x-2">
            <button type="button" @click="$emit('cancel')" class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">
              Annuler
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { updateUser } from '../services/updateUser' // Assure-toi de créer ce service si tu ne l'as pas encore
  import { token } from '../services/setToken'
  
  const props = defineProps({
    visible: Boolean,
    user: Object,
    token: String,
  })
  
  const emit = defineEmits(['cancel', 'updated'])
  
  const form = ref({
    lastName: '',
    firstName: '',
    email: '',

  })
  
  watch(() => props.user, (newUser) => {
    // console.log(user)
    // console.log(newUser)
    if (newUser) {
      form.value = { ...newUser }
      // form.value.date = newEvent.date?.substring(0, 10) // format pour <input type="date">
    }
  })
  
  async function submitEdit() {
  const updatedData = {
    lastName: form.value.lastName,
    firstName: form.value.firstName,
    email: form.value.email
  }

  const result = await updateUser(props.user._id, updatedData, token.value)

  if (result.success) {
    emit('updated', result.data)
    close()
  } else {
    error.value = result.message
  }
}
  </script>
  