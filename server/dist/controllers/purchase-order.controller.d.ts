import { Request } from '@loopback/rest';
import { PurchaseOrder } from '../models/purchase-order.model';
import { PurchaseOrderRepository } from '../repositories/purchase-order.repository';
export declare class PurchaseOrderController {
    private repo;
    private requestGetter;
    constructor(repo: PurchaseOrderRepository, requestGetter: () => Promise<Request>);
    find(): Promise<PurchaseOrder[]>;
    findById(id: number): Promise<PurchaseOrder>;
    create(data: Partial<PurchaseOrder>): Promise<PurchaseOrder>;
    updateById(id: number, data: Partial<PurchaseOrder>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
