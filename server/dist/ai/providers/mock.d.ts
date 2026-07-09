import { type AIProvider, type AIStreamChunk, type Message, type ToolCallStreamChunk, type ToolDefinition } from '../types';
export declare class MockProvider implements AIProvider {
    readonly name = "mock";
    chat(messages: Message[], _tools: ToolDefinition[]): AsyncGenerator<AIStreamChunk | ToolCallStreamChunk>;
}
