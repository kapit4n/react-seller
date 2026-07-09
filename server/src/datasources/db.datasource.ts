import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import path from 'path';
import fs from 'fs';

const config = {
  name: 'db',
  connector: 'memory',
  file: 'react-seller-data.json',
};

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'db';

  constructor() {
    super(config);
  }

  async start(): Promise<void> {
    const file = this.settings?.file;
    if (file) {
      const filePath = path.resolve(file);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        if (raw) {
          const data = JSON.parse(raw);
          if (data && this.connector) {
            const mem = this.connector as any;
            if (data.ids) {
              mem.ids = Object.assign(mem.ids || {}, data.ids);
            }
            if (data.models) {
              for (const key of Object.keys(data.models)) {
                mem.cache[key] = mem.cache[key] || {};
                const entries = data.models[key];
                if (typeof entries === 'object' && entries !== null) {
                  if (Array.isArray(entries)) {
                    for (const item of entries) {
                      const id = item.id;
                      if (id !== undefined && id !== null) {
                        mem.cache[key][id] = item;
                      }
                    }
                  } else {
                    for (const id of Object.keys(entries)) {
                      mem.cache[key][id] = entries[id];
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    this.connected = true;
    this.connecting = false;
    this.emit('connected');
  }
}
