import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { PurchaseOrder } from '../models/purchase-order.model';
import { OrderRepository } from './order.repository';
import { PurchaseOrderRepository } from './purchase-order.repository';
export declare class CustomerRepository extends DefaultCrudRepository<Customer, typeof Customer.prototype.id> {
    readonly orders: HasManyRepositoryFactory<Order, typeof Customer.prototype.id>;
    readonly purchaseOrders: HasManyRepositoryFactory<PurchaseOrder, typeof Customer.prototype.id>;
    constructor(dataSource: DbDataSource, orderRepoGetter: Getter<OrderRepository>, purchaseOrderRepoGetter: Getter<PurchaseOrderRepository>);
}
