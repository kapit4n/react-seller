import { Request } from '@loopback/rest';
import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
export declare class ProductController {
    private repo;
    private requestGetter;
    constructor(repo: ProductRepository, requestGetter: () => Promise<Request>);
    find(): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    create(data: Partial<Product>): Promise<Product>;
    updateById(id: number, data: Partial<Product>): Promise<void>;
    deleteById(id: number): Promise<void>;
    getName(): Promise<{
        name: string;
    }>;
    updateStock(): Promise<{
        success: string;
    }>;
    checkStock(): Promise<{
        success: string;
    }>;
}
