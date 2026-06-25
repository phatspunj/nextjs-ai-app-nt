import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import type { ApiResponse, CategoryOption } from '@/types/admin'

export async function GET(request: Request) {
  const sessionResp = await auth.api.getSession({
    headers: request.headers,
  })

  const role = (sessionResp?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' } as ApiResponse<never>, { status: 403 })
  }

  try {
    const categories = await prisma.categories.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    })

    const data: CategoryOption[] = categories.map((c) => ({
      id: c.id,
      name: c.name ?? '',
    }))

    return NextResponse.json({ success: true, data } as ApiResponse<CategoryOption[]>)
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}
