import {useState} from 'react'
import {Package} from 'lucide-react'

interface Props {
  src?: string | null
  alt?: string
  className?: string
  iconClassName?: string
}

export default function ProductImage({src, alt = '', className = 'h-10 w-10 rounded object-cover', iconClassName = 'h-5 w-5'}: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <Package className={iconClassName} />
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}
