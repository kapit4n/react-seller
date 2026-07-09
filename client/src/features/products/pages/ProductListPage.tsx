import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Eye, Pencil, Plus, Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {DataTable, type Column} from '@/components/shared/DataTable'
import {PageHeader} from '@/components/shared/PageHeader'
import {PageLayout} from '@/components/shared/PageLayout'
import {SearchBar} from '@/components/shared/SearchBar'
import {ConfirmDialog} from '@/components/shared/ConfirmDialog'
import ProductImage from '@/components/shared/ProductImage'
import {useProducts, useDeleteProduct} from '../hooks/useProducts'
import type {Product} from '@/types'

export default function ProductListPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const filter = search ? {where: {or: [{name: {regexp: `/${search}/i`}}, {code: {regexp: `/${search}/i`}}]}} : undefined

  const {data, isLoading, error, refetch} = useProducts(filter)
  const deleteMutation = useDeleteProduct()

  const columns: Column<Product>[] = [
    {key: 'img', header: '', cell: (p) => <ProductImage src={p.img} alt={p.name} />},
    {key: 'name', header: 'Name', cell: (p) => <Link to={`/dashboard/products/${p.id}`} className="font-medium hover:underline">{p.name}</Link>},
    {key: 'code', header: 'Code', cell: (p) => <span className="text-muted-foreground">{p.code}</span>},
    {key: 'price', header: 'Price', cell: (p) => <span>${p.price.toFixed(2)}</span>},
    {key: 'stock', header: 'Stock', cell: (p) => (
      <Badge variant={p.stock > 10 ? 'success' : p.stock > 0 ? 'warning' : 'destructive'}>{p.stock}</Badge>
    )},
    {key: 'actions', header: '', cell: (p) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/products/${p.id}`)}><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/products/${p.id}/edit`)}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>
    )},
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Products"
        description="Manage your product inventory"
        actions={
          <Link to="/dashboard/products/new">
            <Button><Plus className="mr-2 h-4 w-4" />Add Product</Button>
          </Link>
        }
      />
      <div className="flex items-center gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
      </div>
      <DataTable columns={columns} data={data} isLoading={isLoading} error={error as Error | null} onRetry={refetch} keyExtractor={(p) => p.id} onRowClick={(p) => navigate(`/dashboard/products/${p.id}`)} />
      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) deleteMutation.mutate(deleteId)
          setDeleteId(null)
        }}
        loading={deleteMutation.isPending}
      />
    </PageLayout>
  )
}
