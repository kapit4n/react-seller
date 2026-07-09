import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import {vendorsApi} from '../services/vendors'
import type {VendorForm} from '../validation/vendor'

const KEY = ['vendors'] as const

export function useVendors() {
  return useQuery({queryKey: KEY, queryFn: vendorsApi.list})
}

export function useVendor(id: number) {
  return useQuery({queryKey: [...KEY, id], queryFn: () => vendorsApi.getById(id), enabled: !!id})
}

export function useCreateVendor() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: VendorForm) => vendorsApi.create(data),
    onSuccess: () => { qc.invalidateQueries({queryKey: KEY}); navigate('/dashboard/vendors') },
  })
}

export function useUpdateVendor(id: number) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: VendorForm) => vendorsApi.update(id, data),
    onSuccess: () => { qc.invalidateQueries({queryKey: KEY}); navigate('/dashboard/vendors') },
  })
}

export function useDeleteVendor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => vendorsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({queryKey: KEY}),
  })
}
