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
exports.Customer = void 0;
const repository_1 = require("@loopback/repository");
const order_model_1 = require("./order.model");
const purchase_order_model_1 = require("./purchase-order.model");
let Customer = class Customer extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Customer = Customer;
__decorate([
    (0, repository_1.property)({ id: true, generated: true }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, repository_1.property)({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, repository_1.property)({ required: true, default: 'None' }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, repository_1.property)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Customer.prototype, "budget", void 0);
__decorate([
    (0, repository_1.hasMany)(() => order_model_1.Order),
    __metadata("design:type", Array)
], Customer.prototype, "orders", void 0);
__decorate([
    (0, repository_1.hasMany)(() => purchase_order_model_1.PurchaseOrder),
    __metadata("design:type", Array)
], Customer.prototype, "purchaseOrders", void 0);
exports.Customer = Customer = __decorate([
    (0, repository_1.model)(),
    __metadata("design:paramtypes", [Object])
], Customer);
//# sourceMappingURL=customer.model.js.map