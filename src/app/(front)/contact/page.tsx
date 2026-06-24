import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import ContactForm from './contact-form'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ส่งข้อความติดต่อเรา เราพร้อมตอบกลับโดยเร็วที่สุด',
}

export default function ContactPage() {
  return (
    <main className={`${playfairDisplay.variable} ${sourceSans.variable} min-h-screen bg-[#FAFAF9]`}>
      <div className="mx-auto max-w-[1200px] px-6 py-6 md:py-8 lg:py-12">
        <ContactForm />
      </div>
    </main>
  )
}
