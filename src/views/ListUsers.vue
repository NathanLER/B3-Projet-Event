<template>
    <div class="max-w-6xl mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-6 text-center">Liste des utilisateurs</h2>
  
      <div v-if="users.length === 0" class="text-center text-gray-500">Aucun utilisateur trouvé.</div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="user in users"
          :key="user._id"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5"
        >
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ user.firstName }} {{ user.lastName }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Email :</strong> {{ user.email }}</p>
          <button
          @click="editUser(user)"
          class="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >Modifier l'utilisateur
    </button>
    <button
          @click="askDelete(user)"
          class="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition"
        >Supprier l'utilisateur
    </button>
    <ConfirmDialog
      :visible="showConfirm"
      @confirm="handleConfirmDelete"
      @cancel="showConfirm = false"
    />
    <EditUserDialog
  :visible="showEdit"
  :user="userToEdit"
  :token="token"
  @cancel="showEdit = false"
  @updated="handleUserUpdated"
/>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref,onMounted } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'

import { getListUsers } from '../services/getListUsers'
import EditUserDialog from './EditUserDialog.vue'
import { token } from '../services/setToken'
import { deleteUser } from '../services/deleteUser'



const users = ref([])
const loading = ref(false)
const error = ref(null)
const user = ref(null)

const showEdit = ref(false)
const userToEdit = ref(null)

function editUser(user) {
  // console.log(user.email)
  userToEdit.value = user
  showEdit.value = true
}


onMounted(async () => {
  // console.log('peppepep')
  users.value = await getListUsers()

})

function handleUserUpdated(updatedUser) {
  // console.log(updatedEvent.data.updatedEvent._id)

  users.value  = users.value.map(e =>
  e._id === updatedUser.data.updatedUser._id ? updatedUser.data.updatedUser : e
)

  
  showEdit.value = false
}


const userToDelete = ref(null)
const showConfirm = ref(false)
function askDelete(user) {
  // console.log(event)
  userToDelete.value = user
  showConfirm.value = true
}

async function handleConfirmDelete() {
  const result = await deleteUser(userToDelete.value._id, token.value)
  if (result.success) {
    users.value = users.value.filter(e => e._id !== userToDelete.value._id)
  } else {
    console.error("Erreur suppression :", result.message)
  }
  showConfirm.value = false
}
</script>