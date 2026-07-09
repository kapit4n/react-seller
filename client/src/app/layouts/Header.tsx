import {Moon, ShoppingCart, Sun} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {useThemeStore} from '@/hooks/use-theme'
import {useAuthStore} from '@/hooks/use-auth'

export function Header() {
  const {theme, toggleTheme} = useThemeStore()
  const token = useAuthStore((s) => s.token)

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex-1" />
      <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      {token && (
        <Button variant="ghost" size="icon" aria-label="Cart">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      )}
    </header>
  )
}
