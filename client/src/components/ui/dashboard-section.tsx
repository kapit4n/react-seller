import {cn} from '@/lib/utils'

interface DashboardSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export function DashboardSection({
  title,
  description,
  children,
  className,
  actions,
}: DashboardSectionProps) {
  return (
    <section className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}