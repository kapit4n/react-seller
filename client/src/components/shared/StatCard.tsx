import {type LucideIcon, TrendingUp, TrendingDown} from 'lucide-react'
import {Card, CardContent} from '@/components/ui/card'
import {cn} from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {value: number; positive: boolean}
  sparkline?: number[]
  accentColor?: 'purple' | 'blue' | 'green' | 'orange' | 'red'
  className?: string
  index?: number
}

const accentMap = {
  purple: 'from-purple-500/10 to-purple-500/5 border-l-purple-500',
  blue: 'from-blue-500/10 to-blue-500/5 border-l-blue-500',
  green: 'from-emerald-500/10 to-emerald-500/5 border-l-emerald-500',
  orange: 'from-orange-500/10 to-orange-500/5 border-l-orange-500',
  red: 'from-red-500/10 to-red-500/5 border-l-red-500',
}

const iconBgMap = {
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

export function StatCard({title, value, icon: Icon, description, trend, sparkline, accentColor = 'purple', className, index = 0}: StatCardProps) {
  const delay = 50 + index * 50

  return (
    <Card
      className={cn(
        'hover-lift overflow-hidden border-l-4 animate-fade-in-up',
        accentMap[accentColor],
        className,
      )}
      style={{animationDelay: `${delay}ms`}}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">{title}</p>
            <p className="text-xl font-bold tabular-nums tracking-tight">{value}</p>
            {description && (
              <p className="text-[10px] text-muted-foreground/70 truncate">{description}</p>
            )}
          </div>
          <div className={cn('rounded-lg p-2.5 shrink-0', iconBgMap[accentColor])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-xs font-semibold',
              trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
            )}>
              {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
            </div>
          )}
          {sparkline && sparkline.length > 0 && (
            <div className="flex-1 h-6">
              <svg viewBox={`0 0 ${sparkline.length * 10} 30`} className="w-full h-full">
                <defs>
                  <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={sparkline.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * 10},${30 - (v / Math.max(...sparkline, 1)) * 25}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground/40 animate-sparkline"
                  strokeDasharray="200"
                />
                <path
                  d={`${sparkline.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * 10},${30 - (v / Math.max(...sparkline, 1)) * 25}`).join(' ')} L${(sparkline.length - 1) * 10},30 L0,30 Z`}
                  fill={`url(#grad-${title})`}
                  className="text-muted-foreground/10"
                />
              </svg>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
