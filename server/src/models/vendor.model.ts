import {Entity, model, property} from '@loopback/repository';

@model()
export class Vendor extends Entity {
  @property({id: true, generated: true})
  id!: number;

  @property({required: true})
  name!: string;

  @property({required: true, default: 'None'})
  address!: string;

  @property()
  img?: string;

  constructor(data?: Partial<Vendor>) {
    super(data);
  }
}
