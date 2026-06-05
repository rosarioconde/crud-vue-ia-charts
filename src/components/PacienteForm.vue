<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  selectedPaciente: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  nombre: '',
  especie: '',
  raza: '',
  diagnostico: '',
  tratamiento: '',
  sesiones_completadas: 0,
  estado: 'En progreso'
})

watch(
  () => props.selectedPaciente,
  (paciente) => {
    if (paciente) {
      form.nombre = paciente.nombre
      form.especie = paciente.especie
      form.raza = paciente.raza
      form.diagnostico = paciente.diagnostico
      form.tratamiento = paciente.tratamiento
      form.sesiones_completadas = paciente.sesiones_completadas
      form.estado = paciente.estado
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function resetForm() {
  form.nombre = ''
  form.especie = ''
  form.raza = ''
  form.diagnostico = ''
  form.tratamiento = ''
  form.sesiones_completadas = 0
  form.estado = 'En progreso'
}

function handleSubmit() {
  emit('save', { ...form })
  resetForm()
}
</script>
<template>
  <section class="card shadow-sm">
    <div class="card-header bg-primary text-white">
      <h2 class="h5 mb-0">
        {{ selectedPaciente ? 'Editar paciente' : 'Nuevo paciente' }}
      </h2>
    </div>

    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre</label>
            <input
              v-model="form.nombre"
              class="form-control"
              placeholder="Ej: Rocco"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Especie</label>
            <select
              v-model="form.especie"
              class="form-select"
              required
            >
              <option value="">Seleccionar especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Raza</label>
            <input
              v-model="form.raza"
              class="form-control"
              placeholder="Ej: Ovejero Alemán"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Estado</label>
            <select
              v-model="form.estado"
              class="form-select"
            >
              <option value="En progreso">En progreso</option>
              <option value="Alta Médica">Alta Médica</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>

          <div class="col-12">
            <label class="form-label">Diagnóstico</label>
            <textarea
              v-model="form.diagnostico"
              class="form-control"
              rows="2"
              placeholder="Ej: Displasia de cadera severa"
              required
            ></textarea>
          </div>

          <div class="col-12">
            <label class="form-label">Tratamiento</label>
            <textarea
              v-model="form.tratamiento"
              class="form-control"
              rows="2"
              placeholder="Ej: Hidroterapia y electroestimulación"
              required
            ></textarea>
          </div>

          <div class="col-md-4">
            <label class="form-label">Sesiones completadas</label>
            <input
              v-model.number="form.sesiones_completadas"
              type="number"
              min="0"
              class="form-control"
            />
          </div>
        </div>

        <div class="d-flex gap-2 mt-4">
          <button
            type="submit"
            class="btn btn-success"
          >
            {{ selectedPaciente ? 'Actualizar' : 'Guardar' }}
          </button>

          <button
            v-if="selectedPaciente"
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('cancel')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>