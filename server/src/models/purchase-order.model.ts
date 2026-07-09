import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Customer} from './customer.model';
import {PurchaseItem} from './purchase-item.model';

@model()
export class PurchaseOrder extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @property()
  orderedDate?: Date;

  @property()
  receiveDate?: Date;

  @property()
  totalPrice?: number;

  @property()
  description?: string;

  @belongsTo(() => Customer)
  customerId!: number;

  @hasMany(() => PurchaseItem)
  purchaseItems?: PurchaseItem[];

  constructor(data?: Partial<PurchaseOrder>) {
    super(data);
  }
}
