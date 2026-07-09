import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { Customer } from '../models/customer.model';
import { PurchaseItem } from '../models/purchase-item.model';
import { PurchaseOrder } from '../models/purchase-order.model';
import { CustomerRepository } from './customer.repository';
import { PurchaseItemRepository } from './purchase-item.repository';
export declare class PurchaseOrderRepository extends DefaultCrudRepository<PurchaseOrder, typeof PurchaseOrder.prototype.id> {
    readonly customer: BelongsToAccessor<Customer, typeof PurchaseOrder.prototype.id>;
    readonly purchaseItems: HasManyRepositoryFactory<PurchaseItem, typeof PurchaseOrder.prototype.id>;
    constructor(dataSource: DbDataSource, customerRepoGetter: Getter<CustomerRepository>, purchaseItemRepoGetter: Getter<PurchaseItemRepository>);
}
