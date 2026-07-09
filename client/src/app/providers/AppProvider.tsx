import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Suspense, useEffect, type ReactNode} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ToastProvider, ToastViewport} from '@/components/ui/toast'
import {useThemeStore} from '@/hooks/use-theme'
import {AppRouter} from '@/app/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

function ThemeProvider({children}: {children: ReactNode}) {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export function AppProvider() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
          <ToastViewport />
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
