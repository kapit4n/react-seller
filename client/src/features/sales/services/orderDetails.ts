import apiClient from '@/services/api/client'
import type {OrderDetail} from '@/types'

export const orderDetailsApi = {
  listByFilter: (filter: Record<string, unknown>) =>
    apiClient.get<OrderDetail[]>('/orderDetails', {params: {filter}}).then((r) => r.data),

  listUnassigned: () =>
    orderDetailsApi.listByFilter({where: {orderId: null as any}, include: [{relation: 'product'}]}),

  listByOrder: (orderId: number) =>
    orderDetailsApi.listByFilter({where: {orderId}, include: [{relation: 'product'}]}),

  create: (data: {productId: number; quantity: number; price: number; totalPrice: number}) =>
    apiClient.post<OrderDetail>('/orderDetails', data).then((r) => r.data),

  update: (id: number, data: Partial<OrderDetail>) =>
    apiClient.patch(`/orderDetails/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`/orderDetails/${id}`),

  getCurrentTotal: () =>
    apiClient.get<{total: number}>('/orderDetails/currentTotal').then((r) => r.data),
}
