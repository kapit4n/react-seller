"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProvider = createProvider;
exports.getProviderConfig = getProviderConfig;
const openai_1 = require("./providers/openai");
const mock_1 = require("./providers/mock");
function createProvider(type, config) {
    switch (type) {
        case 'openai':
            return new openai_1.OpenAIProvider(config);
        case 'mock':
            return new mock_1.MockProvider();
        default:
            throw new Error(`Unknown provider type: ${type}`);
    }
}
function getProviderConfig() {
    const type = (process.env.AI_PROVIDER || 'mock');
    const config = {
        apiKey: process.env.AI_API_KEY || '',
        model: process.env.AI_MODEL || 'gpt-4o',
        baseUrl: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
    };
    return { type, config };
}
//# sourceMappingURL=provider.js.map