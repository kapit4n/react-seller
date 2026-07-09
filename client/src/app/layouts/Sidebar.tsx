import {NavLink} from 'react-router-dom'
import {
  Box,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {cn} from '@/lib/utils'
import {useAuthStore} from '@/hooks/use-auth'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard},
  {label: 'Products', href: '/dashboard/products', icon: Box},
  {label: 'Customers', href: '/dashboard/customers', icon: Users},
  {label: 'Vendors', href: '/dashboard/vendors', icon: Store},
  {label: 'Sales', href: '/dashboard/sales', icon: ShoppingCart},
]

export function Sidebar() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <aside className="flex h-full flex-col border-r bg-sidebar-background">
      <div className="flex h-14 items-center gap-2 border-b px-6">
        <Store className="h-5 w-5 text-sidebar-primary" />
        <span className="font-semibold text-sidebar-primary">React Seller</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/dashboard'}
            className={({isActive}) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4">
        <Separator className="mb-4" />
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
