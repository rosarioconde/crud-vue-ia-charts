import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const user = computed(() => authStore.user)
  const isLoggedIn = computed(() => authStore.isLoggedIn)
  const isAdmin = computed(() => authStore.isAdmin)
  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.error)

  async function login(email, password) {
    const success = await authStore.login(email, password)

    if (success) {
      router.push('/dashboard')
    }
  }

  function logout() {
    authStore.logout()
    router.push('/login')
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    loading,
    error,
    login,
    logout
  }
}