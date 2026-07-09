import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody, Request, RestBindings} from '@loopback/rest';
import {Vendor} from '../models/vendor.model';
import {VendorRepository} from '../repositories/vendor.repository';

export class VendorController {
  constructor(
    @repository(VendorRepository) private repo: VendorRepository,
  ) {}

  @get('/api/vendors')
  async find(): Promise<Vendor[]> {
    return this.repo.find();
  }

  @get('/api/vendors/{id}')
  async findById(@param.path.number('id') id: number): Promise<Vendor> {
    return this.repo.findById(id);
  }

  @post('/api/vendors')
  async create(@requestBody({content: {'application/json': {schema: getModelSchemaRef(Vendor, {exclude: ['id']})}}}) data: Partial<Vendor>): Promise<Vendor> {
    return this.repo.create(data);
  }

  @patch('/api/vendors/{id}')
  async updateById(@param.path.number('id') id: number, @requestBody({content: {'application/json': {schema: getModelSchemaRef(Vendor, {partial: true})}}}) data: Partial<Vendor>): Promise<void> {
    await this.repo.updateById(id, data);
  }

  @del('/api/vendors/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
