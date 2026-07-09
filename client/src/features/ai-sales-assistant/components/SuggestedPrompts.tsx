import {Button} from '@/components/ui/button';
import {Lightbulb} from 'lucide-react';

const SUGGESTIONS = [
  'Sell two Coca-Cola',
  'Show me the current cart',
  'Clear the cart',
  'What products are available?',
];

interface Props {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export default function SuggestedPrompts({onSelect, disabled}: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lightbulb className="h-3 w-3" />
        <span>Suggestions</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <Button
            key={s}
            variant="outline"
            size="sm"
            className="text-xs h-7"
            disabled={disabled}
            onClick={() => onSelect(s)}
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}
