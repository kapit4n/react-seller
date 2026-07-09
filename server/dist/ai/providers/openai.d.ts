import { type AIProvider, type AIProviderConfig, type AIStreamChunk, type Message, type ToolCallStreamChunk, type ToolDefinition } from '../types';
export declare class OpenAIProvider implements AIProvider {
    readonly name = "openai";
    private client;
    private model;
    constructor(config: AIProviderConfig);
    chat(messages: Message[], tools: ToolDefinition[]): AsyncGenerator<AIStreamChunk | ToolCallStreamChunk>;
}
