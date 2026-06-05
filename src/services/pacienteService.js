import axios from 'axios'

const API_URL = 'https://69e16785b1cb62b9f316d5d8.mockapi.io/pacientes' 

export const pacienteService = {
  getAll() {
    return axios.get(API_URL)
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`)
  },

  create(patient) {
    return axios.post(API_URL, patient)
  },

  update(id, patient) {
    return axios.put(`${API_URL}/${id}`, patient)
  },

  remove(id) {
    return axios.delete(`${API_URL}/${id}`)
  }
}