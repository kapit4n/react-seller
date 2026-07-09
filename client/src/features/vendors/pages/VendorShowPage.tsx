import {useParams, Link, useNavigate} from 'react-router-dom'
import {ArrowLeft, Edit, MapPin} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {PageLayout} from '@/components/shared/PageLayout'
import {LoadingState} from '@/components/shared/LoadingState'
import {ErrorState} from '@/components/shared/ErrorState'
import {useVendor} from '../hooks/useVendors'

export default function VendorShowPage() {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()
  const {data: vendor, isLoading, error, refetch} = useVendor(Number(id))

  if (isLoading) return <PageLayout><LoadingState /></PageLayout>
  if (error) return <PageLayout><ErrorState message={(error as Error).message} onRetry={refetch} /></PageLayout>
  if (!vendor) return <PageLayout><ErrorState message="Vendor not found" /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/vendors')}><ArrowLeft className="h-4 w-4" /></Button>
        <div className="flex-1"><h1 className="text-2xl font-semibold">{vendor.name}</h1></div>
        <Link to={`/dashboard/vendors/${vendor.id}/edit`}><Button variant="outline"><Edit className="mr-2 h-4 w-4" />Edit</Button></Link>
      </div>
      <Card className="max-w-lg">
        <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div><p className="text-sm text-muted-foreground">Address</p><p className="font-medium">{vendor.address}</p></div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
