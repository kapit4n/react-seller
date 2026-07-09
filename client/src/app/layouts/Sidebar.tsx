import {NavLink} from 'react-router-dom'
import {
  Box,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  ShoppingCart,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {cn} from '@/lib/utils'
import {useAuthStore} from '@/hooks/use-auth'
import {useSidebarStore} from '@/hooks/use-sidebar'
import {useState} from 'react'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  section?: string
}

const navItems: NavItem[] = [
  {label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'Dashboard'},
  {
    label: 'New Sale',
    href: '/dashboard/sales/current',
    icon: ShoppingCart,
    section: 'Sales',
  },
  {label: 'Orders', href: '/dashboard/sales', icon: PackageSearch, section: 'Sales'},
  {label: 'Returns', href: '/dashboard/returns', icon: ShoppingCart, section: 'Sales'},
  {label: 'Products', href: '/dashboard/products', icon: Box, section: 'Inventory'},
  {label: 'Categories', href: '/dashboard/categories', icon: Box, section: 'Inventory'},
  {label: 'Stock', href: '/dashboard/stock', icon: PackageSearch, section: 'Inventory'},
  {label: 'Customers', href: '/dashboard/customers', icon: Users, section: 'Customers'},
  {label: 'Vendors', href: '/dashboard/vendors', icon: Store, section: 'Suppliers'},
  {label: 'Reports', href: '/dashboard/reports', icon: LayoutDashboard, section: 'Reports'},
  {
    label: 'AI Assistant',
    href: '/dashboard/ai-assistant',
    icon: Users,
    section: 'AI Assistant',
  },
  {label: 'Settings', href: '/dashboard/settings', icon: LayoutDashboard, section: 'Settings'},
  {label: 'Support', href: '/dashboard/support', icon: LayoutDashboard, section: 'Support'},
]

interface NavSection {
  section: string
  items: NavItem[]
}

const groupedNavItems = navItems.reduce((acc, item) => {
  if (!acc[item.section || 'Other']) {
    acc[item.section || 'Other'] = []
  }
  acc[item.section || 'Other'].push(item)
  return acc
}, {} as Record<string, NavItem[]>)

const sectionOrder = [
  'Dashboard',
  'Sales',
  'Inventory',
  'Customers',
  'Suppliers',
  'Reports',
  'AI Assistant',
  'Settings',
  'Support',
]

export function Sidebar() {
  const logout = useAuthStore((s) => s.logout)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r bg-sidebar-background transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        'hidden md:flex',
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-primary">React Seller</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {sectionOrder.map((section) => {
          const sectionItems = groupedNavItems[section]
          if (!sectionItems) return null

          return (
            <div key={section} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                    {section}
                  </h3>
                </div>
              )}
              {sectionItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/dashboard'}
                  className={({isActive}) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-sidebar-primary/10 text-sidebar-primary'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                      isCollapsed && 'justify-center',
                    )
                  }
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          )
        })}
      </nav>
      <div className="p-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          className={cn('w-full justify-start text-sidebar-foreground', isCollapsed && 'justify-center')}
          onClick={logout}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}