import api from './apiClient'
import { DashboardSummary, DailyRevenue, TopSellingItem } from '../types/dashboard'

export const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    return api.get<DashboardSummary>('/dashboard/summary')
  },

  getRevenueAnalytics: async (startDate?: string, endDate?: string): Promise<DailyRevenue[]> => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    const queryString = params.toString() ? `?${params.toString()}` : ''
    return api.get<DailyRevenue[]>(`/dashboard/revenue${queryString}`)
  },

  getTopSellingItems: async (limit: number = 5): Promise<TopSellingItem[]> => {
    return api.get<TopSellingItem[]>(`/dashboard/top-items?limit=${limit}`)
  },
}

export default dashboardService
