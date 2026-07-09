import apiClient from '@/services/api/client';
import type {Message, SSEChunk, CartAction, ExecuteResponse} from '../types';

export async function* streamChat(
  message: string,
  history: Message[],
  signal?: AbortSignal,
): AsyncGenerator<SSEChunk> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message, history}),
    signal,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknown error');
    throw new Error(`Chat request failed (${response.status}): ${text}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const {done, value} = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, {stream: true});
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data: ')) continue;
      try {
        const chunk: SSEChunk = JSON.parse(trimmed.slice(6));
        yield chunk;
        if (chunk.type === 'done' || chunk.type === 'error') return;
      } catch {
        // skip malformed JSON lines
      }
    }
  }
}

export async function executeActions(actions: CartAction[]): Promise<ExecuteResponse> {
  const {data} = await apiClient.post<ExecuteResponse>('/ai/execute', {actions});
  return data;
}
