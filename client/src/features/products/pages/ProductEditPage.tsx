import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {ArrowLeft} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {PageLayout} from '@/components/shared/PageLayout'
import {LoadingState} from '@/components/shared/LoadingState'
import {ErrorState} from '@/components/shared/ErrorState'
import {useProduct, useUpdateProduct} from '../hooks/useProducts'
import {productSchema, type ProductForm} from '../validation/product'
import {useEffect} from 'react'

export default function ProductEditPage() {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()
  const {data: product, isLoading, error} = useProduct(Number(id))
  const updateMutation = useUpdateProduct(Number(id))

  const {register, handleSubmit, reset, formState: {errors}} = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    if (product) reset(product)
  }, [product, reset])

  const onSubmit = (data: ProductForm) => updateMutation.mutate(data)

  if (isLoading) return <PageLayout><LoadingState /></PageLayout>
  if (error) return <PageLayout><ErrorState message={(error as Error).message} /></PageLayout>
  if (!product) return <PageLayout><ErrorState message="Product not found" /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input id="code" {...register('code')} />
                {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" step="0.01" {...register('price')} />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" {...register('stock')} />
                {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="img">Image URL</Label>
              <Input id="img" {...register('img')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea id="description" className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" {...register('description')} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/products">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
