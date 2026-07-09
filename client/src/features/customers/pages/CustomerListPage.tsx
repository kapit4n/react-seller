import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Eye, Pencil, Plus, Trash2, DollarSign, MapPin} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {DataTable, type Column} from '@/components/shared/DataTable'
import {PageHeader} from '@/components/shared/PageHeader'
import {PageLayout} from '@/components/shared/PageLayout'
import {ConfirmDialog} from '@/components/shared/ConfirmDialog'
import {useCustomers, useDeleteCustomer} from '../hooks/useCustomers'
import type {Customer} from '@/types'

export default function CustomerListPage() {
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const {data, isLoading, error, refetch} = useCustomers()
  const deleteMutation = useDeleteCustomer()

  const columns: Column<Customer>[] = [
    {key: 'name', header: 'Name', cell: (c) => <Link to={`/dashboard/customers/${c.id}`} className="font-medium hover:underline">{c.name}</Link>},
    {key: 'address', header: 'Address', cell: (c) => <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" />{c.address}</span>},
    {key: 'budget', header: 'Budget', cell: (c) => <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{c.budget.toFixed(2)}</span>},
    {key: 'actions', header: '', cell: (c) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/customers/${c.id}`)}><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/customers/${c.id}/edit`)}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => setDeleteId(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>
    )},
  ]

  return (
    <PageLayout>
      <PageHeader title="Customers" description="Manage your customers"
        actions={<Link to="/dashboard/customers/new"><Button><Plus className="mr-2 h-4 w-4" />Add Customer</Button></Link>}
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} error={error as Error | null} onRetry={refetch} keyExtractor={(c) => c.id} onRowClick={(c) => navigate(`/dashboard/customers/${c.id}`)} />
      <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Delete Customer" description="Are you sure?" confirmLabel="Delete" onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); setDeleteId(null) }} loading={deleteMutation.isPending} />
    </PageLayout>
  )
}
