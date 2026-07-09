import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Customer} from './customer.model';
import {OrderDetail} from './order-detail.model';

@model()
export class Order extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @belongsTo(() => Customer)
  customerId!: number;

  @property()
  createdDate?: Date;

  @property()
  total?: number;

  @property()
  description?: string;

  @property({required: true, default: false})
  paid!: boolean;

  @property({required: true, default: false})
  delivered!: boolean;

  @property()
  deliveryDate?: Date;

  @hasMany(() => OrderDetail)
  orderDetails?: OrderDetail[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}
