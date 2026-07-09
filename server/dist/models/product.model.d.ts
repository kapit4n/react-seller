import { Entity } from '@loopback/repository';
import { OrderDetail } from './order-detail.model';
import { PurchaseItem } from './purchase-item.model';
export declare class Product extends Entity {
    id: number;
    name: string;
    code: string;
    price: number;
    description: string;
    stock: number;
    img: string;
    orderDetails?: OrderDetail[];
    purchaseItems?: PurchaseItem[];
    constructor(data?: Partial<Product>);
}
