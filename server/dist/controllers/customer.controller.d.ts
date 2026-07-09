import { Request } from '@loopback/rest';
import { Customer } from '../models/customer.model';
import { CustomerRepository } from '../repositories/customer.repository';
export declare class CustomerController {
    private repo;
    private requestGetter;
    constructor(repo: CustomerRepository, requestGetter: () => Promise<Request>);
    find(): Promise<Customer[]>;
    findById(id: number): Promise<Customer>;
    create(data: Partial<Customer>): Promise<Customer>;
    updateById(id: number, data: Partial<Customer>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
