import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Eye, ShoppingCart, Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {DataTable, type Column} from '@/components/shared/DataTable'
import {PageHeader} from '@/components/shared/PageHeader'
import {PageLayout} from '@/components/shared/PageLayout'
import {ConfirmDialog} from '@/components/shared/ConfirmDialog'
import {useOrders, useSubmitOrder} from '../hooks/useOrders'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {ordersApi} from '../services/orders'
import type {Order} from '@/types'

export default function CartListPage() {
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const {data, isLoading, error, refetch} = useOrders()
  const qc = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ordersApi.delete(id),
    onSuccess: () => qc.invalidateQueries({queryKey: ['orders']}),
  })

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString() : '-'

  const columns: Column<Order>[] = [
    {key: 'id', header: 'Order', cell: (o) => <span className="font-medium">#{o.id}</span>},
    {key: 'customer', header: 'Customer', cell: (o) => o.customer?.name ?? `Customer #${o.customerId}`},
    {key: 'date', header: 'Date', cell: (o) => formatDate(o.createdDate)},
    {key: 'total', header: 'Total', cell: (o) => <span>${(o.total ?? 0).toFixed(2)}</span>},
    {key: 'status', header: 'Status', cell: (o) => (
      <div className="flex gap-1">
        <Badge variant={o.paid ? 'success' : 'warning'}>{o.paid ? 'Paid' : 'Pending'}</Badge>
        <Badge variant={o.delivered ? 'success' : 'secondary'}>{o.delivered ? 'Delivered' : 'Processing'}</Badge>
      </div>
    )},
    {key: 'actions', header: '', cell: (o) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/sales/${o.id}`)}><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => setDeleteId(o.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>
    )},
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Sales Orders"
        description="View and manage all orders"
        actions={
          <Link to="/dashboard/sales/current">
            <Button><ShoppingCart className="mr-2 h-4 w-4" />Current Cart</Button>
          </Link>
        }
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} error={error as Error | null} onRetry={refetch} keyExtractor={(o) => o.id} onRowClick={(o) => navigate(`/dashboard/sales/${o.id}`)} />
      <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Delete Order" description="Are you sure you want to delete this order?" confirmLabel="Delete" onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); setDeleteId(null) }} loading={deleteMutation.isPending} />
    </PageLayout>
  )
}
