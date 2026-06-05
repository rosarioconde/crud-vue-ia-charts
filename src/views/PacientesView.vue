<script setup>
import { onMounted, ref } from 'vue'
import PacienteForm from '@/components/PacienteForm.vue'
import PacienteList from '@/components/PacienteList.vue'
import { usePacientes } from '@/composables/usePacientes'

const {
  pacientes,
  loading,
  error,
  totalPacientes,
  pacientesEnProgreso,
  fetchPacientes,
  addPaciente,
  editPaciente,
  deletePaciente
} = usePacientes()

const selectedPaciente = ref(null)

onMounted(() => {
  fetchPacientes()
})

async function handleSave(paciente) {
  if (selectedPaciente.value) {
    await editPaciente(selectedPaciente.value.id, paciente)
    selectedPaciente.value = null
  } else {
    await addPaciente(paciente)
  }
}

function handleEdit(paciente) {
  selectedPaciente.value = paciente
}

async function handleDelete(id) {
  const confirmDelete = confirm(
    '¿Seguro que querés eliminar este paciente?'
  )

  if (confirmDelete) {
    await deletePaciente(id)
  }
}

function cancelEdit() {
  selectedPaciente.value = null
}
</script>
<template>
  <main class="container mt-4 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h1 class="h2 mb-1">Pacientes veterinarios</h1>
        <p class="text-muted mb-0">
          Gestión de pacientes de fisioterapia animal
        </p>
      </div>

      <RouterLink to="/dashboard" class="btn btn-outline-secondary">
        Volver al dashboard
      </RouterLink>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Total de pacientes</h5>
            <p class="fs-3 mb-0">{{ totalPacientes }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">En progreso</h5>
            <p class="fs-3 mb-0">{{ pacientesEnProgreso.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="alert alert-info">
      Cargando pacientes...
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="row g-4">
      <div class="col-lg-5">
        <PacienteForm
          :selected-paciente="selectedPaciente"
          @save="handleSave"
          @cancel="cancelEdit"
        />
      </div>

      <div class="col-lg-7">
        <PacienteList
          :pacientes="pacientes"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </main>
</template>