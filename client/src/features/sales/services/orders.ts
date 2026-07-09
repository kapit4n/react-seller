import apiClient from '@/services/api/client'
import type {Order} from '@/types'

export const ordersApi = {
  list: () =>
    apiClient.get<Order[]>('/orders').then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Order>(`/orders/${id}`).then((r) => r.data),

  create: (data: {customerId: number; total: number; description?: string}) =>
    apiClient.post<Order>('/orders', data).then((r) => r.data),

  delete: (id: number) =>
    apiClient.delete(`/orders/${id}`),
}
