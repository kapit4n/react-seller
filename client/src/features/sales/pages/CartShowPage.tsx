import {useParams, useNavigate} from 'react-router-dom'
import {ArrowLeft} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {PageLayout} from '@/components/shared/PageLayout'
import {LoadingState} from '@/components/shared/LoadingState'
import {ErrorState} from '@/components/shared/ErrorState'
import {useOrder, useOrderDetailsByOrder} from '../hooks/useOrders'

export default function CartShowPage() {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()
  const {data: order, isLoading: orderLoading, error: orderError} = useOrder(Number(id))
  const {data: details, isLoading: detailsLoading} = useOrderDetailsByOrder(Number(id))

  if (orderLoading || detailsLoading) return <PageLayout><LoadingState /></PageLayout>
  if (orderError) return <PageLayout><ErrorState message={(orderError as Error).message} /></PageLayout>
  if (!order) return <PageLayout><ErrorState message="Order not found" /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/sales')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Order #{order.id}</h1>
          <p className="text-sm text-muted-foreground">
            {order.customer?.name ?? `Customer #${order.customerId}`} — {order.createdDate ? new Date(order.createdDate).toLocaleDateString() : '-'}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={order.paid ? 'success' : 'warning'}>{order.paid ? 'Paid' : 'Pending'}</Badge>
          <Badge variant={order.delivered ? 'success' : 'secondary'}>{order.delivered ? 'Delivered' : 'Processing'}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Order Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span>{order.customer?.name ?? `#${order.customerId}`}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{order.createdDate ? new Date(order.createdDate).toLocaleDateString() : '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : '-'}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-semibold">${(order.total ?? 0).toFixed(2)}</span></div>
            {order.description && <div className="flex justify-between"><span className="text-muted-foreground">Notes</span><span>{order.description}</span></div>}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="text-base">Line Items</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product?.name ?? `Product #${item.productId}`}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.discount ? `${item.discount}%` : '-'}</TableCell>
                  <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {(!details || details.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No items</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4 text-sm font-semibold">
            Total: ${(order.total ?? 0).toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
