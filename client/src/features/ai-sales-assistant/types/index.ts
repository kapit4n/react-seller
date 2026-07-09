export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

export interface Message {
  role: MessageRole;
  content: string;
  toolCallId?: string;
  name?: string;
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

export interface SSEChunk {
  type: 'text' | 'proposal' | 'done' | 'error';
  content?: string;
  proposal?: CartProposal;
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

export interface ExecuteResponse {
  success: boolean;
  cart?: CartState;
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  proposal?: CartProposal;
  timestamp: number;
}

export type ChatStatus = 'idle' | 'loading' | 'streaming' | 'confirming' | 'executing' | 'error';
