'use client'

import { useState, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Loader2,
  Send,
} from 'lucide-react'
import { contactSchema, type ContactFormValues } from '@/lib/validations/contact'

const inputBase = [
  'w-full h-10 rounded-lg border border-[#D6D3D1] bg-[#F5F5F4]',
  'px-3 py-2 text-base text-[#1C1917] placeholder:text-[#78716C]',
  'outline-none transition-all duration-150',
  'focus:border-[#C2410C] focus:ring focus:ring-[#C2410C]/[0.12]',
  'aria-invalid:border-[#DC2626] aria-invalid:ring aria-invalid:ring-[#DC2626]/[0.12]',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

const textareaBase = [
  'w-full min-h-[120px] rounded-lg border border-[#D6D3D1] bg-[#F5F5F4]',
  'px-3 py-2 text-base text-[#1C1917] placeholder:text-[#78716C]',
  'outline-none transition-all duration-150 resize-y',
  'focus:border-[#C2410C] focus:ring focus:ring-[#C2410C]/[0.12]',
  'aria-invalid:border-[#DC2626] aria-invalid:ring aria-invalid:ring-[#DC2626]/[0.12]',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const json = await res.json()

        if (!json.success) {
          toast.error(json.error ?? 'เกิดข้อผิดพลาด')
          return
        }

        form.reset()
        setIsSuccess(true)
      } catch {
        toast.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้')
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-6 py-12">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#16A34A]/[0.12]"
          style={{ boxShadow: '0 0 20px rgba(22,163,74,0.15)' }}>
          <CheckCircle className="size-10 text-[#16A34A]" />
        </div>
        <h2
          className="text-[28px] font-semibold text-[#1C1917] leading-tight tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ส่งข้อความเรียบร้อยแล้ว
        </h2>
        <p
          className="text-base text-[#57534E] leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center justify-center rounded-lg border border-[#D6D3D1] bg-transparent h-10 px-4 text-sm font-semibold text-[#57534E] transition-all duration-150 hover:bg-[#E7E5E4]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ส่งข้อความอีกครั้ง
        </button>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6 md:gap-8 lg:gap-12"
      style={{ fontFamily: 'var(--font-body)' }}
    >

      {/* ── Left Column: Contact Info ── */}
      <div className="flex flex-col gap-6">
        <div>
          <h2
            className="text-[28px] font-semibold text-[#1C1917] mb-2 leading-tight tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ติดต่อเรา
          </h2>
          <p className="text-base text-[#57534E] leading-relaxed">
            มีคำถามหรือข้อสงสัย? ส่งข้อความหาเราได้เลย
          </p>
        </div>

        <div
          className="rounded-xl border border-[#D6D3D1] bg-[#F5F5F4] p-4 flex flex-col gap-5"
          style={{ boxShadow: '0 4px 16px rgba(28,25,23,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/[0.12]">
              <Mail className="size-5 text-[#C2410C]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">Email</p>
              <p className="text-sm text-[#57534E]">contact@example.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/[0.12]">
              <Phone className="size-5 text-[#C2410C]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">เบอร์โทร</p>
              <p className="text-sm text-[#57534E]">02-XXX-XXXX</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/[0.12]">
              <Clock className="size-5 text-[#C2410C]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1C1917]">เวลาทำการ</p>
              <p className="text-sm text-[#57534E]">จันทร์ - ศุกร์ 09:00 - 18:00 น.</p>
            </div>
          </div>
        </div>

        <hr className="border-[#D6D3D1]" />

        <p className="text-sm text-[#57534E] leading-relaxed">
          ทีมงานของเราพร้อมให้ความช่วยเหลือและตอบทุกข้อสงสัยของคุณ
          ไม่ว่าจะเป็นเรื่องสินค้า บริการ หรือข้อเสนอแนะต่าง ๆ
        </p>
      </div>

      {/* ── Right Column: Form ── */}
      <div>
        <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-semibold text-[#1C1917]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  ชื่อ
                </label>
                <input
                  {...field}
                  id="contact-name"
                  placeholder="กรอกชื่อของคุณ"
                  aria-invalid={fieldState.invalid}
                  className={inputBase}
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <p className="text-xs text-[#DC2626] mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-semibold text-[#1C1917]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Email
                </label>
                <input
                  {...field}
                  id="contact-email"
                  type="email"
                  placeholder="example@email.com"
                  aria-invalid={fieldState.invalid}
                  className={inputBase}
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <p className="text-xs text-[#DC2626] mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-[#1C1917]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  ข้อความ
                </label>
                <textarea
                  {...field}
                  id="contact-message"
                  rows={5}
                  placeholder="พิมพ์ข้อความที่ต้องการ..."
                  aria-invalid={fieldState.invalid}
                  className={textareaBase}
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <p className="text-xs text-[#DC2626] mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </form>

        <button
          type="submit"
          form="contact-form"
          disabled={isPending}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-[#C2410C] h-10 px-4 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#9A3412] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontFamily: 'var(--font-body)',
            boxShadow: isPending ? 'none' : '0 4px 12px rgba(194,65,12,0.25)',
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              กำลังส่ง...
            </>
          ) : (
            <>
              <Send className="size-4" />
              ส่งข้อความ
            </>
          )}
        </button>
      </div>
    </div>
  )
}
