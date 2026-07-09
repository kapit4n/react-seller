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
exports.CustomerController = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const customer_model_1 = require("../models/customer.model");
const customer_repository_1 = require("../repositories/customer.repository");
let CustomerController = class CustomerController {
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
};
exports.CustomerController = CustomerController;
__decorate([
    (0, rest_1.get)('/api/customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "find", null);
__decorate([
    (0, rest_1.get)('/api/customers/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "findById", null);
__decorate([
    (0, rest_1.post)('/api/customers'),
    __param(0, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(customer_model_1.Customer, { exclude: ['id'] }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, rest_1.patch)('/api/customers/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(customer_model_1.Customer, { partial: true }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "updateById", null);
__decorate([
    (0, rest_1.del)('/api/customers/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteById", null);
exports.CustomerController = CustomerController = __decorate([
    __param(0, (0, repository_1.repository)(customer_repository_1.CustomerRepository)),
    __param(1, core_1.inject.getter(rest_1.RestBindings.Http.REQUEST)),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository, Function])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map