import {Entity, hasMany, model, property} from '@loopback/repository';
import {OrderDetail} from './order-detail.model';
import {PurchaseItem} from './purchase-item.model';

@model()
export class Product extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @property({required: true})
  name!: string;

  @property()
  code!: string;

  @property({required: true, default: 0})
  price!: number;

  @property()
  description!: string;

  @property({required: true, default: 0})
  stock!: number;

  @property({required: true})
  img!: string;

  @hasMany(() => OrderDetail)
  orderDetails?: OrderDetail[];

  @hasMany(() => PurchaseItem)
  purchaseItems?: PurchaseItem[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
