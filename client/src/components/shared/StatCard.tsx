import {type LucideIcon} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
}

export function StatCard({title, value, icon: Icon, description}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
