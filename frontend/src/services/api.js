import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const registerCompany = (data) => API.post('/auth/register', data)
export const loginCompany = (data) => API.post('/auth/login', data, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// Machines
export const getMachines = () => API.get('/machines/')
export const uploadImages = (formData) => API.post('/machines/upload', formData)
export const updateMachine = (id, data) => API.patch(`/machines/${id}`, data)
export const deleteMachine = (id) => API.delete(`/machines/${id}`)

// Train
export const trainModel = () => API.post('/train/')

// Predict
export const predictMachine = (formData) => API.post('/predict/', formData)