import {Entity, hasMany, model, property} from '@loopback/repository';
import {Order} from './order.model';
import {PurchaseOrder} from './purchase-order.model';

@model()
export class Customer extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @property({required: true})
  name!: string;

  @property({required: true, default: 'None'})
  address!: string;

  @property({required: true, default: 0})
  budget!: number;

  @hasMany(() => Order)
  orders?: Order[];

  @hasMany(() => PurchaseOrder)
  purchaseOrders?: PurchaseOrder[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}
