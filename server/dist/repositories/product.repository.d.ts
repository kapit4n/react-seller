import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { OrderDetail } from '../models/order-detail.model';
import { Product } from '../models/product.model';
import { PurchaseItem } from '../models/purchase-item.model';
import { OrderDetailRepository } from './order-detail.repository';
import { PurchaseItemRepository } from './purchase-item.repository';
export declare class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype.id> {
    readonly orderDetails: HasManyRepositoryFactory<OrderDetail, typeof Product.prototype.id>;
    readonly purchaseItems: HasManyRepositoryFactory<PurchaseItem, typeof Product.prototype.id>;
    constructor(dataSource: DbDataSource, orderDetailRepoGetter: Getter<OrderDetailRepository>, purchaseItemRepoGetter: Getter<PurchaseItemRepository>);
}
