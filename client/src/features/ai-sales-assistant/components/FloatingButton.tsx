import {Button} from '@/components/ui/button';
import {Bot, X} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingButton({isOpen, onClick}: Props) {
  return (
    <Button
      size="icon"
      className="h-12 w-12 rounded-full shadow-lg"
      onClick={onClick}
      title={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
    </Button>
  );
}
