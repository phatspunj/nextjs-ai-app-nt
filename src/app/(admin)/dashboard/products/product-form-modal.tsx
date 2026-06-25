'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { productSchema, type ProductFormValues } from '@/lib/validations/product'
import type { AdminProduct, CategoryOption } from '@/types/admin'

interface ProductFormModalProps {
  open: boolean
  product: AdminProduct | null
  categories: CategoryOption[]
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

const defaultValues: ProductFormValues = {
  name: '',
  description: '',
  price: '' as unknown as number,
  categoryId: '',
}

export function ProductFormModal({
  open,
  product,
  categories,
  onOpenChange,
  onSaved,
}: ProductFormModalProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<ProductFormValues>({
    // @ts-expect-error zod v4 coerce type mismatch
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      if (product) {
        form.reset({
          name: product.name,
          description: product.description ?? '',
          price: product.price,
          categoryId: product.categoryId != null ? String(product.categoryId) : '',
        })
      } else {
        form.reset(defaultValues)
      }
    }
  }, [open, product, form])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await form.handleSubmit(async (data) => {
      setLoading(true)
      const parsed = productSchema.safeParse(data)
      if (!parsed.success) return

      const isEdit = !!product
      const url = isEdit
        ? `/api/admin/products/${product!.id}`
        : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'

      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        })
        const json = await res.json()

        if (!json.success) {
          toast.error(json.error ?? 'เกิดข้อผิดพลาด')
          return
        }

        toast.success(isEdit ? 'อัปเดตสินค้าสำเร็จ' : 'เพิ่มสินค้าสำเร็จ')
        onOpenChange(false)
        onSaved()
      } catch {
        toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ')
      } finally {
        setLoading(false)
      }
    })(e)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลสินค้าให้ครบถ้วน
          </DialogDescription>
        </DialogHeader>
        <form
          id="product-form"
          onSubmit={handleSubmit}
          className="py-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-form-name">ชื่อสินค้า</FieldLabel>
                  <Input
                    {...field}
                    id="product-form-name"
                    placeholder="ชื่อสินค้า"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-form-desc">
                    รายละเอียด
                  </FieldLabel>
                  <Input
                    {...field}
                    id="product-form-desc"
                    placeholder="รายละเอียดสินค้า (ไม่บังคับ)"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-form-price">ราคา</FieldLabel>
                  <Input
                    id="product-form-price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={field.value as number}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    disabled={field.disabled}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>หมวดหมู่</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            ยกเลิก
          </Button>
          <Button type="submit" form="product-form" disabled={loading}>
            {loading ? 'กำลังบันทึก...' : product ? 'บันทึก' : 'เพิ่มสินค้า'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
