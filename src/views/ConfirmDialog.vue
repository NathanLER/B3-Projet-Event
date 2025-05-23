<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm text-center">
        <p class="text-lg font-semibold mb-4">{{ message }}</p>
        <div class="flex justify-center gap-4">
          <button
            @click="confirm"
            class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Oui
          </button>
          <button
            @click="cancel"
            class="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded transition"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: { type: String, default: 'Êtes-vous sûr de vouloir supprimer ?' },
    visible: Boolean
  })
  const emit = defineEmits(['confirm', 'cancel'])
  
  function confirm() {
    emit('confirm')
  }
  function cancel() {
    emit('cancel')
  }
  </script>
  