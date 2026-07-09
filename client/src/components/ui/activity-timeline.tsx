import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {cn} from '@/lib/utils'

interface ActivityItem {
  id: string
  type: 'sale' | 'order' | 'product' | 'user'
  message: string
  timestamp: Date
  icon?: React.ReactNode
  color?: string
}

interface ActivityTimelineProps {
  title: string
  description?: string
  activities: ActivityItem[]
  className?: string
  limit?: number
}

const getActivityColor = (type: ActivityItem['type'], dark: boolean = false) => {
  const colors = {
    sale: dark
      ? 'bg-green-900/30 text-green-400 border-green-800/50'
      : 'bg-green-100 text-green-700 border-green-200/50',
    order: dark
      ? 'bg-blue-900/30 text-blue-400 border-blue-800/50'
      : 'bg-blue-100 text-blue-700 border-blue-200/50',
    product: dark
      ? 'bg-purple-900/30 text-purple-400 border-purple-800/50'
      : 'bg-purple-100 text-purple-700 border-purple-200/50',
    user: dark
      ? 'bg-amber-900/30 text-amber-400 border-amber-800/50'
      : 'bg-amber-100 text-amber-700 border-amber-200/50',
  }
  return colors[type] || colors.user
}

export function ActivityTimeline({
  title,
  description,
  activities,
  className,
  limit = 10,
}: ActivityTimelineProps) {
  const displayActivities = activities.slice(0, limit)
  
  return (
    <Card className={cn('hover-lift', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {displayActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity, index) => (
              <div key={activity.id} className="relative flex gap-4">
                {index < displayActivities.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-0.5 bg-border" />
                )}
                <div className={cn('relative z-10 flex h-10 w-10 items-center justify-center rounded-full border', getActivityColor(activity.type))}>{activity.icon}</div>
                <div className="flex-1 space-y-1 pt-1">
                  <p className="text-sm font-medium leading-none">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}