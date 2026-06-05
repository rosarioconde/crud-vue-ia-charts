import { defineStore } from 'pinia'
import { pacienteService } from '@/services/pacienteService'

export const usePacienteStore = defineStore('pacientes', {
  state: () => ({
    pacientes: [],
    loading: false,
    error: null
  }),

  getters: {
    totalPacientes: (state) => state.pacientes.length,

    pacientesEnProgreso: (state) =>
      state.pacientes.filter(
        (paciente) => paciente.estado === 'En progreso'
      ),

    perros: (state) =>
      state.pacientes.filter(
        (paciente) => paciente.especie === 'Perro'
      ),

    gatos: (state) =>
      state.pacientes.filter(
        (paciente) => paciente.especie === 'Gato'
      )
  },

  actions: {
    async fetchPacientes() {
      this.loading = true
      this.error = null

      try {
        const response = await pacienteService.getAll()
        this.pacientes = response.data
      } catch (error) {
        this.error = 'No se pudieron cargar los pacientes'
      } finally {
        this.loading = false
      }
    },

    async addPaciente(paciente) {
      this.loading = true
      this.error = null

      try {
        const response = await pacienteService.create(paciente)
        this.pacientes.push(response.data)
      } catch (error) {
        this.error = 'No se pudo crear el paciente'
      } finally {
        this.loading = false
      }
    },

    async editPaciente(id, paciente) {
      this.loading = true
      this.error = null

      try {
        const response = await pacienteService.update(id, paciente)

        const index = this.pacientes.findIndex(
          (item) => item.id === id
        )

        if (index !== -1) {
          this.pacientes[index] = response.data
        }
      } catch (error) {
        this.error = 'No se pudo actualizar el paciente'
      } finally {
        this.loading = false
      }
    },

    async deletePaciente(id) {
      this.loading = true
      this.error = null

      try {
        await pacienteService.remove(id)

        this.pacientes = this.pacientes.filter(
          (paciente) => paciente.id !== id
        )
      } catch (error) {
        this.error = 'No se pudo eliminar el paciente'
      } finally {
        this.loading = false
      }
    }
  }
})