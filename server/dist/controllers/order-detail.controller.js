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
exports.OrderDetailController = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const order_detail_model_1 = require("../models/order-detail.model");
const order_detail_repository_1 = require("../repositories/order-detail.repository");
let OrderDetailController = class OrderDetailController {
    constructor(repo, requestGetter) {
        this.repo = repo;
        this.requestGetter = requestGetter;
    }
    async find() {
        const req = await this.requestGetter();
        const raw = req.query.filter;
        const filter = typeof raw === 'string' ? JSON.parse(raw) : raw || {};
        return this.repo.find(filter);
    }
    async findById(id) {
        const req = await this.requestGetter();
        const raw = req.query.filter;
        const filter = typeof raw === 'string' ? JSON.parse(raw) : raw;
        return this.repo.findById(id, filter);
    }
    async create(data) {
        return this.repo.create(data);
    }
    async updateById(id, data) {
        await this.repo.updateById(id, data);
    }
    async deleteById(id) {
        await this.repo.deleteById(id);
    }
    async getCurrentTotal() {
        const all = await this.repo.find({ where: { orderId: null } });
        const total = all.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
        return { total };
    }
};
exports.OrderDetailController = OrderDetailController;
__decorate([
    (0, rest_1.get)('/api/orderDetails'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "find", null);
__decorate([
    (0, rest_1.get)('/api/orderDetails/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "findById", null);
__decorate([
    (0, rest_1.post)('/api/orderDetails'),
    __param(0, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(order_detail_model_1.OrderDetail, { exclude: ['id'] }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "create", null);
__decorate([
    (0, rest_1.patch)('/api/orderDetails/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(order_detail_model_1.OrderDetail, { partial: true }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "updateById", null);
__decorate([
    (0, rest_1.del)('/api/orderDetails/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "deleteById", null);
__decorate([
    (0, rest_1.get)('/api/orderDetails/currentTotal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getCurrentTotal", null);
exports.OrderDetailController = OrderDetailController = __decorate([
    __param(0, (0, repository_1.repository)(order_detail_repository_1.OrderDetailRepository)),
    __param(1, core_1.inject.getter(rest_1.RestBindings.Http.REQUEST)),
    __metadata("design:paramtypes", [order_detail_repository_1.OrderDetailRepository, Function])
], OrderDetailController);
//# sourceMappingURL=order-detail.controller.js.map