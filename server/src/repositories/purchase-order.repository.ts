import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Customer} from '../models/customer.model';
import {PurchaseItem} from '../models/purchase-item.model';
import {PurchaseOrder} from '../models/purchase-order.model';
import {CustomerRepository} from './customer.repository';
import {PurchaseItemRepository} from './purchase-item.repository';

export class PurchaseOrderRepository extends DefaultCrudRepository<
  PurchaseOrder,
  typeof PurchaseOrder.prototype.id
> {
  public readonly customer: BelongsToAccessor<Customer, typeof PurchaseOrder.prototype.id>;
  public readonly purchaseItems: HasManyRepositoryFactory<PurchaseItem, typeof PurchaseOrder.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CustomerRepository') customerRepoGetter: Getter<CustomerRepository>,
    @repository.getter('PurchaseItemRepository') purchaseItemRepoGetter: Getter<PurchaseItemRepository>,
  ) {
    super(PurchaseOrder, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepoGetter);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.purchaseItems = this.createHasManyRepositoryFactoryFor('purchaseItems', purchaseItemRepoGetter);
    this.registerInclusionResolver('purchaseItems', this.purchaseItems.inclusionResolver);
  }
}
