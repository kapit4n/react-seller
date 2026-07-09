import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Customer} from '../models/customer.model';
import {Order} from '../models/order.model';
import {PurchaseOrder} from '../models/purchase-order.model';
import {OrderRepository} from './order.repository';
import {PurchaseOrderRepository} from './purchase-order.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id
> {
  public readonly orders: HasManyRepositoryFactory<Order, typeof Customer.prototype.id>;
  public readonly purchaseOrders: HasManyRepositoryFactory<PurchaseOrder, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('OrderRepository') orderRepoGetter: Getter<OrderRepository>,
    @repository.getter('PurchaseOrderRepository') purchaseOrderRepoGetter: Getter<PurchaseOrderRepository>,
  ) {
    super(Customer, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepoGetter);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.purchaseOrders = this.createHasManyRepositoryFactoryFor('purchaseOrders', purchaseOrderRepoGetter);
    this.registerInclusionResolver('purchaseOrders', this.purchaseOrders.inclusionResolver);
  }
}
