import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { ApiResponse, RevenuePoint } from '@/types/admin'

export async function GET(request: Request) {
  const sessionResp = await auth.api.getSession({
    headers: request.headers,
  })

  const role = (sessionResp?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' } as ApiResponse<never>, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') ?? '30d'

    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    startDate.setHours(0, 0, 0, 0)

    const orders = await prisma.orders.findMany({
      where: {
        date: { gte: startDate },
      },
      select: {
        date: true,
        total_amount: true,
      },
      orderBy: { date: 'asc' },
    })

    const grouped = new Map<string, { revenue: number; orders: number }>()
    for (let i = 0; i < days; i++) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + i)
      const key = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
      grouped.set(key, { revenue: 0, orders: 0 })
    }

    for (const order of orders) {
      if (!order.date) continue
      const d = new Date(order.date)
      const key = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`
      const entry = grouped.get(key)
      if (entry) {
        entry.revenue += Number(order.total_amount ?? 0)
        entry.orders += 1
      }
    }

    const data: RevenuePoint[] = Array.from(grouped.entries()).map(([date, val]) => ({
      date,
      revenue: Math.round(val.revenue * 100) / 100,
      orders: val.orders,
    }))

    return NextResponse.json({ success: true, data } as ApiResponse<RevenuePoint[]>)
  } catch {
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' } as ApiResponse<never>, { status: 500 })
  }
}
