import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Product} from '../models/product.model';
import {PurchaseItem} from '../models/purchase-item.model';
import {PurchaseOrder} from '../models/purchase-order.model';
import {ProductRepository} from './product.repository';
import {PurchaseOrderRepository} from './purchase-order.repository';

export class PurchaseItemRepository extends DefaultCrudRepository<
  PurchaseItem,
  typeof PurchaseItem.prototype.id
> {
  public readonly product: BelongsToAccessor<Product, typeof PurchaseItem.prototype.id>;
  public readonly purchaseOrder: BelongsToAccessor<PurchaseOrder, typeof PurchaseItem.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('ProductRepository') productRepoGetter: Getter<ProductRepository>,
    @repository.getter('PurchaseOrderRepository') purchaseOrderRepoGetter: Getter<PurchaseOrderRepository>,
  ) {
    super(PurchaseItem, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepoGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.purchaseOrder = this.createBelongsToAccessorFor('purchaseOrder', purchaseOrderRepoGetter);
    this.registerInclusionResolver('purchaseOrder', this.purchaseOrder.inclusionResolver);
  }
}
