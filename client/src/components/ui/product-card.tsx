import {Card, CardContent, CardFooter} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import ProductImage from '@/components/shared/ProductImage'
import {cn} from '@/lib/utils'

interface Product {
  id: number
  name: string
  price: number
  image?: string
  stock?: number
  vendor?: string
  description?: string
}

interface ProductCardProps {
  product: Product
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onAddToCart?: (id: number) => void
  showStock?: boolean
  className?: string
}

export function ProductCard({
  product,
  onView,
  onEdit,
  onDelete,
  onAddToCart,
  showStock = false,
  className,
}: ProductCardProps) {
  return (
    <Card className={cn('hover-lift overflow-hidden', className)}>
      <div className="aspect-square relative overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock !== undefined && showStock && (
          <div className="absolute top-2 right-2">
            <span className={cn('px-2 py-1 rounded-full text-xs font-medium', product.stock <= 5 ? 'bg-error/10 text-error' : 'bg-success/10 text-success')}>{product.stock} in stock</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        {product.vendor && <p className="text-sm text-muted-foreground">{product.vendor}</p>}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          {product.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          )}
        </div>
      </CardContent>
      {(onView || onEdit || onDelete || onAddToCart) && (
        <CardFooter className="p-4 pt-0 gap-2">
          {onView && (
            <Button variant="outline" className="flex-1" onClick={() => onView(product.id)}>
              View
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" className="flex-1" onClick={() => onEdit(product.id)}>
              Edit
            </Button>
          )}
          {onAddToCart && (
            <Button className="flex-1 bg-primary hover:bg-primary-hover" onClick={() => onAddToCart(product.id)}>
              Add to Cart
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}