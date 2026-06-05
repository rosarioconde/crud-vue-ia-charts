<script setup>
defineProps({
  pacientes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <section class="mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="h4 mb-0">Listado de pacientes</h2>
      <span class="badge bg-primary">
        {{ pacientes.length }} pacientes
      </span>
    </div>

    <div class="row g-3">
      <div
        v-for="paciente in pacientes"
        :key="paciente.id"
        class="col-md-6 col-lg-4"
      >
        <article class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h3 class="h5 card-title mb-0">
                {{ paciente.nombre }}
              </h3>

              <span
                class="badge"
                :class="{
                  'bg-success': paciente.estado === 'Alta Médica',
                  'bg-warning text-dark': paciente.estado === 'En progreso',
                  'bg-secondary': paciente.estado === 'Pendiente'
                }"
              >
                {{ paciente.estado }}
              </span>
            </div>

            <p class="mb-1">
              <strong>Especie:</strong> {{ paciente.especie }}
            </p>

            <p class="mb-1">
              <strong>Raza:</strong> {{ paciente.raza }}
            </p>

            <p class="mb-1">
              <strong>Diagnóstico:</strong> {{ paciente.diagnostico }}
            </p>

            <p class="mb-1">
              <strong>Tratamiento:</strong> {{ paciente.tratamiento }}
            </p>

            <p class="mb-0">
              <strong>Sesiones:</strong> {{ paciente.sesiones_completadas }}
            </p>
          </div>

          <div class="card-footer bg-white d-flex gap-2">
            <button
              class="btn btn-outline-primary btn-sm w-100"
              @click="emit('edit', paciente)"
            >
              Editar
            </button>

            <button
              class="btn btn-outline-danger btn-sm w-100"
              @click="emit('delete', paciente.id)"
            >
              Eliminar
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>