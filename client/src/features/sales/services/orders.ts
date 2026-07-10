import apiClient from '@/services/api/client'
import type {Order} from '@/types'

export const ordersApi = {
  list: (filter?: Record<string, unknown>) =>
    apiClient.get<Order[]>('/orders', {params: {filter: filter ? JSON.stringify(filter) : undefined}}).then((r) => r.data),

  listWithDetails: () =>
    apiClient.get<Order[]>('/orders', {params: {filter: JSON.stringify({include: ['orderDetails']})}}).then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Order>(`/orders/${id}`).then((r) => r.data),

  create: (data: {customerId: number; total: number; description?: string}) =>
    apiClient.post<Order>('/orders', data).then((r) => r.data),

  delete: (id: number) =>
    apiClient.delete(`/orders/${id}`),
}
