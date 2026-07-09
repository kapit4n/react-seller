import {AlertCircle} from 'lucide-react'
import {Button} from '@/components/ui/button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({message = 'Something went wrong.', onRetry}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-12 w-12 text-destructive/50" />
      <h3 className="mt-4 text-lg font-semibold">Error</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
