import {useState, useRef, useEffect, type KeyboardEvent} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Send, Square} from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  onCancel: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
}

export default function ChatInput({onSend, onCancel, disabled, isStreaming}: Props) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isStreaming) {
      inputRef.current?.focus();
    }
  }, [isStreaming]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isStreaming ? 'Waiting for response...' : 'Type a message...'}
        disabled={disabled || isStreaming}
        className="flex-1"
      />
      {isStreaming ? (
        <Button
          size="icon"
          variant="destructive"
          onClick={onCancel}
          title="Stop generating"
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          title="Send"
        >
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
