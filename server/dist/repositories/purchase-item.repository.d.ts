import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { Product } from '../models/product.model';
import { PurchaseItem } from '../models/purchase-item.model';
import { PurchaseOrder } from '../models/purchase-order.model';
import { ProductRepository } from './product.repository';
import { PurchaseOrderRepository } from './purchase-order.repository';
export declare class PurchaseItemRepository extends DefaultCrudRepository<PurchaseItem, typeof PurchaseItem.prototype.id> {
    readonly product: BelongsToAccessor<Product, typeof PurchaseItem.prototype.id>;
    readonly purchaseOrder: BelongsToAccessor<PurchaseOrder, typeof PurchaseItem.prototype.id>;
    constructor(dataSource: DbDataSource, productRepoGetter: Getter<ProductRepository>, purchaseOrderRepoGetter: Getter<PurchaseOrderRepository>);
}
