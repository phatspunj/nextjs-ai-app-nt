'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { RevenuePoint } from '@/types/admin'

interface RevenueChartProps {
  data: RevenuePoint[]
  isLoading?: boolean
  period: string
}

const periodLabel: Record<string, string> = {
  '7d': '7 วันล่าสุด',
  '30d': '30 วันล่าสุด',
  '90d': '90 วันล่าสุด',
}

function formatRevenue(value: number) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function RevenueChart({ data, isLoading, period }: RevenueChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>รายได้ {periodLabel[period] ?? period}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    )
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>รายได้ {periodLabel[period] ?? period}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            ไม่มีข้อมูลรายได้ในช่วงนี้
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายได้ {periodLabel[period] ?? period}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground text-xs"
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="revenue"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground text-xs"
              tickFormatter={formatRevenue}
              width={80}
            />
            <YAxis
              yAxisId="orders"
              orientation="right"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground text-xs"
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--card))',
              }}
              formatter={(value, name) => {
                if (name === 'revenue') return [formatRevenue(Number(value ?? 0)), 'รายได้']
                return [value ?? 0, 'ออเดอร์']
              }}
            />
            <Legend />
            <Line
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              name="รายได้"
            />
            <Line
              yAxisId="orders"
              type="monotone"
              dataKey="orders"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              name="ออเดอร์"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
