import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {Customer} from '../models/customer.model';
import {CustomerRepository} from '../repositories/customer.repository';

export class CustomerController {
  constructor(
    @repository(CustomerRepository) private repo: CustomerRepository,
    @inject.getter(RestBindings.Http.REQUEST) private requestGetter: () => Promise<Request>,
  ) {}

  @get('/api/customers')
  async find(): Promise<Customer[]> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
    return this.repo.find(filter);
  }

  @get('/api/customers/{id}')
  async findById(@param.path.number('id') id: number): Promise<Customer> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return this.repo.findById(id, filter);
  }

  @post('/api/customers')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(Customer, {exclude: ['id']})}}}) data: Partial<Customer>): Promise<Customer> {
    return this.repo.create(data);
  }

  @patch('/api/customers/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(Customer, {partial: true})}}}) data: Partial<Customer>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/customers/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
