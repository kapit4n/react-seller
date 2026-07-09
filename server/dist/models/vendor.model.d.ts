import { Entity } from '@loopback/repository';
export declare class Vendor extends Entity {
    id: number;
    name: string;
    address: string;
    img?: string;
    constructor(data?: Partial<Vendor>);
}
