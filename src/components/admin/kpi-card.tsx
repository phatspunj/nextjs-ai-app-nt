'use client'

interface KpiCardProps {
  title: string
  value: string
  icon: React.ReactNode
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function KpiCard({ title, value, icon, isLoading, error, onRetry }: KpiCardProps) {
  if (error) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs font-medium text-destructive underline underline-offset-4 hover:text-destructive/80 self-start"
          >
            ลองใหม่
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          {isLoading ? (
            <div className="mt-1.5 h-7 w-20 animate-pulse rounded-md bg-muted" />
          ) : (
            <p className="mt-0.5 truncate text-xl font-semibold tracking-[-0.02em]">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function KpiCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-10 shrink-0 animate-pulse rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 animate-pulse rounded-sm bg-muted" />
          <div className="h-7 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
}
