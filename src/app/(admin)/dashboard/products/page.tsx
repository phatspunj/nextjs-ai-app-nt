import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import ProductsClient from './products-client'

export default async function ProductsPage() {
  await connection()

  const session = await auth.api.getSession({ headers: await headers() })

  const role = (session?.user as Record<string, unknown> | undefined)?.role as string | undefined
  if (role !== 'admin') {
    redirect('/login')
  }

  return <ProductsClient />
}
