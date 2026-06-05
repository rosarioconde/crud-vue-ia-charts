import { defineStore } from 'pinia'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: authService.getSession(),
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isVeterinario: (state) => state.user?.role === 'veterinario'
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        const user = authService.login(email, password)
        this.user = user
        authService.saveSession(user)
        return true
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      authService.clearSession()
    }
  }
})