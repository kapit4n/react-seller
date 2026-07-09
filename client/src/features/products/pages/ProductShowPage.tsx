import {useParams, Link, useNavigate} from 'react-router-dom'
import {ArrowLeft, Edit, Package, DollarSign, Hash, FileText} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {PageLayout} from '@/components/shared/PageLayout'
import {LoadingState} from '@/components/shared/LoadingState'
import {ErrorState} from '@/components/shared/ErrorState'
import {useProduct} from '../hooks/useProducts'

export default function ProductShowPage() {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()
  const {data: product, isLoading, error, refetch} = useProduct(Number(id))

  if (isLoading) return <PageLayout><LoadingState /></PageLayout>
  if (error) return <PageLayout><ErrorState message={(error as Error).message} onRetry={refetch} /></PageLayout>
  if (!product) return <PageLayout><ErrorState message="Product not found" /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.code}</p>
        </div>
        <Link to={`/dashboard/products/${product.id}/edit`}>
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" />Edit</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Product Image</CardTitle>
          </CardHeader>
          <CardContent>
            {product.img ? (
              <img src={product.img} alt={product.name} className="w-full max-w-xs rounded-lg object-cover" />
            ) : (
              <div className="flex h-48 w-full max-w-xs items-center justify-center rounded-lg bg-muted text-muted-foreground">
                No image
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'destructive'} className="mt-1">
                    {product.stock} units
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Code</p>
                  <p className="font-medium">{product.code}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {product.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
