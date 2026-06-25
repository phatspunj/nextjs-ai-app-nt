'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  DollarSign,
  ShoppingCart,
  Clock,
  Package,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { KpiCard, KpiCardSkeleton } from '@/components/admin/kpi-card'
import { PeriodSelector } from '@/components/admin/period-selector'
import { RecentOrdersTable } from '@/components/admin/recent-orders-table'
import type { AdminStats, RevenuePoint, AdminOrderItem } from '@/types/admin'

const RevenueChart = dynamic(
  () => import('@/components/admin/revenue-chart'),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle>รายได้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    ),
  },
)

type Period = '7d' | '30d' | '90d'

function formatPrice(value: number) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('th-TH').format(value)
}

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [revenue, setRevenue] = useState<RevenuePoint[]>([])
  const [revenueLoading, setRevenueLoading] = useState(true)
  const [period, setPeriod] = useState<Period>('30d')

  const [orders, setOrders] = useState<AdminOrderItem[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    setStatsError(null)
    try {
      const res = await fetch('/api/admin/stats')
      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'เกิดข้อผิดพลาด')
      setStats(json.data)
    } catch (err) {
      setStatsError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const fetchRevenue = useCallback(async (p: Period) => {
    setRevenueLoading(true)
    try {
      const res = await fetch(`/api/admin/revenue?period=${p}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'เกิดข้อผิดพลาด')
      setRevenue(json.data)
    } catch {
      setRevenue([])
    } finally {
      setRevenueLoading(false)
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true)
    setOrdersError(null)
    try {
      const res = await fetch('/api/admin/orders?limit=5')
      const json = await res.json()
      if (!json.success) throw new Error(json.error ?? 'เกิดข้อผิดพลาด')
      setOrders(json.data.orders)
    } catch (err) {
      setOrdersError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    } finally {
      setOrdersLoading(false)
    }
  }, [])

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchStats()
    fetchOrders()
    fetchRevenue(period)

    const interval = setInterval(() => {
      fetchStats()
      fetchOrders()
    }, 30_000)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    fetchRevenue(period)
  }, [period, fetchRevenue])
  /* eslint-enable react-hooks/set-state-in-effect */

  function handlePeriodChange(p: Period) {
    setPeriod(p)
  }

  return (
    <div className="space-y-6">
      {/* ── Period Selector ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-[-0.02em]">ภาพรวม</h1>
        <PeriodSelector value={period} onChange={handlePeriodChange} />
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsLoading && !stats
          ? Array.from({ length: 5 }).map((_, i) => <KpiCardSkeleton key={i} />)
          : (
            <>
              <KpiCard
                title="ยอดขายวันนี้"
                value={stats ? formatPrice(stats.todaySales) : '-'}
                icon={<DollarSign className="size-5" />}
                isLoading={statsLoading}
                error={statsError}
                onRetry={fetchStats}
              />
              <KpiCard
                title="ออเดอร์วันนี้"
                value={stats ? formatNumber(stats.todayOrders) : '-'}
                icon={<ShoppingCart className="size-5" />}
                isLoading={statsLoading}
                error={statsError}
                onRetry={fetchStats}
              />
              <KpiCard
                title="รอดำเนินการ"
                value={stats ? formatNumber(stats.pendingOrders) : '-'}
                icon={<Clock className="size-5" />}
                isLoading={statsLoading}
                error={statsError}
                onRetry={fetchStats}
              />
              <KpiCard
                title="สินค้าทั้งหมด"
                value={stats ? formatNumber(stats.totalProducts) : '-'}
                icon={<Package className="size-5" />}
                isLoading={statsLoading}
                error={statsError}
                onRetry={fetchStats}
              />
              <KpiCard
                title="ผู้ใช้ทั้งหมด"
                value={stats ? formatNumber(stats.totalUsers) : '-'}
                icon={<Users className="size-5" />}
                isLoading={statsLoading}
                error={statsError}
                onRetry={fetchStats}
              />
            </>
          )}
      </div>

      {/* ── Revenue Chart + Recent Orders ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <RevenueChart
          data={revenue}
          isLoading={revenueLoading}
          period={period}
        />
        <RecentOrdersTable
          orders={orders}
          isLoading={ordersLoading}
          error={ordersError}
          onRetry={fetchOrders}
        />
      </div>
    </div>
  )
}
