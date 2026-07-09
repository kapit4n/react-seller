import {Skeleton} from '@/components/ui/skeleton'

export function LoadingState({rows = 5}: {rows?: number}) {
  return (
    <div className="space-y-3">
      {Array.from({length: rows}).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}
