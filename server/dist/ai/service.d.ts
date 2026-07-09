import type { AIStreamChunk, Message, CartAction, ExecuteResponse } from './types';
import { ProductRepository } from '../repositories/product.repository';
import { OrderDetailRepository } from '../repositories/order-detail.repository';
import { OrderRepository } from '../repositories/order.repository';
import { CustomerRepository } from '../repositories/customer.repository';
export declare class AIService {
    private provider;
    private tools;
    private readOnlyTools;
    private productRepo;
    private orderDetailRepo;
    private orderRepo;
    private customerRepo;
    constructor(productRepo: ProductRepository, orderDetailRepo: OrderDetailRepository, orderRepo: OrderRepository, customerRepo: CustomerRepository);
    isConfigured(): boolean;
    chat(userMessage: string, history: Message[]): AsyncGenerator<AIStreamChunk>;
    executeActions(actions: CartAction[]): Promise<ExecuteResponse>;
    private fetchCart;
}
