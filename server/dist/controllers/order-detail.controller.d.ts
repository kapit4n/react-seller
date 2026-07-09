import { Request } from '@loopback/rest';
import { OrderDetail } from '../models/order-detail.model';
import { OrderDetailRepository } from '../repositories/order-detail.repository';
export declare class OrderDetailController {
    private repo;
    private requestGetter;
    constructor(repo: OrderDetailRepository, requestGetter: () => Promise<Request>);
    find(): Promise<OrderDetail[]>;
    findById(id: number): Promise<OrderDetail>;
    create(data: Partial<OrderDetail>): Promise<OrderDetail>;
    updateById(id: number, data: Partial<OrderDetail>): Promise<void>;
    deleteById(id: number): Promise<void>;
    getCurrentTotal(): Promise<{
        total: number;
    }>;
}
