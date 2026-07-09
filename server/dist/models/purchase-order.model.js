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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrder = void 0;
const repository_1 = require("@loopback/repository");
const customer_model_1 = require("./customer.model");
const purchase_item_model_1 = require("./purchase-item.model");
let PurchaseOrder = class PurchaseOrder extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.PurchaseOrder = PurchaseOrder;
__decorate([
    (0, repository_1.property)({ id: true, generated: true }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "id", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", Date)
], PurchaseOrder.prototype, "orderedDate", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", Date)
], PurchaseOrder.prototype, "receiveDate", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "totalPrice", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "description", void 0);
__decorate([
    (0, repository_1.belongsTo)(() => customer_model_1.Customer),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "customerId", void 0);
__decorate([
    (0, repository_1.hasMany)(() => purchase_item_model_1.PurchaseItem),
    __metadata("design:type", Array)
], PurchaseOrder.prototype, "purchaseItems", void 0);
exports.PurchaseOrder = PurchaseOrder = __decorate([
    (0, repository_1.model)(),
    __metadata("design:paramtypes", [Object])
], PurchaseOrder);
//# sourceMappingURL=purchase-order.model.js.map