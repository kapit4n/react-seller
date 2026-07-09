import apiClient from '@/services/api/client'
import type {Customer} from '@/types'

export const customersApi = {
  list: () => apiClient.get<Customer[]>('/customers').then((r) => r.data),
  getById: (id: number) => apiClient.get<Customer>(`/customers/${id}`).then((r) => r.data),
  create: (data: Partial<Customer>) => apiClient.post<Customer>('/customers', data).then((r) => r.data),
  update: (id: number, data: Partial<Customer>) => apiClient.patch(`/customers/${id}`, data),
  delete: (id: number) => apiClient.delete(`/customers/${id}`),
}
