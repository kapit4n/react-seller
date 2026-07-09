import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {OrderDetail} from '../models/order-detail.model';
import {Product} from '../models/product.model';
import {PurchaseItem} from '../models/purchase-item.model';
import {OrderDetailRepository} from './order-detail.repository';
import {PurchaseItemRepository} from './purchase-item.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id
> {
  public readonly orderDetails: HasManyRepositoryFactory<OrderDetail, typeof Product.prototype.id>;
  public readonly purchaseItems: HasManyRepositoryFactory<PurchaseItem, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('OrderDetailRepository') orderDetailRepoGetter: Getter<OrderDetailRepository>,
    @repository.getter('PurchaseItemRepository') purchaseItemRepoGetter: Getter<PurchaseItemRepository>,
  ) {
    super(Product, dataSource);
    this.orderDetails = this.createHasManyRepositoryFactoryFor('orderDetails', orderDetailRepoGetter);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    this.purchaseItems = this.createHasManyRepositoryFactoryFor('purchaseItems', purchaseItemRepoGetter);
    this.registerInclusionResolver('purchaseItems', this.purchaseItems.inclusionResolver);
  }
}
