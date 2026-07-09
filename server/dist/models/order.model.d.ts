import { Entity } from '@loopback/repository';
import { OrderDetail } from './order-detail.model';
export declare class Order extends Entity {
    id: number;
    customerId: number;
    createdDate?: Date;
    total?: number;
    description?: string;
    paid: boolean;
    delivered: boolean;
    deliveryDate?: Date;
    orderDetails?: OrderDetail[];
    constructor(data?: Partial<Order>);
}
