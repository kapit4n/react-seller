"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const prompts_1 = require("./prompts");
const provider_1 = require("./provider");
const tools_1 = require("./tools");
const PROPOSE_TOOL = 'proposeCartChanges';
class AIService {
    constructor(productRepo, orderDetailRepo, orderRepo, customerRepo) {
        this.provider = (0, provider_1.createProvider)((0, provider_1.getProviderConfig)().type, (0, provider_1.getProviderConfig)().config);
        this.productRepo = productRepo;
        this.orderDetailRepo = orderDetailRepo;
        this.orderRepo = orderRepo;
        this.customerRepo = customerRepo;
        this.tools = (0, tools_1.createTools)(productRepo, orderDetailRepo, orderRepo, customerRepo);
        this.readOnlyTools = this.tools.filter((t) => t.definition.name === 'searchProducts' ||
            t.definition.name === 'getProductStock' ||
            t.definition.name === 'getCurrentCart' ||
            t.definition.name === 'proposeCartChanges');
    }
    isConfigured() {
        const cfg = (0, provider_1.getProviderConfig)();
        return cfg.type === 'mock' || !!cfg.config.apiKey;
    }
    async *chat(userMessage, history) {
        if (!this.isConfigured()) {
            yield {
                type: 'error',
                error: 'AI assistant is not configured. Set AI_API_KEY or use AI_PROVIDER=mock.',
            };
            return;
        }
        const messages = [
            { role: 'system', content: prompts_1.SYSTEM_PROMPT },
            { role: 'system', content: prompts_1.SALES_PROMPT },
            ...history,
            { role: 'user', content: userMessage },
        ];
        let loopCount = 0;
        const maxLoops = 10;
        while (loopCount < maxLoops) {
            loopCount++;
            const stream = this.provider.chat(messages, this.readOnlyTools.map((t) => t.definition));
            let fullText = '';
            let toolCalls = [];
            for await (const chunk of stream) {
                if (chunk.type === 'text') {
                    fullText += chunk.content;
                    yield { type: 'text', content: chunk.content };
                }
                else if (chunk.type === 'tool_call') {
                    toolCalls = chunk.toolCalls;
                }
            }
            const proposeCall = toolCalls.find((tc) => tc.name === PROPOSE_TOOL);
            if (proposeCall) {
                const proposal = proposeCall.arguments;
                yield { type: 'proposal', proposal };
                return;
            }
            if (toolCalls.length > 0) {
                const assistantMsg = {
                    role: 'assistant',
                    content: fullText,
                    toolCalls: toolCalls.map((tc) => ({
                        id: tc.id,
                        name: tc.name,
                        arguments: tc.arguments,
                    })),
                };
                messages.push(assistantMsg);
                for (const tc of toolCalls) {
                    const tool = this.readOnlyTools.find((t) => t.definition.name === tc.name);
                    if (!tool) {
                        messages.push({
                            role: 'tool',
                            content: JSON.stringify({ success: false, error: `Unknown tool: ${tc.name}` }),
                            toolCallId: tc.id,
                            name: tc.name,
                        });
                        continue;
                    }
                    try {
                        const result = await tool.execute(tc.arguments);
                        messages.push({
                            role: 'tool',
                            content: JSON.stringify(result),
                            toolCallId: tc.id,
                            name: tc.name,
                        });
                    }
                    catch (err) {
                        messages.push({
                            role: 'tool',
                            content: JSON.stringify({
                                success: false,
                                error: err instanceof Error ? err.message : 'Tool execution failed',
                            }),
                            toolCallId: tc.id,
                            name: tc.name,
                        });
                    }
                }
                continue;
            }
            yield { type: 'done' };
            return;
        }
        yield {
            type: 'error',
            error: 'Assistant exceeded maximum number of tool call rounds. Please try again.',
        };
    }
    async executeActions(actions) {
        for (const action of actions) {
            const tool = this.tools.find((t) => {
                const actionToolMap = {
                    add: 'addToCart',
                    remove: 'removeFromCart',
                    update: 'updateQuantity',
                    clear: 'clearCart',
                    submit: 'submitOrder',
                };
                return t.definition.name === actionToolMap[action.type];
            });
            if (!tool) {
                return { success: false, error: `Unknown action type: ${action.type}` };
            }
            try {
                const result = await tool.execute(action);
                if (!result.success) {
                    return { success: false, error: result.error };
                }
            }
            catch (err) {
                return {
                    success: false,
                    error: err instanceof Error ? err.message : 'Action execution failed',
                };
            }
        }
        return { success: true, cart: await this.fetchCart() };
    }
    async fetchCart() {
        const items = await this.orderDetailRepo.find({ where: { orderId: null } });
        const cart = { items: [], total: 0, itemCount: 0 };
        for (const item of items) {
            let productName = `Product #${item.productId}`;
            try {
                const product = await this.productRepo.findById(item.productId);
                productName = product.name;
            }
            catch { }
            cart.items.push({
                id: item.id,
                productId: item.productId,
                productName,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
            });
            cart.total += item.totalPrice;
            cart.itemCount += item.quantity;
        }
        return cart;
    }
}
exports.AIService = AIService;
//# sourceMappingURL=service.js.map