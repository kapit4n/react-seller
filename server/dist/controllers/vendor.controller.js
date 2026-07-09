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
exports.VendorController = void 0;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const vendor_model_1 = require("../models/vendor.model");
const vendor_repository_1 = require("../repositories/vendor.repository");
let VendorController = class VendorController {
    constructor(repo) {
        this.repo = repo;
    }
    async find() {
        return this.repo.find();
    }
    async findById(id) {
        return this.repo.findById(id);
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
exports.VendorController = VendorController;
__decorate([
    (0, rest_1.get)('/api/vendors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "find", null);
__decorate([
    (0, rest_1.get)('/api/vendors/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "findById", null);
__decorate([
    (0, rest_1.post)('/api/vendors'),
    __param(0, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(vendor_model_1.Vendor, { exclude: ['id'] }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "create", null);
__decorate([
    (0, rest_1.patch)('/api/vendors/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, (0, rest_1.requestBody)({ content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(vendor_model_1.Vendor, { partial: true }) } } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "updateById", null);
__decorate([
    (0, rest_1.del)('/api/vendors/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "deleteById", null);
exports.VendorController = VendorController = __decorate([
    __param(0, (0, repository_1.repository)(vendor_repository_1.VendorRepository)),
    __metadata("design:paramtypes", [vendor_repository_1.VendorRepository])
], VendorController);
//# sourceMappingURL=vendor.controller.js.map