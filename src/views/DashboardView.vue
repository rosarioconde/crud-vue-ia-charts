<script setup>
import { computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { usePacientes } from '@/composables/usePacientes'
import DashboardChart from '@/components/DashboardChart.vue'
import DashboardBarChart from '@/components/DashboardBarChart.vue'

const { user, isAdmin, logout } = useAuth()

const {
  pacientes,
  totalPacientes,
  pacientesEnProgreso,
  fetchPacientes
} = usePacientes()

const estadoChartData = computed(() => ({
  labels: ['En progreso', 'Alta Médica'],
  datasets: [
    {
      label: 'Pacientes',
      data: [
        pacientes.value.filter(
          p => p.estado === 'En progreso'
        ).length,
        pacientes.value.filter(
          p => p.estado === 'Alta Médica'
        ).length
      ],
      backgroundColor: [
        '#0d6efd',
        '#198754'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
}))
const especieChartData = computed(() => ({
  labels: ['Perros', 'Gatos'],
  datasets: [
    {
      label: 'Pacientes',
      data: [
        pacientes.value.filter(
          p => p.especie === 'Perro'
        ).length,
        pacientes.value.filter(
          p => p.especie === 'Gato'
        ).length
      ],
      backgroundColor: [
        '#ffc107',
        '#6f42c1'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
}))

const sesionesChartData = computed(() => ({
  labels: pacientes.value.map(p => p.nombre),
  datasets: [
    {
      label: 'Sesiones completadas',
      data: pacientes.value.map(p => p.sesiones_completadas),
      backgroundColor: '#0dcaf0'
    }
  ]
}))
onMounted(() => {
  fetchPacientes()
})
</script>

<template>
  <main class="container mt-4">
    <h1>Dashboard Veterinaria</h1>

    <p class="text-muted">
      Usuario: {{ user?.name }} | Rol: {{ user?.role }}
    </p>

    <div class="row my-4">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Total de pacientes</h5>
            <p class="fs-3">{{ totalPacientes }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>En progreso</h5>
            <p class="fs-3">{{ pacientesEnProgreso.length }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Alta médica</h5>
            <p class="fs-3">
              {{
                pacientes.filter(
                  paciente => paciente.estado === 'Alta Médica'
                ).length
              }}
            </p>
          </div>
        </div>
      </div>
    </div>


 <div class="row my-4">
  <div class="col-md-4">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <h5 class="card-title">Pacientes por estado</h5>

        <DashboardChart
          :chart-data="estadoChartData"
        />
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <h5 class="card-title">Pacientes por especie</h5>

        <DashboardChart
          :chart-data="especieChartData"
        />
      </div>
    </div>
  </div>

<div class="col-md-4">
  <div class="card shadow-sm h-100">
    <div class="card-body">

      <h5 class="card-title">
        Sesiones por paciente
      </h5>

      <DashboardBarChart
        :chart-data="sesionesChartData"
      />

    </div>
  </div>
</div>
</div>
    <section class="d-flex gap-2">
      <RouterLink to="/pacientes" class="btn btn-primary">
        Gestionar pacientes
      </RouterLink>

      <RouterLink
        v-if="isAdmin"
        to="/admin"
        class="btn btn-success"
      >
        Panel IA
      </RouterLink>

      <button @click="logout" class="btn btn-outline-danger">
        Cerrar sesión
      </button>
    </section>

    <section v-if="isAdmin" class="alert alert-info mt-4">
      Como administrador podés gestionar pacientes y generar informes con IA.
    </section>

    <section v-else class="alert alert-secondary mt-4">
      Como veterinario podés gestionar y consultar pacientes.
    </section>
  </main>
</template>