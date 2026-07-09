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
exports.AIController = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const product_repository_1 = require("../repositories/product.repository");
const order_detail_repository_1 = require("../repositories/order-detail.repository");
const order_repository_1 = require("../repositories/order.repository");
const customer_repository_1 = require("../repositories/customer.repository");
const service_1 = require("../ai/service");
let AIController = class AIController {
    constructor(productRepo, orderDetailRepo, orderRepo, customerRepo) {
        this.aiService = new service_1.AIService(productRepo, orderDetailRepo, orderRepo, customerRepo);
    }
    async chat(body, response) {
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no',
        });
        try {
            for await (const chunk of this.aiService.chat(body.message, body.history || [])) {
                if (chunk.type === 'text') {
                    response.write(`data: ${JSON.stringify({ type: 'text', content: chunk.content })}\n\n`);
                }
                else if (chunk.type === 'proposal') {
                    response.write(`data: ${JSON.stringify({ type: 'proposal', proposal: chunk.proposal })}\n\n`);
                }
                else if (chunk.type === 'error') {
                    response.write(`data: ${JSON.stringify({ type: 'error', error: chunk.error })}\n\n`);
                }
            }
            response.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Internal server error';
            response.write(`data: ${JSON.stringify({ type: 'error', error: message })}\n\n`);
        }
        finally {
            response.end();
        }
    }
    async execute(body) {
        return this.aiService.executeActions(body.actions);
    }
};
exports.AIController = AIController;
__decorate([
    (0, rest_1.post)('/api/ai/chat', {
        responses: {
            200: { description: 'SSE stream of AI chat response' },
        },
    }),
    __param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        history: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    role: { type: 'string' },
                                    content: { type: 'string' },
                                },
                            },
                        },
                    },
                    required: ['message'],
                },
            },
        },
    })),
    __param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "chat", null);
__decorate([
    (0, rest_1.post)('/api/ai/execute', {
        responses: {
            200: { description: 'Execution result' },
        },
    }),
    __param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        actions: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string',
                                        enum: ['add', 'remove', 'update', 'clear', 'submit'],
                                    },
                                    productId: { type: 'number' },
                                    productName: { type: 'string' },
                                    quantity: { type: 'number' },
                                    customerId: { type: 'number' },
                                },
                                required: ['type'],
                            },
                        },
                    },
                    required: ['actions'],
                },
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "execute", null);
exports.AIController = AIController = __decorate([
    __param(0, (0, repository_1.repository)(product_repository_1.ProductRepository)),
    __param(1, (0, repository_1.repository)(order_detail_repository_1.OrderDetailRepository)),
    __param(2, (0, repository_1.repository)(order_repository_1.OrderRepository)),
    __param(3, (0, repository_1.repository)(customer_repository_1.CustomerRepository)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository, order_detail_repository_1.OrderDetailRepository, order_repository_1.OrderRepository, customer_repository_1.CustomerRepository])
], AIController);
//# sourceMappingURL=ai.controller.js.map