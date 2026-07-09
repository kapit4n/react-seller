import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {Order} from '../models/order.model';
import {OrderRepository} from '../repositories/order.repository';

export class OrderController {
  constructor(
    @repository(OrderRepository) private repo: OrderRepository,
    @inject.getter(RestBindings.Http.REQUEST) private requestGetter: () => Promise<Request>,
  ) {}

  @get('/api/orders')
  async find(): Promise<Order[]> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
    return this.repo.find(filter);
  }

  @get('/api/orders/{id}')
  async findById(@param.path.number('id') id: number): Promise<Order> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return this.repo.findById(id, filter);
  }

  @post('/api/orders')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(Order, {exclude: ['id']})}}}) data: Partial<Order>): Promise<Order> {
    return this.repo.create(data);
  }

  @patch('/api/orders/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(Order, {partial: true})}}}) data: Partial<Order>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/orders/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
