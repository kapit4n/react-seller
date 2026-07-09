import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {AlertTriangle, Package} from 'lucide-react'
import {cn} from '@/lib/utils'

interface ProductStock {
  id: number
  name: string
  currentStock: number
  minStock: number
  price: number
  vendor?: string
}

interface LowStockCardProps {
  title?: string
  products: ProductStock[]
  className?: string
}

export function LowStockCard({title = 'Low Stock Alert', products, className}: LowStockCardProps) {
  const lowStockProducts = products.filter((p) => p.currentStock <= p.minStock)
  
  if (lowStockProducts.length === 0) {
    return (
      <Card className={cn('hover-lift bg-success-subtle/30 border-success/20', className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-success/10 p-2 text-success">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-success">All Good!</h3>
                <p className="text-sm text-muted-foreground">No products are running low on stock</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              All Stock Levels Normal
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={cn('hover-lift bg-warning-subtle/30 border-warning/20', className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-warning/10 p-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-warning">Low Stock Alert</h3>
                <p className="text-sm text-muted-foreground">
                  {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} need{lowStockProducts.length !== 1 ? '' : 's'} attention
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
              {lowStockProducts.length} items
            </Badge>
          </div>
          
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-lg bg-background p-3 border border-warning/10">
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Stock: {product.currentStock} / Min: {product.minStock} 
                    {product.vendor && `| Vendor: ${product.vendor}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                  <Badge variant="outline" className="text-xs border-warning/30 text-warning">
                    Reorder needed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}