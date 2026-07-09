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
import {useCustomer, useUpdateCustomer} from '../hooks/useCustomers'
import {customerSchema, type CustomerForm} from '../validation/customer'
import {useEffect} from 'react'

export default function CustomerEditPage() {
  const {id} = useParams<{id: string}>()
  const navigate = useNavigate()
  const {data: customer, isLoading, error} = useCustomer(Number(id))
  const mutation = useUpdateCustomer(Number(id))
  const {register, handleSubmit, reset, formState: {errors}} = useForm<CustomerForm>({resolver: zodResolver(customerSchema)})

  useEffect(() => { if (customer) reset(customer) }, [customer, reset])

  if (isLoading) return <PageLayout><LoadingState /></PageLayout>
  if (error) return <PageLayout><ErrorState message={(error as Error).message} /></PageLayout>
  if (!customer) return <PageLayout><ErrorState message="Customer not found" /></PageLayout>

  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/customers')}><ArrowLeft className="h-4 w-4" /></Button>
        <h1 className="text-2xl font-semibold">Edit Customer</h1>
      </div>
      <Card className="max-w-lg">
        <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register('address')} />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" type="number" step="0.01" {...register('budget')} />
              {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Saving...' : 'Save Changes'}</Button>
              <Button variant="outline" asChild><Link to="/dashboard/customers">Cancel</Link></Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
