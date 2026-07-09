import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {PurchaseOrder} from './purchase-order.model';

@model()
export class PurchaseItem extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @property({required: true, default: 0})
  quantity!: number;

  @property({required: true, default: 0})
  price!: number;

  @property({default: 0})
  totalPrice?: number;

  @property({default: 0})
  discount?: number;

  @belongsTo(() => Product)
  productId!: number;

  @belongsTo(() => PurchaseOrder)
  purchaseOrderId!: number;

  constructor(data?: Partial<PurchaseItem>) {
    super(data);
  }
}
