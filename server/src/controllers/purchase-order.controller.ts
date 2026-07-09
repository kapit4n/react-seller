import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {PurchaseOrder} from '../models/purchase-order.model';
import {PurchaseOrderRepository} from '../repositories/purchase-order.repository';

export class PurchaseOrderController {
  constructor(
    @repository(PurchaseOrderRepository) private repo: PurchaseOrderRepository,
    @inject.getter(RestBindings.Http.REQUEST) private requestGetter: () => Promise<Request>,
  ) {}

  @get('/api/purchase-orders')
  async find(): Promise<PurchaseOrder[]> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
    return this.repo.find(filter);
  }

  @get('/api/purchase-orders/{id}')
  async findById(@param.path.number('id') id: number): Promise<PurchaseOrder> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return this.repo.findById(id, filter);
  }

  @post('/api/purchase-orders')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(PurchaseOrder, {exclude: ['id']})}}}) data: Partial<PurchaseOrder>): Promise<PurchaseOrder> {
    return this.repo.create(data);
  }

  @patch('/api/purchase-orders/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(PurchaseOrder, {partial: true})}}}) data: Partial<PurchaseOrder>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/purchase-orders/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
