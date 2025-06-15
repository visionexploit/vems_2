import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    const { token, user } = response.data
    localStorage.setItem('token', token)
    return user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
  } catch (error) {
    console.error('Logout error:', error)
    localStorage.removeItem('token')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get user')
  }
}

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    const { token, user } = response.data
    localStorage.setItem('token', token)
    return user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed')
  }
}

export const forgotPassword = async (email) => {
  try {
    await api.post('/auth/forgot-password', { email })
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send reset email')
  }
}

export const resetPassword = async (token, password) => {
  try {
    await api.post('/auth/reset-password', { token, password })
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to reset password')
  }
} 