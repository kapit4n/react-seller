import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class DbDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    constructor();
    start(): Promise<void>;
}
