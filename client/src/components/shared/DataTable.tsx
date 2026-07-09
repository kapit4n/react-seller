import type {ReactNode} from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {LoadingState} from './LoadingState'
import {EmptyState} from './EmptyState'
import {ErrorState} from './ErrorState'

export interface Column<T> {
  key: string
  header: string
  cell: (item: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[] | undefined
  isLoading: boolean
  error?: Error | null
  onRetry?: () => void
  keyExtractor: (item: T) => string | number
  onRowClick?: (item: T) => void
}

export function DataTable<T>({columns, data, isLoading, error, onRetry, keyExtractor, onRowClick}: DataTableProps<T>) {
  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error.message} onRetry={onRetry} />
  if (!data || data.length === 0) return <EmptyState />

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={keyExtractor(item)}
              className={onRowClick ? 'cursor-pointer' : ''}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((col) => (
                <TableCell key={col.key} className={col.className}>{col.cell(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
