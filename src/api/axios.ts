import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1'

export const authorize = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

authorize.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error: Error) => {
    return Promise.reject(error)
  },
)
