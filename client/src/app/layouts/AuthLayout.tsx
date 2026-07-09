import {Outlet} from 'react-router-dom'
import {Store} from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg bg-primary p-2 text-primary-foreground">
            <Store className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold">React Seller</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
