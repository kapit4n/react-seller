import type { Tool } from './types';
import { ProductRepository } from '../repositories/product.repository';
import { OrderDetailRepository } from '../repositories/order-detail.repository';
import { OrderRepository } from '../repositories/order.repository';
import { CustomerRepository } from '../repositories/customer.repository';
export declare function createTools(productRepo: ProductRepository, orderDetailRepo: OrderDetailRepository, orderRepo: OrderRepository, customerRepo: CustomerRepository): Tool[];
