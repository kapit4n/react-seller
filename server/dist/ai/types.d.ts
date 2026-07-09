export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';
export interface Message {
    role: MessageRole;
    content: string;
    toolCallId?: string;
    toolCalls?: ToolCall[];
    name?: string;
}
export interface ToolCall {
    id: string;
    name: string;
    arguments: Record<string, unknown>;
}
export interface ToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, unknown>;
        required: string[];
    };
}
export interface AIProviderConfig {
    apiKey: string;
    model: string;
    baseUrl: string;
}
export interface AIStreamChunk {
    type: 'text' | 'proposal' | 'done' | 'error';
    content?: string;
    proposal?: CartProposal;
    error?: string;
}
export interface AIProvider {
    readonly name: string;
    chat(messages: Message[], tools: ToolDefinition[]): AsyncGenerator<AIStreamChunk | ToolCallStreamChunk>;
}
export interface ToolCallStreamChunk {
    type: 'tool_call';
    toolCalls: ToolCall[];
}
export interface CartAction {
    type: 'add' | 'remove' | 'update' | 'clear' | 'submit';
    productId?: number;
    productName?: string;
    quantity?: number;
    customerId?: number;
}
export interface CartProposal {
    summary: string;
    actions: CartAction[];
    total?: number;
}
export interface ChatRequest {
    message: string;
    history: Message[];
}
export interface ExecuteRequest {
    actions: CartAction[];
}
export interface ExecuteResponse {
    success: boolean;
    cart?: CartState;
    error?: string;
}
export interface CartItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    totalPrice: number;
}
export interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}
export type ToolHandler = (args: Record<string, unknown>) => Promise<{
    success: true;
    data: unknown;
} | {
    success: false;
    error: string;
}>;
export interface Tool {
    definition: ToolDefinition;
    execute: ToolHandler;
}
