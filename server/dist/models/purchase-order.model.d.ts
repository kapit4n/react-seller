import { Entity } from '@loopback/repository';
import { PurchaseItem } from './purchase-item.model';
export declare class PurchaseOrder extends Entity {
    id: number;
    orderedDate?: Date;
    receiveDate?: Date;
    totalPrice?: number;
    description?: string;
    customerId: number;
    purchaseItems?: PurchaseItem[];
    constructor(data?: Partial<PurchaseOrder>);
}
