export interface AdminStats {
  todaySales: number
  todayOrders: number
  pendingOrders: number
  totalProducts: number
  totalUsers: number
}

export interface RevenuePoint {
  date: string
  revenue: number
  orders: number
}

export interface AdminOrderItem {
  id: number
  customer: string
  date: string
  status: string
  total: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface AdminProduct {
  id: number
  name: string
  description: string | null
  price: number
  categoryId: number | null
  categoryName: string
}

export interface CategoryOption {
  id: number
  name: string
}
