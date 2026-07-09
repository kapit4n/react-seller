import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources/db.datasource';
import { Vendor } from '../models/vendor.model';
export declare class VendorRepository extends DefaultCrudRepository<Vendor, typeof Vendor.prototype.id> {
    constructor(dataSource: DbDataSource);
}
