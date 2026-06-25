import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { ApiResponse, AdminStats } from '@/types/admin'

export async function GET(request: Request) {
  const sessionResp = await auth.api.getSession({
    headers: request.headers,
  })

  const role = (sessionResp?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' } as ApiResponse<never>, { status: 403 })
  }

  try {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const [todayOrdersResult, pendingOrders, totalProducts, totalUsers] = await Promise.all([
      prisma.orders.aggregate({
        where: {
          date: { gte: todayStart, lte: todayEnd },
        },
        _sum: { total_amount: true },
        _count: true,
      }),
      prisma.orders.count({
        where: {
          status: { in: ['processing', 'received'] },
        },
      }),
      prisma.products.count(),
      prisma.user.count(),
    ])

    const stats: AdminStats = {
      todaySales: Number(todayOrdersResult._sum.total_amount ?? 0),
      todayOrders: todayOrdersResult._count,
      pendingOrders,
      totalProducts,
      totalUsers,
    }

    return NextResponse.json({ success: true, data: stats } as ApiResponse<AdminStats>)
  } catch {
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' } as ApiResponse<never>, { status: 500 })
  }
}
