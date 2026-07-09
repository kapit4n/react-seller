import { Entity } from '@loopback/repository';
export declare class OrderDetail extends Entity {
    id: number;
    quantity: number;
    price: number;
    totalPrice: number;
    discount: number;
    orderId?: number;
    productId?: number;
    constructor(data?: Partial<OrderDetail>);
}
