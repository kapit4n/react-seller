import React, {useState} from 'react'
import {Package} from 'lucide-react'
import {cn} from '@/lib/utils'

interface ProductImageProps {
  src?: string
  alt?: string
  className?: string
  fallbackIcon?: React.ReactNode
}

export default function ProductImage({
  src,
  alt = 'Product image',
  className,
  fallbackIcon,
}: ProductImageProps) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted/50 rounded-md',
          className
        )}
      >
        {fallbackIcon || (
          <div className="p-4 rounded-md bg-muted/50">
            <Package className="h-8 w-8 text-muted-foreground/50" />
          </div>
        )}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('rounded-md object-cover', className)}
      onError={() => setError(true)}
    />
  )
}