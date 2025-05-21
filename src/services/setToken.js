import { ref } from 'vue'
export const token = ref(localStorage.getItem('token') || '')

export function setToken(newToken) {
  token.value = newToken
  if (newToken) {
    localStorage.setItem('token', newToken)
  } else {
    localStorage.removeItem('token')
  }
}

