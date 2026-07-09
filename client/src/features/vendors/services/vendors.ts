import apiClient from '@/services/api/client'
import type {Vendor} from '@/types'

export const vendorsApi = {
  list: () => apiClient.get<Vendor[]>('/vendors').then((r) => r.data),
  getById: (id: number) => apiClient.get<Vendor>(`/vendors/${id}`).then((r) => r.data),
  create: (data: Partial<Vendor>) => apiClient.post<Vendor>('/vendors', data).then((r) => r.data),
  update: (id: number, data: Partial<Vendor>) => apiClient.patch(`/vendors/${id}`, data),
  delete: (id: number) => apiClient.delete(`/vendors/${id}`),
}
