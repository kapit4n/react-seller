"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbDataSource = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config = {
    name: 'db',
    connector: 'memory',
    file: 'react-seller-data.json',
};
let DbDataSource = class DbDataSource extends repository_1.juggler.DataSource {
    constructor() {
        super(config);
    }
    async start() {
        const file = this.settings?.file;
        if (file) {
            const filePath = path_1.default.resolve(file);
            if (fs_1.default.existsSync(filePath)) {
                const raw = fs_1.default.readFileSync(filePath, 'utf-8');
                if (raw) {
                    const data = JSON.parse(raw);
                    if (data && this.connector) {
                        const mem = this.connector;
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
                                    }
                                    else {
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
};
exports.DbDataSource = DbDataSource;
DbDataSource.dataSourceName = 'db';
exports.DbDataSource = DbDataSource = __decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    __metadata("design:paramtypes", [])
], DbDataSource);
//# sourceMappingURL=db.datasource.js.map