import {useMemo} from 'react'
import {
  ShoppingCart, Users, TrendingUp, Package,
  ChevronRight, Search, RefreshCw, Bell, Sun, Moon, Sparkles,
  AlertTriangle, TrendingDown, Zap,
  ArrowUpRight, Wallet, Percent, HeartHandshake, Box
} from 'lucide-react'
import {StatCard} from '@/components/shared/StatCard'
import {ChartCard} from '@/components/ui/chart-card'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {DashboardSection} from '@/components/ui/dashboard-section'
import {Link} from 'react-router-dom'
import {useProducts} from '@/features/products/hooks/useProducts'
import {useCustomers} from '@/features/customers/hooks/useCustomers'
import {useOrders} from '@/features/sales/hooks/useOrders'
import {useVendors} from '@/features/vendors/hooks/useVendors'
import {useQuery} from '@tanstack/react-query'
import {ordersApi} from '@/features/sales/services/orders'
import {productsApi} from '@/features/products/services/products'
import {customersApi} from '@/features/customers/services/customers'
import {cn} from '@/lib/utils'

const useRevenueData = () => {
  return useQuery({
    queryKey: ['revenue'],
    queryFn: async () => {
      const orders = await ordersApi.list()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const now = new Date()
      const monthsToShow: string[] = []
      for (let i = 2; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        monthsToShow.push(months[d.getMonth()])
      }
      const revenueByMonth: Record<string, number> = {}
      monthsToShow.forEach(m => { revenueByMonth[m] = 0 })
      orders.forEach(order => {
        if (order.createdDate && order.total) {
          const d = new Date(order.createdDate)
          const ml = months[d.getMonth()]
          if (revenueByMonth[ml] !== undefined) revenueByMonth[ml] += order.total
        }
      })
      const data = monthsToShow.map(m => revenueByMonth[m])
      const total = data.reduce((a, b) => a + b, 0)
      const avg = data.length ? total / data.length : 0
      const growth = data.length >= 2 ? ((data[data.length - 1] - data[0]) / (data[0] || 1)) * 100 : 0
      return {labels: monthsToShow, data, total, avg, growth}
    },
  })
}

const useSalesData = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const [products, orders] = await Promise.all([productsApi.list(), ordersApi.listWithDetails()])
      const salesMap: Record<number, {name: string; quantity: number; revenue: number}> = {}
      products.forEach(p => { salesMap[p.id] = {name: p.name, quantity: 0, revenue: 0} })
      orders.forEach(order => {
        order.orderDetails?.forEach(d => {
          if (salesMap[d.productId]) {
            salesMap[d.productId].quantity += d.quantity
            salesMap[d.productId].revenue += d.totalPrice ?? d.price * d.quantity
          }
        })
      })
      const sorted = Object.values(salesMap).sort((a, b) => b.quantity - a.quantity)
      const maxQty = sorted[0]?.quantity || 1
      return sorted.slice(0, 6).map(p => ({...p, pct: (p.quantity / maxQty) * 100}))
    },
  })
}

const useRecentActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const [orders, customers, products] = await Promise.all([ordersApi.list(), customersApi.list(), productsApi.list()])
      type Item = {id: string; type: 'sale' | 'order' | 'product' | 'user'; message: string; description: string; timestamp: Date}
      const activities: Item[] = []
      orders.slice(0, 5).forEach(o => activities.push({
        id: `order-${o.id}`, type: 'order', message: `Order #${o.id}`, description: `$${o.total?.toFixed(2)} — Customer #${o.customerId}`,
        timestamp: new Date(o.createdDate || new Date()),
      }))
      customers.slice(0, 3).forEach(c => activities.push({
        id: `cust-${c.id}`, type: 'user', message: c.name, description: 'New customer registered',
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 2),
      }))
      products.slice(0, 3).forEach(p => activities.push({
        id: `prod-${p.id}`, type: 'product', message: p.name, description: 'New product added',
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 3),
      }))
      return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 8)
    },
  })
}

const useLowStockProducts = () => {
  return useQuery({
    queryKey: ['lowStock'],
    queryFn: async () => {
      const products = await productsApi.list()
      return products.filter(p => p.stock <= 5).map(p => ({
        id: p.id, name: p.name, currentStock: p.stock, minStock: 5, price: p.price,
      }))
    },
  })
}

