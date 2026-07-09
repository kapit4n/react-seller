import {useEffect, useRef, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {ScrollText, Trash2, X} from 'lucide-react';
import {useAIChat} from '../hooks/useAIChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import SuggestedPrompts from './SuggestedPrompts';

interface Props {
  onClose: () => void;
}

export default function ChatPanel({onClose}: Props) {
  const {
    messages,
    status,
    error,
    sendMessage,
    confirmProposal,
    cancelProposal,
    cancelGeneration,
    clearConversation,
  } = useAIChat();

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, status]);

  const handleConfirm = useCallback(
    (actions: import('../types').CartAction[]) => {
      confirmProposal(actions);
    },
    [confirmProposal],
  );

  const isBusy = status === 'loading' || status === 'streaming' || status === 'executing';

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-sm">AI Sales Assistant</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={clearConversation}
            title="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={onClose}
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && status === 'idle' && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-3">
            <ScrollText className="h-10 w-10 opacity-40" />
            <div className="space-y-1">
              <p className="text-sm font-medium">AI Sales Assistant</p>
              <p className="text-xs">
                Ask me to sell products, manage the cart, or check inventory.
              </p>
            </div>
            <SuggestedPrompts onSelect={sendMessage} />
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onConfirm={handleConfirm}
            onCancel={cancelProposal}
          />
        ))}

        {status === 'loading' && <TypingIndicator />}

        {error && (
          <div className="text-center">
            <p className="text-xs text-destructive bg-destructive/10 rounded px-2 py-1 inline-block">
              {error}
            </p>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Divider */}
      <Separator />

      {/* Input */}
      <div className="p-3 space-y-2 shrink-0">
        {messages.length === 0 && status === 'idle' && (
          <SuggestedPrompts onSelect={sendMessage} disabled={isBusy} />
        )}
        <ChatInput
          onSend={sendMessage}
          onCancel={cancelGeneration}
          disabled={isBusy}
          isStreaming={status === 'streaming'}
        />
      </div>
    </div>
  );
}
