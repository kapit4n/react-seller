import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {Product} from '../models/product.model';
import {ProductRepository} from '../repositories/product.repository';

export class ProductController {
  constructor(
    @repository(ProductRepository) private repo: ProductRepository,
    @inject.getter(RestBindings.Http.REQUEST) private requestGetter: () => Promise<Request>,
  ) {}

  @get('/api/products')
  async find(): Promise<Product[]> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
    return this.repo.find(filter);
  }

  @get('/api/products/{id}')
  async findById(@param.path.number('id') id: number): Promise<Product> {
    const req = await this.requestGetter();
    const raw = (req.query as any).filter;
    const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return this.repo.findById(id, filter);
  }

  @post('/api/products')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(Product, {exclude: ['id']})}}}) data: Partial<Product>): Promise<Product> {
    return this.repo.create(data);
  }

  @patch('/api/products/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(Product, {partial: true})}}}) data: Partial<Product>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/products/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }

  @get('/api/products/getname')
  async getName(): Promise<{name: string}> {
    const req = await this.requestGetter();
    const id = Number((req.query as any).id);
    const product = await this.repo.findById(id);
    return {name: `Name of product is ${product.name}`};
  }

  @get('/api/products/updateStock')
  async updateStock(): Promise<{success: string}> {
    const req = await this.requestGetter();
    const query = req.query as any;
    const id = Number(query.id);
    const amount = Number(query.amount);
    const product = await this.repo.findById(id);
    if (amount <= product.stock) {
      product.stock -= amount;
      await this.repo.updateById(id, {stock: product.stock});
      return {success: 'true'};
    }
    return {success: 'false'};
  }

  @get('/api/products/checkStock')
  async checkStock(): Promise<{success: string}> {
    const req = await this.requestGetter();
    const query = req.query as any;
    const id = Number(query.id);
    const amount = Number(query.amount);
    const product = await this.repo.findById(id);
    return {success: amount <= product.stock ? 'true' : 'false'};
  }
}
