import { Vendor } from '../models/vendor.model';
import { VendorRepository } from '../repositories/vendor.repository';
export declare class VendorController {
    private repo;
    constructor(repo: VendorRepository);
    find(): Promise<Vendor[]>;
    findById(id: number): Promise<Vendor>;
    create(data: Partial<Vendor>): Promise<Vendor>;
    updateById(id: number, data: Partial<Vendor>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
