import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { ApiResponse, AdminOrderItem } from '@/types/admin'

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
    const limit = Number(searchParams.get('limit') ?? 5)

    const rows = await prisma.orders.findMany({
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        customers: {
          select: { name: true },
        },
      },
    })

    const total = await prisma.orders.count()

    const orders: AdminOrderItem[] = rows.map((row) => ({
      id: row.id,
      customer: row.customers?.name ?? 'ลูกค้าทั่วไป',
      date: row.date
        ? new Date(row.date).toLocaleDateString('th-TH')
        : '-',
      status: row.status ?? 'processing',
      total: Number(row.total_amount ?? 0),
    }))

    return NextResponse.json({ success: true, data: { orders, total } } as ApiResponse<{ orders: AdminOrderItem[]; total: number }>)
  } catch {
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' } as ApiResponse<never>, { status: 500 })
  }
}
