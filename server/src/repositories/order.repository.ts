import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Customer} from '../models/customer.model';
import {Order} from '../models/order.model';
import {OrderDetail} from '../models/order-detail.model';
import {CustomerRepository} from './customer.repository';
import {OrderDetailRepository} from './order-detail.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id
> {
  public readonly customer: BelongsToAccessor<Customer, typeof Order.prototype.id>;
  public readonly orderDetails: HasManyRepositoryFactory<OrderDetail, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CustomerRepository') customerRepoGetter: Getter<CustomerRepository>,
    @repository.getter('OrderDetailRepository') orderDetailRepoGetter: Getter<OrderDetailRepository>,
  ) {
    super(Order, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepoGetter);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailRepoGetter);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
  }
}
