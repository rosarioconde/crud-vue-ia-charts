import { computed } from 'vue'
import { usePacienteStore } from '@/stores/pacienteStore'

export function usePacientes() {
  const pacienteStore = usePacienteStore()

  const pacientes = computed(() => pacienteStore.pacientes)
  const loading = computed(() => pacienteStore.loading)
  const error = computed(() => pacienteStore.error)
  const totalPacientes = computed(() => pacienteStore.totalPacientes)
  const pacientesEnProgreso = computed(
    () => pacienteStore.pacientesEnProgreso
  )

  function fetchPacientes() {
    return pacienteStore.fetchPacientes()
  }

  function addPaciente(paciente) {
    return pacienteStore.addPaciente(paciente)
  }

  function editPaciente(id, paciente) {
    return pacienteStore.editPaciente(id, paciente)
  }

  function deletePaciente(id) {
    return pacienteStore.deletePaciente(id)
  }

  return {
    pacientes,
    loading,
    error,
    totalPacientes,
    pacientesEnProgreso,
    fetchPacientes,
    addPaciente,
    editPaciente,
    deletePaciente
  }
}