const useTopProducts = () => {
  return useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      const [products, orders] = await Promise.all([productsApi.list(), ordersApi.listWithDetails()])
      const sm: Record<number, {id: number; name: string; price: number; image?: string; stock: number; quantity: number; revenue: number}> = {}
      products.forEach(p => { sm[p.id] = {id: p.id, name: p.name, price: p.price, image: p.img, stock: p.stock, quantity: 0, revenue: 0} })
      orders.forEach(order => {
        order.orderDetails?.forEach(d => {
          if (sm[d.productId]) {
            sm[d.productId].quantity += d.quantity
            sm[d.productId].revenue += d.totalPrice ?? d.price * d.quantity
          }
        })
      })
      return Object.values(sm).sort((a, b) => b.revenue - a.revenue).slice(0, 4)
    },
  })
}

const useDashboardMetrics = () => {
  const {data: products} = useProducts()
  const {data: customers} = useCustomers()
  const {data: orders} = useOrders()
  const {data: vendors} = useVendors()
  const totalRevenue = orders?.reduce((s, o) => s + (o.total ?? 0), 0) ?? 0
  const averageOrderValue = orders?.length ? totalRevenue / orders.length : 0
  const conversionRate = orders?.length && customers?.length ? Math.min(orders.length / customers.length, 1) : 0
  const lowStockCount = products?.filter(p => p.stock <= 5).length ?? 0
  const inventoryHealth = products?.length ? Math.max(0, 100 - (lowStockCount / products.length) * 100) : 0
  return {totalRevenue, averageOrderValue, conversionRate, products: products?.length ?? 0, customers: customers?.length ?? 0, orders: orders?.length ?? 0, vendors: vendors?.length ?? 0, lowStockCount, inventoryHealth}
}

const activityConfig = {
  sale: {bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', icon: TrendingUp},
  order: {bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800', icon: ShoppingCart},
  product: {bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800', icon: Package},
  user: {bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', icon: Users},
}

function SparklineBar({data, color}: {data: number[]; color: string}) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-[2px] h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className={cn('w-1.5 rounded-t-sm transition-all duration-500 animate-fade-in-up', color)}
          style={{height: `${(v / max) * 100}%`, animationDelay: `${i * 30}ms`}}
        />
      ))}
    </div>
  )
}

