import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {productsApi} from '../services/products'
import type {ProductForm} from '../validation/product'

const PRODUCTS_KEY = ['products'] as const

export function useProducts(filter?: Record<string, unknown>) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, filter],
    queryFn: () => productsApi.list(filter),
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const qc = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: ProductForm) => productsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({queryKey: PRODUCTS_KEY})
      navigate('/dashboard/products')
    },
  })
}

export function useUpdateProduct(id: number) {
  const qc = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: ProductForm) => productsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({queryKey: PRODUCTS_KEY})
      navigate('/dashboard/products')
    },
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({queryKey: PRODUCTS_KEY}),
  })
}

export function useUpdateStock() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({id, amount}: {id: number; amount: number}) => productsApi.updateStock(id, amount),
    onSuccess: () => qc.invalidateQueries({queryKey: PRODUCTS_KEY}),
  })
}

export function useCheckStock() {
  return useMutation({
    mutationFn: ({id, amount}: {id: number; amount: number}) => productsApi.checkStock(id, amount),
  })
}
