import axios, {type AxiosError, type InternalAxiosRequestConfig} from 'axios'
import {useAuthStore} from '@/hooks/use-auth'
import type {ApiError} from '@/types'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.params = {...config.params, access_token: token}
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default apiClient
