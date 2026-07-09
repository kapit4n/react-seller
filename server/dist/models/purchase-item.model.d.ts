import { Entity } from '@loopback/repository';
export declare class PurchaseItem extends Entity {
    id: number;
    quantity: number;
    price: number;
    totalPrice?: number;
    discount?: number;
    productId: number;
    purchaseOrderId: number;
    constructor(data?: Partial<PurchaseItem>);
}
