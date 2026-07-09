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
exports.ProductController = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const product_model_1 = require("../models/product.model");
const product_repository_1 = require("../repositories/product.repository");
let ProductController = class ProductController {
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
    async getName() {
        const req = await this.requestGetter();
        const id = Number(req.query.id);
        const product = await this.repo.findById(id);
        return { name: `Name of product is ${product.name}` };
    }
    async updateStock() {
        const req = await this.requestGetter();
        const query = req.query;
        const id = Number(query.id);
        const amount = Number(query.amount);
        const product = await this.repo.findById(id);
        if (amount <= product.stock) {
            product.stock -= amount;
            await this.repo.updateById(id, { stock: product.stock });
            return { success: 'true' };
        }
        return { success: 'false' };
    }
    async checkStock() {
        const req = await this.requestGetter();
        const query = req.query;
        const id = Number(query.id);
        const amount = Number(query.amount);
        const product = await this.repo.findById(id);
        return { success: amount <= product.stock ? 'true' : 'false' };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, rest_1.get)('/api/products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "find", null);
__decorate([
    (0, rest_1.get)('/api/products/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
__decorate([
    (0, rest_1.post)('/api/products'),
    __param(0, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(product_model_1.Product, { exclude: ['id'] }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, rest_1.patch)('/api/products/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(product_model_1.Product, { partial: true }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateById", null);
__decorate([
    (0, rest_1.del)('/api/products/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteById", null);
__decorate([
    (0, rest_1.get)('/api/products/getname'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getName", null);
__decorate([
    (0, rest_1.get)('/api/products/updateStock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateStock", null);
__decorate([
    (0, rest_1.get)('/api/products/checkStock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "checkStock", null);
exports.ProductController = ProductController = __decorate([
    __param(0, (0, repository_1.repository)(product_repository_1.ProductRepository)),
    __param(1, core_1.inject.getter(rest_1.RestBindings.Http.REQUEST)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository, Function])
], ProductController);
//# sourceMappingURL=product.controller.js.map