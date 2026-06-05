<script setup>
import { ref } from 'vue';
// Importamos el servicio que acabamos de crear
import { vectorshiftService } from '../services/vectorshiftService';

const pregunta = ref('');
const respuestaIa = ref('');
const cargando = ref(false);
const errorMsg = ref('');

const consultarIA = async () => {
  if (!pregunta.value.trim()) return;
  
  cargando.value = true;
  respuestaIa.value = '';
  errorMsg.value = '';
  
  try {
    // Llamamos al método del servicio 
    respuestaIa.value = await vectorshiftService.generarInformeAnalitico(pregunta.value);
  } catch (error) {
    errorMsg.value = error.message;
  } finally {
    cargando.value = false;
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <h3 class="mb-0">📊 Panel de Auditoría Inteligente (Solo Admins)</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">
          Realizá consultas en lenguaje natural sobre el historial clínico de los pacientes de la veterinaria.
        </p>

        <div class="mb-3">
          <label for="pregunta-textarea" class="form-label fw-bold">¿Qué información o informe deseás generar?</label>
          <textarea 
            id="pregunta-textarea"
            v-model="pregunta" 
            class="form-control" 
            rows="3" 
            placeholder="Ej: ¿Qué tratamientos tenemos registrados para perros con problemas de columna?"
          ></textarea>
        </div>

        <button 
          @click="consultarIA" 
          :disabled="cargando" 
          class="btn btn-success w-100"
        >
          <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
          {{ cargando ? 'Analizando base de datos...' : 'Generar Informe Analítico con IA' }}
        </button>

        <div v-if="errorMsg" class="alert alert-danger mt-3 mb-0">
          ⚠️ {{ errorMsg }}
        </div>

        <div v-if="respuestaIa" class="mt-4 p-3 bg-light border rounded">
          <h5 class="fw-bold text-secondary">📄 Resultado del Informe:</h5>
          <p style="white-space: pre-line;" class="mb-0 text-dark">{{ respuestaIa }}</p>
        </div>
      </div>
    </div>
  </div>
</template>