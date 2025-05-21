import { setToken } from './setToken'
import { useRouter } from 'vue-router'

export function logout(router) {
    setToken(null)
    router.push('/login')
  }



