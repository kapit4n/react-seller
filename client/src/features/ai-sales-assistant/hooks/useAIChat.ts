import {useCallback, useRef, useState} from 'react';
import type {ChatMessage, ChatStatus, CartAction, CartProposal, Message} from '../types';
import {streamChat, executeActions} from '../services/ai';

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function toHistory(messages: ChatMessage[]): Message[] {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));
}

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || status === 'loading' || status === 'streaming') return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setStatus('loading');
    setError(null);

    const abort = new AbortController();
    abortRef.current = abort;

    const assistantMsg: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    const assistantIndex = messages.length + 1;

    try {
      const history = toHistory([...messages, userMsg]);

      for await (const chunk of streamChat(text, history, abort.signal)) {
        if (chunk.type === 'text') {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.role === 'assistant') {
              updated[updated.length - 1] = {...last, content: last.content + (chunk.content || '')};
            }
            return updated;
          });
          setStatus('streaming');
        } else if (chunk.type === 'proposal' && chunk.proposal) {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.role === 'assistant') {
              updated[updated.length - 1] = {...last, proposal: chunk.proposal};
            }
            return updated;
          });
          setStatus('confirming');
        } else if (chunk.type === 'error') {
          setError(chunk.error || 'An error occurred');
          setStatus('error');
          return;
        }
      }

      if (status !== 'confirming' && status !== 'error') {
        setStatus('idle');
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setStatus('idle');
      } else {
        setError((err as Error).message || 'Failed to get response');
        setStatus('error');
      }
    }
  }, [messages, status]);

  const confirmProposal = useCallback(async (actions: CartAction[]) => {
    setStatus('executing');
    setError(null);

    try {
      const result = await executeActions(actions);
      if (!result.success) {
        setError(result.error || 'Failed to execute actions');
        setStatus('error');
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'system',
          content: result.cart
            ? `✓ Changes applied. Cart total: Bs ${result.cart.total.toFixed(2)} (${result.cart.itemCount} items)`
            : '✓ Changes applied successfully.',
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setError((err as Error).message || 'Failed to execute actions');
      setStatus('error');
      return;
    }

    setStatus('idle');
  }, []);

  const cancelProposal = useCallback(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'system',
        content: 'Proposal cancelled. How else can I help?',
        timestamp: Date.now(),
      },
    ]);
    setStatus('idle');
  }, []);

  const cancelGeneration = useCallback(() => {
    abortRef.current?.abort();
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: 'system',
        content: 'Generation cancelled.',
        timestamp: Date.now(),
      },
    ]);
    setStatus('idle');
  }, []);

  const clearConversation = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setStatus('idle');
    setError(null);
  }, []);

  return {
    messages,
    status,
    error,
    sendMessage,
    confirmProposal,
    cancelProposal,
    cancelGeneration,
    clearConversation,
  };
}
