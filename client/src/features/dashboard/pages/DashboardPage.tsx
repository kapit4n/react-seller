import {useState, useMemo} from 'react'
import {Box, DollarSign, ShoppingCart, Users, TrendingUp, AlertTriangle, Package, Activity, ChevronRight, Star} from 'lucide-react'
import {StatCard} from '@/components/shared/StatCard'
import {ChartCard} from '@/components/ui/chart-card'
import {QuickActionCard} from '@/components/ui/quick-action-card'
import {ActivityTimeline} from '@/components/ui/activity-timeline'
import {LowStockCard} from '@/components/ui/low-stock-card'
import {ProductCard} from '@/components/ui/product-card'
import {LoadingState} from '@/components/shared/LoadingState'
import {ErrorState} from '@/components/shared/ErrorState'
import {KPIGrid} from '@/components/ui/kpi-grid'
import {DashboardSection} from '@/components/ui/dashboard-section'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {Link} from 'react-router-dom'
import {useProducts} from '@/features/products/hooks/useProducts'
import {useCustomers} from '@/features/customers/hooks/useCustomers'
import {useOrders} from '@/features/sales/hooks/useOrders'
import {useVendors} from '@/features/vendors/hooks/useVendors'
import {useQuery} from '@tanstack/react-query'
import {ordersApi} from '@/features/sales/services/orders'
import {productsApi} from '@/features/products/services/products'
import {customersApi} from '@/features/customers/services/customers'
import {vendorsApi} from '@/features/vendors/services/vendors'
import {Badge} from '@/components/ui/badge'

// Mock data hooks for charts
const useRevenueData = () => {
  return useQuery({
    queryKey: ['revenue'],
    queryFn: async () => {
      const orders = await ordersApi.list()
      const revenueByMonth = {}
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      
      // Generate mock revenue data
      for (let i = 0; i < 6; i++) {
        const month = months[months.length - 1 - i]
        const total = Math.floor(Math.random() * 50000) + 20000
        revenueByMonth[month] = total
      }
      
      return {labels: months.reverse(), data: Object.values(revenueByMonth).reverse()}
    },
  })
}

const useSalesData = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      const products = await productsApi.list()
      return products.slice(0, 6).map(p => ({
        name: p.name,
        sales: Math.floor(Math.random() * 100) + 20,
        revenue: p.price * (Math.floor(Math.random() * 50) + 10),
      }))
    },
  })
}

const useRecentActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const [orders, customers, products] = await Promise.all([
        ordersApi.list(),
        customersApi.list(),
        productsApi.list(),
      ])
      
      const activities: ActivityItem[] = []
      
      // Recent orders
      orders.slice(0, 5).forEach(order => {
        activities.push({
          id: `order-${order.id}`,
          type: 'order' as const,
          message: `Order #${order.id} placed by Customer #${order.customerId}`,
          timestamp: new Date(order.createdDate || new Date()),
          icon: <ShoppingCart className="h-4 w-4" />, 
        })
      })
      
      // New customers
      customers.slice(0, 3).forEach(customer => {
        activities.push({
          id: `customer-${customer.id}`,
          type: 'user' as const,
          message: `New customer registered: ${customer.name}`,
          timestamp: new Date(new Date().getTime() - Math.random() * 86400000 * 2),
          icon: <Users className="h-4 w-4" />,
        })
      })
      
      // New products
      products.slice(0, 3).forEach(product => {
        activities.push({
          id: `product-${product.id}`,
          type: 'product' as const,
          message: `New product added: ${product.name}`,
          timestamp: new Date(new Date().getTime() - Math.random() * 86400000 * 3),
          icon: <Package className="h-4 w-4" />,
        })
      })
      
      return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10)
    },
  })
}

const useLowStockProducts = () => {
  return useQuery({
    queryKey: ['lowStock'],
    queryFn: async () => {
      const products = await productsApi.list()
      return products.filter(p => p.stock <= 5).map(p => ({
        id: p.id,
        name: p.name,
        currentStock: p.stock,
        minStock: Math.max(1, Math.floor(p.stock * 0.5)),
        price: p.price,
        vendor: 'Main Vendor',
      }))
    },
  })
}

const useTopProducts = () => {
  return useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      const products = await productsApi.list()
      const salesData = products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.img,
        stock: p.stock,
        sales: Math.floor(Math.random() * 100) + 50,
        revenue: p.price * (Math.floor(Math.random() * 100) + 200),
      }))
      return salesData.sort((a, b) => b.sales - a.sales).slice(0, 4)
    },
  })
}

