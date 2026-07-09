import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {ordersApi} from '../services/orders'
import {orderDetailsApi} from '../services/orderDetails'

const ORDERS_KEY = ['orders'] as const
const ORDER_DETAILS_KEY = ['orderDetails'] as const

export function useOrders() {
  return useQuery({queryKey: ORDERS_KEY, queryFn: ordersApi.list})
}

export function useOrder(id: number) {
  return useQuery({queryKey: [...ORDERS_KEY, id], queryFn: () => ordersApi.getById(id), enabled: !!id})
}

export function useUnassignedOrderDetails() {
  return useQuery({
    queryKey: [...ORDER_DETAILS_KEY, 'unassigned'],
    queryFn: orderDetailsApi.listUnassigned,
    refetchOnMount: true,
  })
}

export function useOrderDetailsByOrder(orderId: number) {
  return useQuery({
    queryKey: [...ORDER_DETAILS_KEY, 'byOrder', orderId],
    queryFn: () => orderDetailsApi.listByOrder(orderId),
    enabled: !!orderId,
  })
}

export function useCurrentTotal() {
  return useQuery({
    queryKey: [...ORDER_DETAILS_KEY, 'currentTotal'],
    queryFn: orderDetailsApi.getCurrentTotal,
  })
}

export function useAddToCart() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: {productId: number; quantity: number; price: number; totalPrice: number}) =>
      orderDetailsApi.create(data),
    onSuccess: () => qc.invalidateQueries({queryKey: ORDER_DETAILS_KEY}),
  })
}

export function useUpdateOrderDetail() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({id, data}: {id: number; data: Partial<{quantity: number; totalPrice: number}>}) =>
      orderDetailsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({queryKey: ORDER_DETAILS_KEY}),
  })
}

export function useDeleteOrderDetail() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => orderDetailsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({queryKey: ORDER_DETAILS_KEY}),
  })
}

export function useSubmitOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({customerId, total, items}: {customerId: number; total: number; items: Array<{id: number; productId: number; quantity: number}>}) => {
      const order = await ordersApi.create({customerId, total})
      await Promise.all(items.map((item) => orderDetailsApi.update(item.id, {orderId: order.id})))
      await Promise.all(items.map((item) =>
        apiCall(() => Promise.resolve({success: 'true'}))
      ))
      return order
    },
    onSuccess: () => {
      qc.invalidateQueries({queryKey: ORDER_DETAILS_KEY})
      qc.invalidateQueries({queryKey: ORDERS_KEY})
    },
  })
}

async function apiCall<T>(fn: () => Promise<T>): Promise<T> {
  return fn()
}
