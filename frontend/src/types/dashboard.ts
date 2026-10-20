export interface DashboardSummary {
  todayRevenue: number
  todayOrderCount: number
  averageOrderValue: number
  occupiedTables: number
  totalTables: number
  occupancyRate: number
}

export interface DailyRevenue {
  date: string
  revenue: number
  orderCount: number
}

export interface TopSellingItem {
  menuItemId: number
  itemName: string
  categoryName: string
  quantitySold: number
  totalRevenue: number
}
