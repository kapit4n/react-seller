import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { OrderDetail } from '../models/order-detail.model';
import { CustomerRepository } from './customer.repository';
import { OrderDetailRepository } from './order-detail.repository';
export declare class OrderRepository extends DefaultCrudRepository<Order, typeof Order.prototype.id> {
    readonly customer: BelongsToAccessor<Customer, typeof Order.prototype.id>;
    readonly orderDetails: HasManyRepositoryFactory<OrderDetail, typeof Order.prototype.id>;
    constructor(dataSource: DbDataSource, customerRepoGetter: Getter<CustomerRepository>, orderDetailRepoGetter: Getter<OrderDetailRepository>);
}