function ActivityIcon({type}: {type: string}) {
  const cfg = activityConfig[type as keyof typeof activityConfig] || activityConfig.order
  const Icon = cfg.icon
  return (
    <div className={cn('relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2', cfg.bg, cfg.text, cfg.border)}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

function BusinessHealthWidget({score, items}: {score: number; items: {label: string; value: number; max: number; color: string; icon: React.ReactNode}[]}) {
  const healthColor = score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'
  const healthText = score >= 80 ? 'Healthy' : score >= 50 ? 'Needs Attention' : 'Critical'
  return (
    <ChartCard title="Business Health" description="Overall performance score">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${score * 0.8726} 100`} strokeLinecap="round" className={healthColor} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn('text-xl font-bold', healthColor)}>{score}</span>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Business Health</p>
            <Badge variant={score >= 80 ? 'success' : score >= 50 ? 'warning' : 'destructive'} className="mt-1">{healthText}</Badge>
          </div>
        </div>
        <div className="space-y-2.5">
          {items.map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={cn('w-4 h-4 shrink-0', item.color)}>{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium truncate">{item.label}</span>
                  <span className="text-muted-foreground tabular-nums">{Math.round((item.value / item.max) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all duration-700', item.color)} style={{width: `${(item.value / item.max) * 100}%`}} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

const colorMap: Record<string, string> = {
  purple: 'from-purple-500 to-purple-600',
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
}

export default function DashboardPage() {
  const metrics = useDashboardMetrics()
  const revenueData = useRevenueData()
  const salesData = useSalesData()
  const recentActivities = useRecentActivities()
  const lowStockProducts = useLowStockProducts()
  const topProducts = useTopProducts()

  const isLoading = revenueData.isLoading || salesData.isLoading || recentActivities.isLoading || lowStockProducts.isLoading || topProducts.isLoading
  const hasError = revenueData.isError || salesData.isError || recentActivities.isError || lowStockProducts.isError || topProducts.isError

  const topProductTotal = useMemo(() => topProducts.data?.reduce((s, p) => s + p.revenue, 0) ?? 1, [topProducts.data])

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="skeleton-shimmer h-8 w-48 rounded-lg" />
            <div className="skeleton-shimmer h-4 w-72 rounded-lg" />
          </div>
          <div className="skeleton-shimmer h-10 w-36 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-8">
          {Array.from({length: 7}).map((_, i) => (
            <div key={i} className="skeleton-shimmer h-28 rounded-xl" style={{animationDelay: `${i * 50}ms`}} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({length: 3}).map((_, i) => (
            <div key={i} className="skeleton-shimmer h-72 rounded-xl" style={{animationDelay: `${i * 80}ms`}} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="skeleton-shimmer h-64 rounded-xl" style={{animationDelay: `${i * 100}ms`}} />
          ))}
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm text-muted-foreground mb-6">We couldn't load your dashboard data. Please try again.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const revenueChart = revenueData.data
  const maxRevenue = Math.max(...(revenueChart?.data || [0]), 1)
  const revGrowth = revenueChart?.growth ?? 0

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="h-9 w-56 rounded-lg border border-input bg-background pl-9 pr-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option>This Quarter</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg relative" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-1 ring-background" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" aria-label="Theme">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <div className="h-6 w-px bg-border mx-1" />
          <Link to="/dashboard/sales/current">
            <Button className="shadow-lg rounded-lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Current Cart
            </Button>
          </Link>
        </div>
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your seller platform.</p>
      </div>

      {/* KPI Cards with Trends */}
      <DashboardSection title="Key Metrics">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          <StatCard title="Total Revenue" value={`$${metrics.totalRevenue.toFixed(2)}`} icon={Wallet} description="Total sales revenue" trend={{value: Math.abs(revGrowth), positive: revGrowth >= 0}} sparkline={revenueChart?.data} accentColor="green" index={0} />
          <StatCard title="Avg Order Value" value={`$${metrics.averageOrderValue.toFixed(2)}`} icon={TrendingUp} description="Per transaction" trend={{value: 8.2, positive: true}} sparkline={[22, 28, 24, 32, 30, 35]} accentColor="blue" index={1} />
          <StatCard title="Conversion Rate" value={`${(metrics.conversionRate * 100).toFixed(1)}%`} icon={Percent} description="Customer conversion" trend={{value: 2.1, positive: true}} sparkline={[10, 12, 11, 14, 13, 15]} accentColor="purple" index={2} />
          <StatCard title="Total Products" value={metrics.products} icon={Package} description="Inventory count" trend={{value: 0, positive: true}} sparkline={[20, 20, 22, 22, 24, 25]} accentColor="orange" index={3} />
          <StatCard title="Active Customers" value={metrics.customers} icon={Users} description="Registered users" trend={{value: 5.3, positive: true}} sparkline={[4, 5, 5, 6, 7, 8]} accentColor="blue" index={4} />
          <StatCard title="Total Orders" value={metrics.orders} icon={ShoppingCart} description="Sales transactions" trend={{value: 15.1, positive: true}} sparkline={[8, 12, 10, 14, 13, 16]} accentColor="green" index={5} />
          <StatCard title="Suppliers" value={metrics.vendors} icon={Box} description="Vendor partners" trend={{value: 0, positive: true}} sparkline={[5, 5, 5, 5, 5, 5]} accentColor="orange" index={6} />
        </div>
      </DashboardSection>

      {/* Revenue Overview, Top Selling, AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <ChartCard title="Revenue Overview" description="Monthly revenue performance">
          <div className="space-y-4">
            {/* Mini summary */}
            <div className="grid grid-cols-3 gap-2">
              {revenueChart?.labels.map((label, i) => (
                <div key={label} className="text-center p-2 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-bold tabular-nums">${revenueChart.data[i].toFixed(0)}</p>
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div className="h-36 flex items-end justify-between gap-3 px-1">
              {revenueChart?.labels.map((label, index) => {
                const value = revenueChart.data[index]
                const hp = value ? (value / maxRevenue) * 100 : 0
                return (
                  <div key={label} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">${value?.toFixed(0)}</span>
                    <div className="relative w-full flex-1 flex items-end justify-center" style={{minHeight: '20px'}}>
                      <div
                        className="w-full rounded-t-md transition-all duration-700 ease-out animate-fade-in-up"
                        style={{
                          height: `${hp}%`,
                          background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.6) 100%)',
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                  </div>
                )
              })}
            </div>
            {/* Stats row */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold tabular-nums">${revenueChart?.total.toFixed(2) ?? '0'}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">Avg:</span>
                <span className="font-semibold tabular-nums">${(revenueChart?.avg ?? 0).toFixed(0)}</span>
              </div>
              <div className={cn('flex items-center gap-1 text-sm font-semibold', revGrowth >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                {revGrowth >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                <span className="tabular-nums">{Math.abs(revGrowth).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Top Selling Products */}
        <ChartCard title="Top Selling Products" description="Best performing items">
          <div className="space-y-3">
            {salesData.data?.map((product, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                <div className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
                  index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-orange-700' : 'bg-muted-foreground/40',
                )}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{product.quantity} sold</span>
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden max-w-20">
                      <div className="h-full rounded-full bg-primary/40 transition-all duration-500" style={{width: `${product.pct}%`}} />
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold tabular-nums shrink-0">${product.revenue.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* AI Assistant */}
        <Card className="overflow-hidden border-purple-200 dark:border-purple-800">
          <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 p-6 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg">AI Sales Assistant</p>
                  <p className="text-sm text-white/70">Powered by intelligent insights</p>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                {['Sell 2 Coca-Cola', 'Create new sale', "What's low in stock?", 'Generate report'].map((prompt, i) => (
                  <button
                    key={i}
                    className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm text-white/90 group"
                  >
                    <Zap className="h-3.5 w-3.5 text-purple-200 group-hover:text-white transition-colors" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
              <Link to="/dashboard/ai-assistant">
                <Button className="w-full bg-white text-purple-700 hover:bg-white/90 hover:scale-[1.02] transition-all shadow-lg rounded-lg h-10 font-semibold">
                  Open AI Assistant
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Recent Activity - Timeline */}
        <ChartCard title="Recent Activity" description="Latest platform activities">
          <div className="space-y-1">
            {recentActivities.data?.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">No recent activity</div>
            ) : (
              recentActivities.data?.map((activity, idx) => {
                const isLast = idx === (recentActivities.data?.length ?? 1) - 1
                return (
                  <div key={activity.id} className="relative flex gap-3 py-2 group">
                    {!isLast && <div className="absolute left-4 top-10 bottom-0 w-px bg-border group-last:hidden" />}
                    <ActivityIcon type={activity.type} />
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm font-medium truncate">{activity.message}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                        {activity.timestamp.toLocaleDateString()} {activity.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ChartCard>

        {/* Low Stock Alerts */}
        <ChartCard title="Stock Alerts" description="Products needing attention">
          {lowStockProducts.data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mb-3">
                <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">Inventory Healthy</p>
              <p className="text-xs text-muted-foreground mt-1">No products require attention</p>
              <Badge variant="success" className="mt-3">All Stock Levels Normal</Badge>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.data?.map(product => {
                const severity = product.currentStock <= 2 ? 'critical' : product.currentStock <= 3 ? 'low' : 'medium'
                const sevColor = severity === 'critical' ? 'destructive' : severity === 'low' ? 'warning' : 'outline'
                const sevLabel = severity === 'critical' ? 'CRITICAL' : severity === 'low' ? 'LOW' : 'MEDIUM'
                return (
                  <div key={product.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0',
                      severity === 'critical' ? 'bg-red-500' : severity === 'low' ? 'bg-orange-500' : 'bg-amber-500',
                    )}>
                      {product.currentStock}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-[10px] text-muted-foreground">Stock: {product.currentStock} / Min: {product.minStock}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={sevColor as any} className="text-[10px]">{sevLabel}</Badge>
                      <span className="text-xs font-semibold tabular-nums">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                )
              })}
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground mt-1">View All Inventory →</Button>
            </div>
          )}
        </ChartCard>

        {/* Business Health */}
        <BusinessHealthWidget
          score={Math.round((metrics.inventoryHealth + (metrics.orders > 0 ? 85 : 0) + (metrics.customers > 0 ? 75 : 0)) / 3)}
          items={[
            {label: 'Revenue', value: Math.min(metrics.totalRevenue, 1000), max: 1000, color: 'text-emerald-500', icon: <Wallet className="h-full w-full" />},
            {label: 'Inventory', value: metrics.inventoryHealth, max: 100, color: 'text-blue-500', icon: <Package className="h-full w-full" />},
            {label: 'Orders', value: Math.min(metrics.orders * 10, 100), max: 100, color: 'text-purple-500', icon: <ShoppingCart className="h-full w-full" />},
            {label: 'Customers', value: Math.min(metrics.customers * 15, 100), max: 100, color: 'text-amber-500', icon: <Users className="h-full w-full" />},
            {label: 'Low Stock', value: Math.max(0, 100 - metrics.lowStockCount * 20), max: 100, color: metrics.lowStockCount > 2 ? 'text-red-500' : 'text-emerald-500', icon: <AlertTriangle className="h-full w-full" />},
          ]}
        />

        {/* Quick Actions */}
        <ChartCard title="Quick Actions" description="Common tasks">
          <div className="grid grid-cols-2 gap-2">
            {[
              {label: 'New Sale', desc: 'Create a new sale', icon: ShoppingCart, color: 'from-purple-500 to-purple-600', action: () => window.open('/dashboard/sales/current', '_blank')},
              {label: 'Add Product', desc: 'Add to inventory', icon: Package, color: 'from-blue-500 to-blue-600', action: () => window.open('/dashboard/products/new', '_blank')},
              {label: 'Customers', desc: 'View customers', icon: Users, color: 'from-emerald-500 to-emerald-600', action: () => window.open('/dashboard/customers', '_blank')},
              {label: 'AI Assistant', desc: 'Get insights', icon: Sparkles, color: 'from-orange-500 to-orange-600', action: () => window.open('/dashboard/ai-assistant', '_blank')},
            ].map((action, i) => (
              <button
                key={i}
                onClick={action.action}
                className="group flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
              >
                <div className={cn('p-2 rounded-lg bg-gradient-to-br text-white shadow-sm transition-transform group-hover:scale-110', action.color)}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold">{action.label}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">{action.desc}</span>
              </button>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Top Products Section */}
      <DashboardSection
        title="Top Products"
        actions={<Link to="/dashboard/products"><Button variant="outline" size="sm">View All <ChevronRight className="ml-1 h-3 w-3" /></Button></Link>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {topProducts.data?.map((product, idx) => (
            <div key={product.id} className="group rounded-xl border border-border/50 bg-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up" style={{animationDelay: `${idx * 80}ms`}}>
              <div className="aspect-[4/3] relative overflow-hidden bg-muted/30">
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={product.stock <= 5 ? 'destructive' : 'success'} className="text-[10px]">
                    {product.stock} in stock
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-xs font-bold text-foreground">
                    {idx + 1}
                  </div>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-semibold truncate">{product.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold tabular-nums">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">{product.quantity} sold</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-semibold tabular-nums">${product.revenue.toFixed(0)}</span>
                </div>
                <div className="flex gap-1 pt-1">
                  <Button variant="ghost" size="sm" className="flex-1 h-7 text-[10px]" onClick={() => window.open(`/dashboard/products/${product.id}`, '_blank')}>View</Button>
                  <Button variant="ghost" size="sm" className="flex-1 h-7 text-[10px]" onClick={() => window.open(`/dashboard/products/${product.id}/edit`, '_blank')}>Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardSection>

      {/* Footer Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
        {[
          {label: 'Revenue', status: revGrowth >= 0 ? 'Increasing' : 'Decreasing', color: 'text-emerald-500', icon: TrendingUp},
          {label: 'Inventory', status: metrics.lowStockCount === 0 ? 'Healthy' : `${metrics.lowStockCount} low`, color: metrics.lowStockCount === 0 ? 'text-emerald-500' : 'text-amber-500', icon: Package},
          {label: 'Orders', status: metrics.orders > 0 ? 'On Track' : 'No orders', color: 'text-blue-500', icon: ShoppingCart},
          {label: 'Stock', status: metrics.lowStockCount > 0 ? `${metrics.lowStockCount} Warning` : 'All Good', color: metrics.lowStockCount > 0 ? 'text-red-500' : 'text-emerald-500', icon: AlertTriangle},
          {label: 'Health', status: `${Math.round((metrics.inventoryHealth + 75) / 2)}% Score`, color: 'text-purple-500', icon: HeartHandshake},
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 border border-border/50 animate-fade-in-up" style={{animationDelay: `${i * 60}ms`}}>
            <item.icon className={cn('h-4 w-4', item.color)} />
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
              <p className={cn('text-xs font-semibold', item.color)}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
