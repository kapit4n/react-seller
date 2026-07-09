import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { Order } from '../models/order.model';
import { OrderDetail } from '../models/order-detail.model';
import { Product } from '../models/product.model';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';
export declare class OrderDetailRepository extends DefaultCrudRepository<OrderDetail, typeof OrderDetail.prototype.id> {
    readonly product: BelongsToAccessor<Product, typeof OrderDetail.prototype.id>;
    readonly order: BelongsToAccessor<Order, typeof OrderDetail.prototype.id>;
    constructor(dataSource: DbDataSource, productRepoGetter: Getter<ProductRepository>, orderRepoGetter: Getter<OrderRepository>);
}
