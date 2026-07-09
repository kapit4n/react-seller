import {Search} from 'lucide-react'
import {Input} from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({value, onChange, placeholder = 'Search...'}: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-8 w-full md:w-[300px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
