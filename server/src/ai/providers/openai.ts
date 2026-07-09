import OpenAI from 'openai';
import {
  type AIProvider,
  type AIProviderConfig,
  type AIStreamChunk,
  type Message,
  type ToolCallStreamChunk,
  type ToolDefinition,
} from '../types';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';
  private client: OpenAI;
  private model: string;

  constructor(config: AIProviderConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });
    this.model = config.model;
  }

  async *chat(
    messages: Message[],
    tools: ToolDefinition[],
  ): AsyncGenerator<AIStreamChunk | ToolCallStreamChunk> {
    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages: messages.map((m) => {
        const msg: Record<string, unknown> = {role: m.role, content: m.content || null};
        if (m.toolCallId) msg.tool_call_id = m.toolCallId;
        if (m.name) msg.name = m.name;
        return msg as unknown as OpenAI.Chat.ChatCompletionMessageParam;
      }),
      tools:
        tools.length > 0
          ? tools.map((t) => ({
              type: 'function' as const,
              function: {
                name: t.name,
                description: t.description,
                parameters: t.parameters as Record<string, unknown>,
              },
            }))
          : undefined,
      stream: true,
    });

    const toolCallAccumulators: Map<
      number,
      {id: string; name: string; args: string}
    > = new Map();

    for await (const chunk of stream) {
      const choice = chunk.choices?.[0];
      if (!choice) continue;

      const delta = choice.delta;

      if (delta?.content) {
        yield {type: 'text', content: delta.content};
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
          const acc = toolCallAccumulators.get(index)!;
          if (tc.id) acc.id = tc.id;
          if (tc.function?.name) acc.name = tc.function.name;
          if (tc.function?.arguments) acc.args += tc.function.arguments;
        }
      }

      if (choice.finish_reason === 'tool_calls') {
        const toolCalls: {
          id: string;
          name: string;
          arguments: Record<string, unknown>;
        }[] = [];

        for (const [, acc] of toolCallAccumulators) {
          let parsedArgs: Record<string, unknown> = {};
          try {
            parsedArgs = JSON.parse(acc.args);
          } catch {
            parsedArgs = {};
          }
          toolCalls.push({id: acc.id, name: acc.name, arguments: parsedArgs});
        }

        if (toolCalls.length > 0) {
          yield {type: 'tool_call', toolCalls};
        }
      }
    }
  }
}
