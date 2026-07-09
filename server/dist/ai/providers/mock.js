"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockProvider = void 0;
function detectIntent(input) {
    if (/^(hi|hello|hey|help|start|what can|how do)\b/i.test(input))
        return 'help';
    if (/\b(show|what'?s\s+in|get|current)\b.*\b(cart|order)\b/i.test(input))
        return 'cart';
    if (/\b(clear|empty)\b.*\b(cart|order)\b/i.test(input))
        return 'clear';
    if (/\b(sell|add|buy|order|need|want|find|search)\b/i.test(input))
        return 'search';
    return 'search';
}
class MockProvider {
    constructor() {
        this.name = 'mock';
    }
    async *chat(messages, _tools) {
        const hasToolResults = messages.some((m) => m.role === 'tool');
        const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
        const input = lastUserMsg?.content.trim() || '';
        const intent = detectIntent(input);
        if (hasToolResults) {
            const cartMsg = messages.find((m) => m.role === 'tool' && m.name === 'getCurrentCart');
            if (cartMsg) {
                let cartData = null;
                try {
                    const p = JSON.parse(cartMsg.content);
                    if (p.success)
                        cartData = p.data;
                }
                catch { }
                if (cartData && cartData.items && cartData.items.length > 0) {
                    const lines = cartData.items.map((i) => `• ${i.quantity} × ${i.productName} — Bs ${i.totalPrice.toFixed(2)}`);
                    yield { type: 'text', content: [
                            'Here\'s your current cart:',
                            '',
                            ...lines,
                            '',
                            `**Total: Bs ${(cartData.total || 0).toFixed(2)} (${cartData.itemCount || 0} items)**`,
                        ].join('\n') };
                }
                else {
                    yield { type: 'text', content: 'Your cart is currently empty.' };
                }
                yield { type: 'done' };
                return;
            }
            const productMsg = messages.find((m) => m.role === 'tool' && m.name === 'searchProducts');
            let productData = [];
            if (productMsg) {
                try {
                    const p = JSON.parse(productMsg.content);
                    if (p.success)
                        productData = p.data;
                }
                catch { }
            }
            if (productData.length === 0) {
                yield { type: 'text', content: 'I searched but couldn\'t find any matching products. Could you try a different name or check the spelling?' };
                yield { type: 'done' };
                return;
            }
            if (productData.length === 1) {
                const p = productData[0];
                const qty = extractQuantity(input) || 1;
                if (p.stock < qty) {
                    yield { type: 'text', content: `"${p.name}" only has ${p.stock} in stock, but you requested ${qty}. Would you like a lower quantity?` };
                    yield { type: 'done' };
                    return;
                }
                yield { type: 'text', content: `Found "${p.name}" — Bs ${p.price.toFixed(2)} each, ${p.stock} in stock.` };
                yield {
                    type: 'tool_call',
                    toolCalls: [{
                            id: 'mock_propose',
                            name: 'proposeCartChanges',
                            arguments: {
                                summary: `Add ${qty} × ${p.name} to the cart`,
                                actions: [{ type: 'add', productId: p.id, productName: p.name, quantity: qty }],
                                total: parseFloat((qty * p.price).toFixed(2)),
                            },
                        }],
                };
                return;
            }
            const names = productData.map((p) => `• ${p.name} — Bs ${p.price.toFixed(2)} (${p.stock} in stock)`).join('\n');
            yield { type: 'text', content: `I found multiple products:\n\n${names}\n\nWhich one would you like?` };
            yield { type: 'done' };
            return;
        }
        switch (intent) {
            case 'help':
                yield {
                    type: 'text',
                    content: [
                        "Hello! I'm your AI Sales Assistant. Here's what I can do:",
                        '',
                        '• **Sell products** — "Sell two Coca-Cola"',
                        '• **Check cart** — "Show my cart"',
                        '• **Modify quantities** — "Update Pepsi to 3"',
                        '• **Remove items** — "Remove Coke"',
                        '• **Clear cart** — "Clear the cart"',
                        '',
                        'How can I help you today?',
                    ].join('\n'),
                };
                return;
            case 'cart':
                yield { type: 'text', content: 'Let me check your cart...' };
                yield {
                    type: 'tool_call',
                    toolCalls: [{ id: 'mock_cart', name: 'getCurrentCart', arguments: {} }],
                };
                return;
            case 'clear':
                yield { type: 'text', content: 'I can clear the cart for you.' };
                yield {
                    type: 'tool_call',
                    toolCalls: [{
                            id: 'mock_clear',
                            name: 'proposeCartChanges',
                            arguments: {
                                summary: 'Remove all items from the cart.',
                                actions: [{ type: 'clear' }],
                            },
                        }],
                };
                return;
            default: {
                const query = stripNoise(input);
                if (!query) {
                    yield { type: 'text', content: 'What product are you looking for?' };
                    yield { type: 'done' };
                    return;
                }
                yield { type: 'text', content: `Let me search for "${query}"...` };
                yield {
                    type: 'tool_call',
                    toolCalls: [{ id: 'mock_search', name: 'searchProducts', arguments: { query } }],
                };
            }
        }
    }
}
exports.MockProvider = MockProvider;
function stripNoise(text) {
    return text
        .replace(/\b(sell|add|get|buy|order|need|want|remove|delete|clear|show|find|search|update|change|increase|decrease|the|a|an|some|please|i'd|i'll|i\s+want|i\s+need)\b/gi, '')
        .replace(/\b(zero|one|two|three|four|five|six|seven|eight|nine|ten)\b/gi, '')
        .replace(/\d+\s*(x|×)?\s*/g, '')
        .replace(/[.,!?]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
function extractQuantity(text) {
    const match = text.match(/(\d+)\s*(?:x|×)?\s*(?:of\s+)?/i);
    if (match)
        return parseInt(match[1], 10);
    const words = text.toLowerCase().split(/\s+/);
    const numberWords = {
        one: 1, two: 2, three: 3, four: 4, five: 5,
        six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
        a: 1, an: 1,
    };
    for (const w of words) {
        if (numberWords[w] !== undefined)
            return numberWords[w];
    }
    return null;
}
//# sourceMappingURL=mock.js.map