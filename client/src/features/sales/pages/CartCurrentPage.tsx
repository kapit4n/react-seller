import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ArrowLeft, Minus, Plus, ShoppingCart, Trash2, User} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {PageLayout} from '@/components/shared/PageLayout'
import {LoadingState} from '@/components/shared/LoadingState'
import {EmptyState} from '@/components/shared/EmptyState'
import {ErrorState} from '@/components/shared/ErrorState'
import {useUnassignedOrderDetails, useUpdateOrderDetail, useDeleteOrderDetail, useSubmitOrder} from '../hooks/useOrders'
import {useCustomers} from '@/features/customers/hooks/useCustomers'

export default function CartCurrentPage() {
  const navigate = useNavigate()
  const [customerId, setCustomerId] = useState<string>('')

  const {data: items, isLoading, error, refetch} = useUnassignedOrderDetails()
  const {data: customers} = useCustomers()
  const updateMutation = useUpdateOrderDetail()
  const deleteMutation = useDeleteOrderDetail()
  const submitMutation = useSubmitOrder()

  const total = items?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) ?? 0

  const handleQuantityChange = (id: number, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta)
    const item = items?.find((i) => i.id === id)
    if (item) {
      updateMutation.mutate({id, data: {quantity: newQty, totalPrice: item.price * newQty}})
    }
  }

  const handleSubmit = () => {
    if (!customerId || !items || items.length === 0) return
    submitMutation.mutate({
      customerId: Number(customerId),
      total,
      items: items.map((i) => ({id: i.id, productId: i.productId, quantity: i.quantity})),
    }, {
      onSuccess: () => navigate('/dashboard/sales'),
    })
  }

  if (isLoading) return <PageLayout><LoadingState /></PageLayout>
  if (error) return <PageLayout><ErrorState message={(error as Error).message} onRetry={refetch} /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/sales')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">Current Cart</h1>
          <p className="text-sm text-muted-foreground">{items?.length ?? 0} items — ${total.toFixed(2)} total</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader><CardTitle className="text-base">Cart Items</CardTitle></CardHeader>
          <CardContent>
            {!items || items.length === 0 ? (
              <EmptyState title="Cart is empty" description="Browse products and add items to your cart." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-32">Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.product?.name ?? `Product #${item.productId}`}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, item.quantity, -1)} disabled={item.quantity <= 1}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Customer</Label>
                <Select value={customerId} onValueChange={setCustomerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers?.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={!customerId || !items || items.length === 0 || submitMutation.isPending}
                onClick={handleSubmit}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {submitMutation.isPending ? 'Submitting...' : 'Submit Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
