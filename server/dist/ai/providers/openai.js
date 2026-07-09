"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIProvider = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIProvider {
    constructor(config) {
        this.name = 'openai';
        this.client = new openai_1.default({
            apiKey: config.apiKey,
            baseURL: config.baseUrl,
        });
        this.model = config.model;
    }
    async *chat(messages, tools) {
        const stream = await this.client.chat.completions.create({
            model: this.model,
            messages: messages.map((m) => {
                const msg = { role: m.role, content: m.content || null };
                if (m.toolCallId)
                    msg.tool_call_id = m.toolCallId;
                if (m.name)
                    msg.name = m.name;
                return msg;
            }),
            tools: tools.length > 0
                ? tools.map((t) => ({
                    type: 'function',
                    function: {
                        name: t.name,
                        description: t.description,
                        parameters: t.parameters,
                    },
                }))
                : undefined,
            stream: true,
        });
        const toolCallAccumulators = new Map();
        for await (const chunk of stream) {
            const choice = chunk.choices?.[0];
            if (!choice)
                continue;
            const delta = choice.delta;
            if (delta?.content) {
                yield { type: 'text', content: delta.content };
            }
            if (delta?.tool_calls) {
                for (const tc of delta.tool_calls) {
                    const index = tc.index;
                    if (!toolCallAccumulators.has(index)) {
                        toolCallAccumulators.set(index, {
                            id: tc.id || '',
                            name: tc.function?.name || '',
                            args: '',
                        });
                    }
                    const acc = toolCallAccumulators.get(index);
                    if (tc.id)
                        acc.id = tc.id;
                    if (tc.function?.name)
                        acc.name = tc.function.name;
                    if (tc.function?.arguments)
                        acc.args += tc.function.arguments;
                }
            }
            if (choice.finish_reason === 'tool_calls') {
                const toolCalls = [];
                for (const [, acc] of toolCallAccumulators) {
                    let parsedArgs = {};
                    try {
                        parsedArgs = JSON.parse(acc.args);
                    }
                    catch {
                        parsedArgs = {};
                    }
                    toolCalls.push({ id: acc.id, name: acc.name, arguments: parsedArgs });
                }
                if (toolCalls.length > 0) {
                    yield { type: 'tool_call', toolCalls };
                }
            }
        }
    }
}
exports.OpenAIProvider = OpenAIProvider;
//# sourceMappingURL=openai.js.map