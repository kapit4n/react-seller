import { Request } from '@loopback/rest';
import { PurchaseItem } from '../models/purchase-item.model';
import { PurchaseItemRepository } from '../repositories/purchase-item.repository';
export declare class PurchaseItemController {
    private repo;
    private requestGetter;
    constructor(repo: PurchaseItemRepository, requestGetter: () => Promise<Request>);
    find(): Promise<PurchaseItem[]>;
    findById(id: number): Promise<PurchaseItem>;
    create(data: Partial<PurchaseItem>): Promise<PurchaseItem>;
    updateById(id: number, data: Partial<PurchaseItem>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
