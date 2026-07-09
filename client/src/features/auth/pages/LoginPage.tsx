import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNavigate} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {useAuthStore} from '@/hooks/use-auth'
import {loginSchema, type LoginForm} from '../validation/login'

export default function LoginPage() {
  const navigate = useNavigate()
  const setToken = useAuthStore((s) => s.setToken)

  const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginForm) => {
    setToken(data.token)
    navigate('/dashboard')
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your access token to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Access Token</Label>
            <Input id="token" placeholder="Paste your access token" {...register('token')} />
            {errors.token && <p className="text-sm text-destructive">{errors.token.message}</p>}
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
