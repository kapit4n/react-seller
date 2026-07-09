import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Order} from '../models/order.model';
import {OrderDetail} from '../models/order-detail.model';
import {Product} from '../models/product.model';
import {OrderRepository} from './order.repository';
import {ProductRepository} from './product.repository';

export class OrderDetailRepository extends DefaultCrudRepository<
  OrderDetail,
  typeof OrderDetail.prototype.id
> {
  public readonly product: BelongsToAccessor<Product, typeof OrderDetail.prototype.id>;
  public readonly order: BelongsToAccessor<Order, typeof OrderDetail.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ProductRepository') productRepoGetter: Getter<ProductRepository>,
    @repository.getter('OrderRepository') orderRepoGetter: Getter<OrderRepository>,
  ) {
    super(OrderDetail, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepoGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', orderRepoGetter);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
