import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {PurchaseItem} from '../models/purchase-item.model';
import {PurchaseItemRepository} from '../repositories/purchase-item.repository';

export class PurchaseItemController {
  constructor(
    @repository(PurchaseItemRepository) private repo: PurchaseItemRepository,
    @inject.getter(RestBindings.Http.REQUEST) private requestGetter: () => Promise<Request>,
  ) {}

  @get('/api/purchase-items')
  async find(): Promise<PurchaseItem[]> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
    return this.repo.find(filter);
  }

  @get('/api/purchase-items/{id}')
  async findById(@param.path.number('id') id: number): Promise<PurchaseItem> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return this.repo.findById(id, filter);
  }

  @post('/api/purchase-items')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(PurchaseItem, {exclude: ['id']})}}}) data: Partial<PurchaseItem>): Promise<PurchaseItem> {
    return this.repo.create(data);
  }

  @patch('/api/purchase-items/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(PurchaseItem, {partial: true})}}}) data: Partial<PurchaseItem>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/purchase-items/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
