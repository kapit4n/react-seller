import apiClient from '@/services/api/client'
import type {Product} from '@/types'

export const productsApi = {
  list: (filter?: Record<string, unknown>) =>
    apiClient.get<Product[]>('/products', {params: {filter}}).then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Product>(`/products/${id}`).then((r) => r.data),

  create: (data: Partial<Product>) =>
    apiClient.post<Product>('/products', data).then((r) => r.data),

  update: (id: number, data: Partial<Product>) =>
    apiClient.patch(`/products/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`/products/${id}`),

  updateStock: (id: number, amount: number) =>
    apiClient.get<{success: string}>('/products/updateStock', {params: {id, amount}}).then((r) => r.data),

  checkStock: (id: number, amount: number) =>
    apiClient.get<{success: string}>('/products/checkStock', {params: {id, amount}}).then((r) => r.data),
}
