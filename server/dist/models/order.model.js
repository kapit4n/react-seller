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
exports.Order = void 0;
const repository_1 = require("@loopback/repository");
const customer_model_1 = require("./customer.model");
const order_detail_model_1 = require("./order-detail.model");
let Order = class Order extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Order = Order;
__decorate([
    (0, repository_1.property)({ id: true, generated: true }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, repository_1.belongsTo)(() => customer_model_1.Customer),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", Date)
], Order.prototype, "createdDate", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", String)
], Order.prototype, "description", void 0);
__decorate([
    (0, repository_1.property)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "paid", void 0);
__decorate([
    (0, repository_1.property)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "delivered", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", Date)
], Order.prototype, "deliveryDate", void 0);
__decorate([
    (0, repository_1.hasMany)(() => order_detail_model_1.OrderDetail),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
exports.Order = Order = __decorate([
    (0, repository_1.model)(),
    __metadata("design:paramtypes", [Object])
], Order);
//# sourceMappingURL=order.model.js.map