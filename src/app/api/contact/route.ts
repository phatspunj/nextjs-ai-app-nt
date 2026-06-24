import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' },
        { status: 400 },
      )
    }

    const { name, email, message } = parsed.data

    const resendApiKey = process.env.SMTP_PASS
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL

    if (!resendApiKey || !receiverEmail) {
      return NextResponse.json(
        { success: false, error: 'ระบบยังไม่พร้อมให้บริการ กรุณาลองใหม่ภายหลัง' },
        { status: 500 },
      )
    }

    const resend = new Resend(resendApiKey)

    const { error } = await resend.emails.send({
      from: `Contact Form <${process.env.SMTP_USER ?? 'noreply@example.com'}>`,
      to: receiverEmail,
      subject: `ติดต่อจาก: ${name}`,
      html: `
        <h2>ข้อความจากแบบฟอร์มติดต่อเรา</h2>
        <p><strong>ชื่อ:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ข้อความ:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      return NextResponse.json(
        { success: false, error: 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่ภายหลัง' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, data: { message: 'ส่งข้อความเรียบร้อยแล้ว' } })
  } catch {
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง' },
      { status: 500 },
    )
  }
}
