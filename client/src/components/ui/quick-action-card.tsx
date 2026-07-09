import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'

interface QuickAction {
  label: string
  icon: React.ReactNode
  action: () => void
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  className?: string
}

interface QuickActionCardProps {
  title: string
  description?: string
  actions: QuickAction[]
  className?: string
}

export function QuickActionCard({title, description, actions, className}: QuickActionCardProps) {
  return (
    <Card className={cn('hover-lift', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              className={cn('h-auto p-4 justify-start text-left font-normal hover-scale', action.className)}
              onClick={action.action}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                  {action.icon}
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}