import {PageLayout} from '@/components/shared/PageLayout'
import {Link} from 'react-router-dom'
import {Button} from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="pt-4">
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}