import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate, Link} from 'react-router-dom'
import {ArrowLeft} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {PageLayout} from '@/components/shared/PageLayout'
import {useCreateVendor} from '../hooks/useVendors'
import {vendorSchema, type VendorForm} from '../validation/vendor'

export default function VendorAddPage() {
  const navigate = useNavigate()
  const mutation = useCreateVendor()
  const {register, handleSubmit, formState: {errors}} = useForm<VendorForm>({resolver: zodResolver(vendorSchema), defaultValues: {name: '', address: '', img: ''}})

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/vendors')}><ArrowLeft className="h-4 w-4" /></Button>
        <h1 className="text-2xl font-semibold">Add Vendor</h1>
      </div>
      <Card className="max-w-lg">
        <CardHeader><CardTitle>Vendor Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" {...register('name')} />{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="address">Address</Label><Input id="address" {...register('address')} />{errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}</div>
            <div className="flex gap-2">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Creating...' : 'Create Vendor'}</Button>
              <Button variant="outline" asChild><Link to="/dashboard/vendors">Cancel</Link></Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