const useDashboardMetrics = () => {
  const {data: products} = useProducts()
  const {data: customers} = useCustomers()
  const {data: orders} = useOrders()
  const {data: vendors} = useVendors()
  
  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total ?? 0), 0) ?? 0
  const averageOrderValue = orders?.length ? totalRevenue / orders.length : 0
  const conversionRate = customers?.length ? Math.random() * 0.3 + 0.1 : 0
  
  return {
    totalRevenue,
    averageOrderValue,
    conversionRate,
    products: products?.length ?? 0,
    customers: customers?.length ?? 0,
    orders: orders?.length ?? 0,
    vendors: vendors?.length ?? 0,
  }
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
  
  if (isLoading) return <LoadingState rows={4} />
  if (hasError) return <ErrorState onRetry={() => window.location.reload()} />
  
  const quickActions = [
    {
      label: 'New Sale',
      icon: <ShoppingCart className="h-5 w-5" />, 
      action: () => window.open('/dashboard/sales/current', '_blank'),
      variant: 'default' as const,
    },
    {
      label: 'Add Product',
      icon: <Package className="h-5 w-5" />,
      action: () => window.open('/dashboard/products/new', '_blank'),
      variant: 'secondary' as const,
    },
    {
      label: 'View Customers',
      icon: <Users className="h-5 w-5" />,
      action: () => window.open('/dashboard/customers', '_blank'),
      variant: 'outline' as const,
    },
    {
      label: 'AI Assistant',
      icon: <Activity className="h-5 w-5" />,
      action: () => window.open('/dashboard/ai-assistant', '_blank'),
      variant: 'default' as const,
    },
  ]
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your seller platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/sales/current">
            <Button className="shadow-lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Current Cart
            </Button>
          </Link>
        </div>
      </div>
      
      {/* KPI Cards */}
      <DashboardSection title="Key Metrics" className="mb-8">
        <KPIGrid>
          <StatCard
            title="Total Revenue"
            value={`$${metrics.totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            description="Total sales revenue"
          />
          <StatCard
            title="Average Order Value"
            value={`$${metrics.averageOrderValue.toFixed(2)}`}
            icon={TrendingUp}
            description="Average per transaction"
          />
          <StatCard
            title="Conversion Rate"
            value={`${(metrics.conversionRate * 100).toFixed(1)}%`}
            icon={TrendingUp}
            description="Customer conversion"
          />
          <StatCard
            title="Total Products"
            value={metrics.products}
            icon={Package}
            description="Inventory count"
          />
          <StatCard
            title="Active Customers"
            value={metrics.customers}
            icon={Users}
            description="Registered users"
          />
          <StatCard
            title="Total Orders"
            value={metrics.orders}
            icon={ShoppingCart}
            description="Sales transactions"
          />
          <StatCard
            title="Suppliers"
            value={metrics.vendors}
            icon={Box}
            description="Vendor partners"
          />
        </KPIGrid>
      </DashboardSection>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Revenue Overview"
          description="Monthly revenue performance"
        >
          <div className="h-64 flex items-end justify-between gap-2">
            {revenueData.data?.labels.map((label, index) => {
              const value = revenueData.data?.data[index]
              const maxValue = Math.max(...(revenueData.data?.data || [0]))
              const heightPercentage = value ? (value / maxValue) * 100 : 0
              
              return (
                <div key={label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full">
                    <div
                      className="bg-primary/20 rounded-t-md transition-all duration-500"
                      style={{height: `${heightPercentage}%`}}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs font-medium">${value?.toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        </ChartCard>
        
        <ChartCard
          title="Top Selling Products"
          description="Best performing items this month"
        >
          <div className="space-y-4">
            {salesData.data?.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">${product.revenue.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="xl:col-span-1">
          <ActivityTimeline
            title="Recent Activity"
            description="Latest platform activities"
            activities={recentActivities.data || []}
            limit={8}
          />
        </div>
        
        {/* Low Stock Alert */}
        <div className="xl:col-span-1">
          <LowStockCard
            products={lowStockProducts.data || []}
          />
        </div>
        
        {/* Quick Actions */}
        <div className="xl:col-span-1">
          <QuickActionCard
            title="Quick Actions"
            description="Common tasks and shortcuts"
            actions={quickActions}
          />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Products */}
        <DashboardSection 
          title="Top Products" 
          actions={<Link to="/dashboard/products"><Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button></Link>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topProducts.data?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(id) => window.open(`/dashboard/products/${id}`, '_blank')}
                onEdit={(id) => window.open(`/dashboard/products/${id}/edit`, '_blank')}
                showStock
              />
            ))}
          </div>
        </DashboardSection>
        
        {/* AI Assistant Card */}
        <DashboardSection title="AI Assistant" description="Let me help you optimize your sales">
          <div className="flex flex-col h-full p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">AI Sales Assistant</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">Let me help you optimize your sales</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>Search products and check inventory</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>Create personalized sales proposals</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span>Manage cart with natural language</span>
              </div>
            </div>
            <Link to="/dashboard/ai-assistant">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Start Conversation
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </DashboardSection>
      </div>
    </div>
  )
}