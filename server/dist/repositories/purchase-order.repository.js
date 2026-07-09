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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderRepository = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const db_datasource_1 = require("../datasources/db.datasource");
const purchase_order_model_1 = require("../models/purchase-order.model");
let PurchaseOrderRepository = class PurchaseOrderRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, customerRepoGetter, purchaseItemRepoGetter) {
        super(purchase_order_model_1.PurchaseOrder, dataSource);
        this.customer = this.createBelongsToAccessorFor('customer', customerRepoGetter);
        this.registerInclusionResolver('customer', this.customer.inclusionResolver);
        this.purchaseItems = this.createHasManyRepositoryFactoryFor('purchaseItems', purchaseItemRepoGetter);
        this.registerInclusionResolver('purchaseItems', this.purchaseItems.inclusionResolver);
    }
};
exports.PurchaseOrderRepository = PurchaseOrderRepository;
exports.PurchaseOrderRepository = PurchaseOrderRepository = __decorate([
    __param(0, (0, core_1.inject)('datasources.db')),
    __param(1, repository_1.repository.getter('CustomerRepository')),
    __param(2, repository_1.repository.getter('PurchaseItemRepository')),
    __metadata("design:paramtypes", [db_datasource_1.DbDataSource, Function, Function])
], PurchaseOrderRepository);
//# sourceMappingURL=purchase-order.repository.js.map