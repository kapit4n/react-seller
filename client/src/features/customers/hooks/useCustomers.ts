import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {customersApi} from '../services/customers'
import type {CustomerForm} from '../validation/customer'

const KEY = ['customers'] as const

export function useCustomers() {
  return useQuery({queryKey: KEY, queryFn: customersApi.list})
}

export function useCustomer(id: number) {
  return useQuery({queryKey: [...KEY, id], queryFn: () => customersApi.getById(id), enabled: !!id})
}

export function useCreateCustomer() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: CustomerForm) => customersApi.create(data),
    onSuccess: () => { qc.invalidateQueries({queryKey: KEY}); navigate('/dashboard/customers') },
  })
}

export function useUpdateCustomer(id: number) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: CustomerForm) => customersApi.update(id, data),
    onSuccess: () => { qc.invalidateQueries({queryKey: KEY}); navigate('/dashboard/customers') },
  })
}

export function useDeleteCustomer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => customersApi.delete(id),
    onSuccess: () => qc.invalidateQueries({queryKey: KEY}),
  })
}
