import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Order} from './order.model';
import {Product} from './product.model';

@model()
export class OrderDetail extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @property({required: true, default: 0})
  quantity!: number;

  @property({required: true, default: 0})
  price!: number;

  @property({required: true, default: 0})
  totalPrice!: number;

  @property({default: 0})
  discount!: number;

  @belongsTo(() => Order)
  orderId?: number;

  @belongsTo(() => Product)
  productId?: number;

  constructor(data?: Partial<OrderDetail>) {
    super(data);
  }
}
