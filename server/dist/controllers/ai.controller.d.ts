import { Response } from '@loopback/rest';
import { ProductRepository } from '../repositories/product.repository';
import { OrderDetailRepository } from '../repositories/order-detail.repository';
import { OrderRepository } from '../repositories/order.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import type { ChatRequest, ExecuteRequest, ExecuteResponse } from '../ai/types';
export declare class AIController {
    private aiService;
    constructor(productRepo: ProductRepository, orderDetailRepo: OrderDetailRepository, orderRepo: OrderRepository, customerRepo: CustomerRepository);
    chat(body: ChatRequest, response: Response): Promise<void>;
    execute(body: ExecuteRequest): Promise<ExecuteResponse>;
}
