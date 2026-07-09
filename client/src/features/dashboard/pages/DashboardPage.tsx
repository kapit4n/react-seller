import {Box, DollarSign, ShoppingCart, Users} from 'lucide-react'
import {PageLayout} from '@/components/shared/PageLayout'
import {StatCard} from '@/components/shared/StatCard'
import {LoadingState} from '@/components/shared/LoadingState'
import {useProducts} from '@/features/products/hooks/useProducts'
import {useCustomers} from '@/features/customers/hooks/useCustomers'
import {useOrders} from '@/features/sales/hooks/useOrders'
import {useVendors} from '@/features/vendors/hooks/useVendors'
import {Link} from 'react-router-dom'
import {Button} from '@/components/ui/button'

export default function DashboardPage() {
  const {data: products, isLoading: pl} = useProducts()
  const {data: customers, isLoading: cl} = useCustomers()
  const {data: orders, isLoading: ol} = useOrders()
  const {data: vendors, isLoading: vl} = useVendors()

  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total ?? 0), 0) ?? 0

  if (pl || cl || ol || vl) return <PageLayout><LoadingState rows={2} /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your seller platform</p>
        </div>
        <Link to="/dashboard/sales/current">
          <Button><ShoppingCart className="mr-2 h-4 w-4" />Current Cart</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Products" value={products?.length ?? 0} icon={Box} description="Total products in inventory" />
        <StatCard title="Customers" value={customers?.length ?? 0} icon={Users} description="Registered customers" />
        <StatCard title="Orders" value={orders?.length ?? 0} icon={ShoppingCart} description="Total sales orders" />
        <StatCard title="Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} description="Total revenue" />
        <StatCard title="Vendors" value={vendors?.length ?? 0} icon={Users} description="Suppliers" />
      </div>
    </PageLayout>
  )
}
