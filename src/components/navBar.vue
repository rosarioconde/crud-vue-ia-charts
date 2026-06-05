<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const isAdmin = computed(() => authStore.isAdmin)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
    <div class="container-fluid">

      <RouterLink
        class="navbar-brand"
        to="/dashboard"
      >
        🐾 VetPhysio
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarNav"
      >
        <ul class="navbar-nav me-auto">

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/dashboard"
            >
              Dashboard
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/pacientes"
            >
              Pacientes
            </RouterLink>
          </li>

          <li
            v-if="isAdmin"
            class="nav-item"
          >
            <RouterLink
              class="nav-link"
              to="/admin"
            >
              Administración
            </RouterLink>
          </li>

        </ul>

        <div
          class="d-flex align-items-center gap-3"
          v-if="user"
        >
          <span class="small text-muted">
            👤 {{ user.name }}
            ({{ user.role }})
          </span>

          <button
            @click="handleLogout"
            class="btn btn-outline-danger btn-sm"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>