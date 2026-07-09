import type {
  AIStreamChunk,
  Message,
  Tool,
  ToolCall,
  CartAction,
  CartProposal,
  CartState,
  ExecuteResponse,
} from './types';
import {SYSTEM_PROMPT, SALES_PROMPT} from './prompts';
import {createProvider, getProviderConfig} from './provider';
import {createTools} from './tools';
import {ProductRepository} from '../repositories/product.repository';
import {OrderDetailRepository} from '../repositories/order-detail.repository';
import {OrderRepository} from '../repositories/order.repository';
import {CustomerRepository} from '../repositories/customer.repository';

const PROPOSE_TOOL = 'proposeCartChanges';

export class AIService {
  private provider = createProvider(
    getProviderConfig().type,
    getProviderConfig().config,
  );
  private tools: Tool[];
  private readOnlyTools: Tool[];
  private productRepo: ProductRepository;
  private orderDetailRepo: OrderDetailRepository;
  private orderRepo: OrderRepository;
  private customerRepo: CustomerRepository;

  constructor(
    productRepo: ProductRepository,
    orderDetailRepo: OrderDetailRepository,
    orderRepo: OrderRepository,
    customerRepo: CustomerRepository,
  ) {
    this.productRepo = productRepo;
    this.orderDetailRepo = orderDetailRepo;
    this.orderRepo = orderRepo;
    this.customerRepo = customerRepo;
    this.tools = createTools(productRepo, orderDetailRepo, orderRepo, customerRepo);
    this.readOnlyTools = this.tools.filter(
      (t) =>
        t.definition.name === 'searchProducts' ||
        t.definition.name === 'getProductStock' ||
        t.definition.name === 'getCurrentCart' ||
        t.definition.name === 'proposeCartChanges',
    );
  }

  isConfigured(): boolean {
    const cfg = getProviderConfig();
    return cfg.type === 'mock' || !!cfg.config.apiKey;
  }

  async *chat(
    userMessage: string,
    history: Message[],
  ): AsyncGenerator<AIStreamChunk> {
    if (!this.isConfigured()) {
      yield {
        type: 'error',
        error:
          'AI assistant is not configured. Set AI_API_KEY or use AI_PROVIDER=mock.',
      };
      return;
    }

    const messages: Message[] = [
      {role: 'system', content: SYSTEM_PROMPT},
      {role: 'system', content: SALES_PROMPT},
      ...history,
      {role: 'user', content: userMessage},
    ];

    let loopCount = 0;
    const maxLoops = 10;

    while (loopCount < maxLoops) {
      loopCount++;

      const stream = this.provider.chat(messages, this.readOnlyTools.map((t) => t.definition));

      let fullText = '';
      let toolCalls: ToolCall[] = [];

      for await (const chunk of stream) {
        if (chunk.type === 'text') {
          fullText += chunk.content;
          yield {type: 'text', content: chunk.content};
        } else if (chunk.type === 'tool_call') {
          toolCalls = chunk.toolCalls;
        }
      }

      const proposeCall = toolCalls.find((tc) => tc.name === PROPOSE_TOOL);

      if (proposeCall) {
        const proposal = proposeCall.arguments as unknown as CartProposal;
        yield {type: 'proposal', proposal};
        return;
      }

      if (toolCalls.length > 0) {
        const assistantMsg: Message = {
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
              content: JSON.stringify({success: false, error: `Unknown tool: ${tc.name}`}),
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
          } catch (err) {
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

      yield {type: 'done'};
      return;
    }

    yield {
      type: 'error',
      error: 'Assistant exceeded maximum number of tool call rounds. Please try again.',
    };
  }

  async executeActions(actions: CartAction[]): Promise<ExecuteResponse> {
    for (const action of actions) {
      const tool = this.tools.find((t) => {
        const actionToolMap: Record<string, string> = {
          add: 'addToCart',
          remove: 'removeFromCart',
          update: 'updateQuantity',
          clear: 'clearCart',
          submit: 'submitOrder',
        };
        return t.definition.name === actionToolMap[action.type];
      });

      if (!tool) {
        return {success: false, error: `Unknown action type: ${action.type}`};
      }

      try {
        const result = await tool.execute(action as unknown as Record<string, unknown>);
        if (!result.success) {
          return {success: false, error: result.error};
        }
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Action execution failed',
        };
      }
    }

    return {success: true, cart: await this.fetchCart()};
  }

  private async fetchCart(): Promise<CartState> {
    const items = await this.orderDetailRepo.find({where: {orderId: null as any}});
    const cart: CartState = {items: [], total: 0, itemCount: 0};

    for (const item of items) {
      let productName = `Product #${item.productId}`;
      try {
        const product = await this.productRepo.findById(item.productId!);
        productName = product.name;
      } catch {}

      cart.items.push({
        id: item.id!,
        productId: item.productId!,
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
