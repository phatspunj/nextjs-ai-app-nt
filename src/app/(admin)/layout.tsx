import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'หน้าจัดการระบบ',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="font-sans">
      <body className="min-h-screen bg-muted/30">
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
            <span className="font-medium text-sm tracking-[-0.02em]">
              Admin Dashboard
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-muted" />}>
            {children}
          </Suspense>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
