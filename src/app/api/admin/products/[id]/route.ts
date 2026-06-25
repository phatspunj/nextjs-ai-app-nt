import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { productSchema } from '@/lib/validations/product'
import type { ApiResponse, AdminProduct } from '@/types/admin'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionResp = await auth.api.getSession({
    headers: request.headers,
  })

  const role = (sessionResp?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' } as ApiResponse<never>, { status: 401 })
  }

  try {
    const { id } = await params
    const productId = Number(id)

    const existing = await prisma.products.findUnique({ where: { id: productId } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบสินค้า' } as ApiResponse<never>,
        { status: 404 }
      )
    }

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

    const product = await prisma.products.update({
      where: { id: productId },
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

    return NextResponse.json({ success: true, data } as ApiResponse<AdminProduct>)
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionResp = await auth.api.getSession({
    headers: request.headers,
  })

  const role = (sessionResp?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' } as ApiResponse<never>, { status: 401 })
  }

  try {
    const { id } = await params
    const productId = Number(id)

    const existing = await prisma.products.findUnique({ where: { id: productId } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบสินค้า' } as ApiResponse<never>,
        { status: 404 }
      )
    }

    const orderItemCount = await prisma.order_items.count({
      where: { product_id: productId },
    })
    if (orderItemCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `ไม่สามารถลบสินค้าได้ เนื่องจากมีรายการสั่งซื้อ ${orderItemCount} รายการที่เกี่ยวข้อง`,
        } as ApiResponse<never>,
        { status: 409 }
      )
    }

    await prisma.products.delete({ where: { id: productId } })

    return NextResponse.json({ success: true } as ApiResponse<never>)
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการลบข้อมูล' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}
