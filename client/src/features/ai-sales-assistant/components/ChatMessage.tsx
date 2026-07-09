import {type ChatMessage as ChatMessageType} from '../types';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

interface Props {
  message: ChatMessageType;
  onConfirm?: (actions: import('../types').CartAction[]) => void;
  onCancel?: () => void;
}

const roleStyles: Record<string, string> = {
  user: 'bg-primary/10 ml-8',
  assistant: 'bg-muted mr-8',
  system: 'bg-muted/50 text-center text-sm italic mx-8',
};

const roleLabels: Record<string, string> = {
  user: 'You',
  assistant: 'AI Assistant',
  system: '',
};

export default function ChatMessage({message, onConfirm, onCancel}: Props) {
  const isSystem = message.role === 'system';

  return (
    <div className={`flex flex-col ${isSystem ? 'items-center' : message.role === 'user' ? 'items-end' : 'items-start'}`}>
      {!isSystem && (
        <span className="text-xs text-muted-foreground px-1 mb-1">
          {roleLabels[message.role]}
        </span>
      )}
      <div
        className={`rounded-lg px-3 py-2 text-sm max-w-[85%] ${roleStyles[message.role] || ''}`}
      >
        {message.content && (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        )}

        {message.proposal && (
          <Card className="mt-3 border-primary/30">
            <CardContent className="p-3 space-y-2">
              <p className="font-medium text-sm">{message.proposal.summary}</p>
              {message.proposal.actions.length > 0 && (
                <ul className="text-xs space-y-1">
                  {message.proposal.actions.map((action, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      {action.type === 'add' && (
                        <span>
                          Add {action.quantity} × {action.productName}
                        </span>
                      )}
                      {action.type === 'remove' && (
                        <span>
                          Remove {action.productName}
                        </span>
                      )}
                      {action.type === 'update' && (
                        <span>
                          Update {action.productName} → {action.quantity}
                        </span>
                      )}
                      {action.type === 'clear' && <span>Clear cart</span>}
                      {action.type === 'submit' && (
                        <span>
                          Submit order (Customer #{action.customerId})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {message.proposal.total !== undefined && (
                <p className="text-sm font-semibold pt-1 border-t border-border">
                  Total: Bs {message.proposal.total.toFixed(2)}
                </p>
              )}
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={() => onConfirm?.(message.proposal!.actions)}
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
