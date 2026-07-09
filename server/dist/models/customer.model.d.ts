import { Entity } from '@loopback/repository';
import { Order } from './order.model';
import { PurchaseOrder } from './purchase-order.model';
export declare class Customer extends Entity {
    id: number;
    name: string;
    address: string;
    budget: number;
    orders?: Order[];
    purchaseOrders?: PurchaseOrder[];
    constructor(data?: Partial<Customer>);
}
