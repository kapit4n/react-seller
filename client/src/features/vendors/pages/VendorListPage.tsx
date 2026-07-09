import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Eye, Pencil, Plus, Trash2, MapPin} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {DataTable, type Column} from '@/components/shared/DataTable'
import {PageHeader} from '@/components/shared/PageHeader'
import {PageLayout} from '@/components/shared/PageLayout'
import {ConfirmDialog} from '@/components/shared/ConfirmDialog'
import {useVendors, useDeleteVendor} from '../hooks/useVendors'
import type {Vendor} from '@/types'

export default function VendorListPage() {
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const {data, isLoading, error, refetch} = useVendors()
  const deleteMutation = useDeleteVendor()

  const columns: Column<Vendor>[] = [
    {key: 'name', header: 'Name', cell: (v) => <Link to={`/dashboard/vendors/${v.id}`} className="font-medium hover:underline">{v.name}</Link>},
    {key: 'address', header: 'Address', cell: (v) => <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" />{v.address}</span>},
    {key: 'actions', header: '', cell: (v) => (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/vendors/${v.id}`)}><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/vendors/${v.id}/edit`)}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => setDeleteId(v.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>
    )},
  ]

  return (
    <PageLayout>
      <PageHeader title="Vendors" description="Manage your vendors"
        actions={<Link to="/dashboard/vendors/new"><Button><Plus className="mr-2 h-4 w-4" />Add Vendor</Button></Link>}
      />
      <DataTable columns={columns} data={data} isLoading={isLoading} error={error as Error | null} onRetry={refetch} keyExtractor={(v) => v.id} onRowClick={(v) => navigate(`/dashboard/vendors/${v.id}`)} />
      <ConfirmDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)} title="Delete Vendor" description="Are you sure?" confirmLabel="Delete" onConfirm={() => { if (deleteId) deleteMutation.mutate(deleteId); setDeleteId(null) }} loading={deleteMutation.isPending} />
    </PageLayout>
  )
}
