import {useCallback, useState} from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({title, description, variant}: Omit<Toast, 'id'>) => {
    const id = genId()
    setToasts((prev) => [...prev, {id, title, description, variant}])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return {toasts, toast, dismiss}
}
