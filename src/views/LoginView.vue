<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')

const { login, loading, error } = useAuth()

function handleSubmit() {
  login(email.value, password.value)
}
</script>
<template>
  <main class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="card shadow w-100" style="max-width: 420px;">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <h1 class="h3 mb-2">🐾 VetPhysio</h1>
          <p class="text-muted mb-0">
            Iniciar sesión
          </p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="admin@test.com"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="1234"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
            ></span>

            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>

          <div
            v-if="error"
            class="alert alert-danger mt-3 mb-0"
          >
            {{ error }}
          </div>
        </form>

        <hr />

        <div class="bg-light rounded p-3 small">
          <p class="fw-bold mb-2">Usuarios de prueba</p>
          <p class="mb-1">
            <strong>Admin:</strong> admin@test.com / 1234
          </p>
          <p class="mb-0">
            <strong>Vet:</strong> vet@test.com / 1234
          </p>
        </div>
      </div>
    </div>
  </main>
</template>