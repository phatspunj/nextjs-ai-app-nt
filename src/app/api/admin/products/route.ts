import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { productSchema } from '@/lib/validations/product'
import type { ApiResponse, AdminProduct } from '@/types/admin'

const PAGE_SIZE = 10

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
    const search = searchParams.get('search') ?? ''
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))

    const where = search
      ? { name: { contains: search } }
      : {}

    const [rows, total] = await Promise.all([
      prisma.products.findMany({
        where,
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          categories: {
            select: { id: true, name: true },
          },
        },
        orderBy: { id: 'desc' },
      }),
      prisma.products.count({ where }),
    ])

    const products: AdminProduct[] = rows.map((p) => ({
      id: p.id,
      name: p.name ?? '',
      description: p.description ?? null,
      price: Number(p.price ?? 0),
      categoryId: p.category_id,
      categoryName: p.categories?.name ?? 'ไม่มีหมวดหมู่',
    }))

    return NextResponse.json({
      success: true,
      data: { products, total, page, pageSize: PAGE_SIZE },
    } as ApiResponse<{ products: AdminProduct[]; total: number; page: number; pageSize: number }>)
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const sessionResp = await auth.api.getSession({
    headers: request.headers,
  })

  const role = (sessionResp?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' } as ApiResponse<never>, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = productSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.issues.map((e) => e.message).join(', ')
      return NextResponse.json(
        { success: false, error: message } as ApiResponse<never>,
        { status: 400 }
      )
    }

    const { name, description, price, categoryId } = parsed.data

    const product = await prisma.products.create({
      data: {
        name,
        description: description || null,
        price,
        category_id: Number(categoryId),
      },
      include: {
        categories: {
          select: { id: true, name: true },
        },
      },
    })

    const data: AdminProduct = {
      id: product.id,
      name: product.name ?? '',
      description: product.description ?? null,
      price: Number(product.price ?? 0),
      categoryId: product.category_id,
      categoryName: product.categories?.name ?? 'ไม่มีหมวดหมู่',
    }

    return NextResponse.json({ success: true, data } as ApiResponse<AdminProduct>, { status: 201 })
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}
