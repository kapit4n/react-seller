import {Inbox} from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({title = 'No items', description = 'There are no items to display.'}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox className="h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
