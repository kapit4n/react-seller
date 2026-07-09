import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Vendor} from '../models/vendor.model';

export class VendorRepository extends DefaultCrudRepository<
  Vendor,
  typeof Vendor.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Vendor, dataSource);
  }
}
