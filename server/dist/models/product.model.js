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
exports.Product = void 0;
const repository_1 = require("@loopback/repository");
const order_detail_model_1 = require("./order-detail.model");
const purchase_item_model_1 = require("./purchase-item.model");
let Product = class Product extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Product = Product;
__decorate([
    (0, repository_1.property)({ id: true, generated: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, repository_1.property)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, repository_1.property)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, repository_1.property)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, repository_1.property)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, repository_1.property)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "img", void 0);
__decorate([
    (0, repository_1.hasMany)(() => order_detail_model_1.OrderDetail),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
__decorate([
    (0, repository_1.hasMany)(() => purchase_item_model_1.PurchaseItem),
    __metadata("design:type", Array)
], Product.prototype, "purchaseItems", void 0);
exports.Product = Product = __decorate([
    (0, repository_1.model)(),
    __metadata("design:paramtypes", [Object])
], Product);
//# sourceMappingURL=product.model.js.map