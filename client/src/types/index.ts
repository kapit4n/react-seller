export interface Product {
  id: number
  name: string
  code: string
  price: number
  stock: number
  description?: string
  img?: string
}

export interface Customer {
  id: number
  name: string
  address: string
  budget: number
}

export interface Vendor {
  id: number
  name: string
  address: string
  img?: string
}

export interface Order {
  id: number
  customerId: number
  customer?: Customer
  createdDate?: string
  total?: number
  description?: string
  paid: boolean
  delivered: boolean
  deliveryDate: string
  orderDetails?: OrderDetail[]
}

export interface OrderDetail {
  id: number
  orderId?: number
  productId: number
  product?: Product
  quantity: number
  price: number
  totalPrice: number
  discount?: number
}

export interface ApiError {
  statusCode: number
  message: string
  code?: string
}
