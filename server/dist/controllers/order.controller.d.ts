import { Request } from '@loopback/rest';
import { Order } from '../models/order.model';
import { OrderRepository } from '../repositories/order.repository';
export declare class OrderController {
    private repo;
    private requestGetter;
    constructor(repo: OrderRepository, requestGetter: () => Promise<Request>);
    find(): Promise<Order[]>;
    findById(id: number): Promise<Order>;
    create(data: Partial<Order>): Promise<Order>;
    updateById(id: number, data: Partial<Order>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
