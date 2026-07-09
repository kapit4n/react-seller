import {Link} from 'react-router-dom'
import {FileSearch} from 'lucide-react'
import {Button} from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <FileSearch className="mx-auto h-16 w-16 text-muted-foreground/50" />
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
