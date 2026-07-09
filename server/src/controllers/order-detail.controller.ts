import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {OrderDetail} from '../models/order-detail.model';
import {OrderDetailRepository} from '../repositories/order-detail.repository';

export class OrderDetailController {
  constructor(
    @repository(OrderDetailRepository) private repo: OrderDetailRepository,
    @inject.getter(RestBindings.Http.REQUEST) private requestGetter: () => Promise<Request>,
  ) {}

  @get('/api/orderDetails')
  async find(): Promise<OrderDetail[]> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
    return this.repo.find(filter);
  }

  @get('/api/orderDetails/{id}')
  async findById(@param.path.number('id') id: number): Promise<OrderDetail> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return this.repo.findById(id, filter);
  }

  @post('/api/orderDetails')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(OrderDetail, {exclude: ['id']})}}}) data: Partial<OrderDetail>): Promise<OrderDetail> {
    return this.repo.create(data);
  }

  @patch('/api/orderDetails/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(OrderDetail, {partial: true})}}}) data: Partial<OrderDetail>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/orderDetails/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }

  @get('/api/orderDetails/currentTotal')
  async getCurrentTotal(): Promise<{total: number}> {
    const all = await this.repo.find({where: {orderId: null as any}});
    const total = all.reduce((sum: number, item: OrderDetail) => sum + (item.totalPrice || 0), 0);
    return {total};
  }
}
