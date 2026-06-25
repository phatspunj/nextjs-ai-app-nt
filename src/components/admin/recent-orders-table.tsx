'use client'

import { RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { AdminOrderItem } from '@/types/admin'

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  delivered: { label: 'จัดส่งแล้ว', variant: 'default' },
  received: { label: 'รับออเดอร์แล้ว', variant: 'secondary' },
  processing: { label: 'กำลังดำเนินการ', variant: 'outline' },
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(value)
}

interface RecentOrdersTableProps {
  orders: AdminOrderItem[]
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function RecentOrdersTable({ orders, isLoading, error, onRetry }: RecentOrdersTableProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-8">
        <p className="text-sm text-destructive">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive underline underline-offset-4 hover:text-destructive/80"
          >
            <RefreshCw className="size-3" />
            ลองใหม่
          </button>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card">
        <div className="px-6 py-4 border-b">
          <div className="h-5 w-40 animate-pulse rounded-sm bg-muted" />
        </div>
        <div className="space-y-3 p-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-md bg-muted" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card">
      <div className="px-6 py-4 border-b">
        <h3 className="font-medium text-sm">ออเดอร์ล่าสุด</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead>วันที่</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="text-right">ยอดรวม</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                ไม่มีออเดอร์
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
              const status = statusMap[order.status] ?? { label: order.status, variant: 'outline' as const }
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant} className="text-xs">
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(order.total)}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
