import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'
import { dashboardService } from '../services/dashboardService'
import { DashboardSummary, DailyRevenue, TopSellingItem } from '../types/dashboard'
import { Button } from '../components/common/Button'
import { Badge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { navigate } = useRouter()

  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [revenueData, setRevenueData] = useState<DailyRevenue[]>([])
  const [topItems, setTopItems] = useState<TopSellingItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState<'7days' | 'today' | '30days'>('7days')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const formatCurrency = (amount: number = 0) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const formatShortDate = (dateStr: string) => {
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}`
    }
    return dateStr
  }

  const getDateRange = (range: '7days' | 'today' | '30days') => {
    const end = new Date()
    const start = new Date()

    if (range === 'today') {
      // today only
    } else if (range === '7days') {
      start.setDate(end.getDate() - 6)
    } else if (range === '30days') {
      start.setDate(end.getDate() - 29)
    }

    const toIsoDate = (d: Date) => {
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    return {
      startDate: toIsoDate(start),
      endDate: toIsoDate(end),
    }
  }

  const loadDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      const { startDate, endDate } = getDateRange(period)

      const [summaryRes, revenueRes, topItemsRes] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getRevenueAnalytics(startDate, endDate),
        dashboardService.getTopSellingItems(5),
      ])

      setSummary(summaryRes)
      setRevenueData(revenueRes)
      setTopItems(topItemsRes)
      setLastUpdated(new Date())
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể tải dữ liệu thống kê'
      setError(msg)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [period])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  // Aggregate calculations for chart
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue), 1)
  const totalPeriodRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalPeriodOrders = revenueData.reduce((sum, item) => sum + item.orderCount, 0)
  const avgDailyRevenue = revenueData.length > 0 ? Math.round(totalPeriodRevenue / revenueData.length) : 0

  // Max quantity for top items progress
  const maxSold = Math.max(...topItems.map((item) => item.quantitySold), 1)

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>Báo Cáo & Thống Kê Hoạt Động</h1>
          <p>
            Xin chào <strong>{user?.fullName}</strong>! Tổng hợp chỉ số kinh doanh, hiệu suất bàn và các món ăn bán chạy
          </p>
        </div>
        <div className="dashboard-header-actions">
          <span className="last-updated-tag">
            Cập nhật lúc: {lastUpdated.toLocaleTimeString('vi-VN')}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadDashboardData(true)}
            isLoading={refreshing}
          >
            🔄 Làm mới
          </Button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '1rem',
            borderRadius: '12px',
          }}
        >
          ⚠️ Lỗi tải dữ liệu: {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner text="Đang tải dữ liệu kinh doanh và phân tích..." />
      ) : (
        <>
          {/* Top 4 KPI Cards */}
          <div className="dashboard-kpi-grid">
            {/* KPI 1: Doanh thu hôm nay */}
            <div className="kpi-card kpi-card-orange">
              <div className="kpi-top-row">
                <span className="kpi-label">Doanh thu hôm nay</span>
                <div className="kpi-icon-badge icon-orange">💰</div>
              </div>
              <div className="kpi-value">{formatCurrency(summary?.todayRevenue || 0)}</div>
              <div className="kpi-subtext">
                <span>⚡ Doanh thu thực nhận từ các đơn đã thanh toán hôm nay</span>
              </div>
            </div>

            {/* KPI 2: Số hóa đơn đã thanh toán */}
            <div className="kpi-card kpi-card-green">
              <div className="kpi-top-row">
                <span className="kpi-label">Hóa đơn hoàn tất</span>
                <div className="kpi-icon-badge icon-green">🧾</div>
              </div>
              <div className="kpi-value">{summary?.todayOrderCount || 0} đơn</div>
              <div className="kpi-subtext">
                <span>✅ Khách đã hoàn thành thanh toán trong ngày</span>
              </div>
            </div>

            {/* KPI 3: Giá trị trung bình đơn (AOV) */}
            <div className="kpi-card kpi-card-cyan">
              <div className="kpi-top-row">
                <span className="kpi-label">Giá trị TB / Đơn (AOV)</span>
                <div className="kpi-icon-badge icon-cyan">📈</div>
              </div>
              <div className="kpi-value">{formatCurrency(summary?.averageOrderValue || 0)}</div>
              <div className="kpi-subtext">
                <span>🎯 Doanh thu bình quân trên mỗi hóa đơn hôm nay</span>
              </div>
            </div>

            {/* KPI 4: Công suất phục vụ bàn */}
            <div className="kpi-card kpi-card-purple">
              <div className="kpi-top-row">
                <span className="kpi-label">Hiệu suất phục vụ bàn</span>
                <div className="kpi-icon-badge icon-purple">🪑</div>
              </div>
              <div className="kpi-value">{summary?.occupancyRate || 0}%</div>
              <div className="kpi-subtext">
                <span>
                  Đang phục vụ {summary?.occupiedTables || 0} / {summary?.totalTables || 0} bàn
                </span>
              </div>
              <div className="kpi-progress-bar">
                <div
                  className="kpi-progress-fill"
                  style={{ width: `${Math.min(summary?.occupancyRate || 0, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* 2-Column Analytics Layout */}
          <div className="dashboard-grid-2col">
            {/* Left: Revenue Trend Chart */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div className="card-title-wrap">
                  <h2>📊 Xu hướng Doanh thu</h2>
                  <p>Biểu đồ doanh thu thực tế theo chu kỳ kinh doanh</p>
                </div>
                <div className="filter-pills">
                  <button
                    className={`filter-pill ${period === 'today' ? 'active' : ''}`}
                    onClick={() => setPeriod('today')}
                  >
                    Hôm nay
                  </button>
                  <button
                    className={`filter-pill ${period === '7days' ? 'active' : ''}`}
                    onClick={() => setPeriod('7days')}
                  >
                    7 ngày
                  </button>
                  <button
                    className={`filter-pill ${period === '30days' ? 'active' : ''}`}
                    onClick={() => setPeriod('30days')}
                  >
                    30 ngày
                  </button>
                </div>
              </div>

              <div className="revenue-chart-box">
                {/* Summary numbers for selected period */}
                <div className="chart-period-summary">
                  <div className="period-stat-item">
                    <span className="period-stat-label">Tổng doanh thu kỳ</span>
                    <span className="period-stat-val" style={{ color: '#f97316' }}>
                      {formatCurrency(totalPeriodRevenue)}
                    </span>
                  </div>
                  <div className="period-stat-item">
                    <span className="period-stat-label">Tổng hóa đơn</span>
                    <span className="period-stat-val" style={{ color: '#10b981' }}>
                      {totalPeriodOrders} đơn
                    </span>
                  </div>
                  <div className="period-stat-item">
                    <span className="period-stat-label">TB / Ngày</span>
                    <span className="period-stat-val" style={{ color: '#38bdf8' }}>
                      {formatCurrency(avgDailyRevenue)}
                    </span>
                  </div>
                </div>

                {/* Bar Chart Bars */}
                {revenueData.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Không có dữ liệu trong khoảng thời gian này
                  </div>
                ) : (
                  <div className="bar-chart-track">
                    {revenueData.map((item) => {
                      const heightPercent =
                        maxRevenue > 0
                          ? Math.max(Math.round((item.revenue / maxRevenue) * 100), item.revenue > 0 ? 12 : 3)
                          : 3

                      return (
                        <div key={item.date} className="bar-column">
                          <div className="bar-tooltip">
                            <strong>{item.date}</strong>
                            <div>{formatCurrency(item.revenue)}</div>
                            <small>{item.orderCount} hóa đơn</small>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="bar-label-date">
                            {formatShortDate(item.date)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Top 5 Selling Dishes */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div className="card-title-wrap">
                  <h2>🔥 Món Bán Chạy Nhất</h2>
                  <p>Top các món ăn được khách hàng ưa chuộng</p>
                </div>
                <Badge variant="warning">Top 5</Badge>
              </div>

              {topItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍲</p>
                  <p>Chưa có dữ liệu món ăn được bán</p>
                  <small style={{ color: 'var(--text-dim)' }}>
                    Các món ăn sẽ tự động xếp hạng khi phát sinh hóa đơn thanh toán
                  </small>
                </div>
              ) : (
                <div className="top-items-container">
                  {topItems.map((item, index) => {
                    const rank = index + 1
                    const progressPercent = Math.max(Math.round((item.quantitySold / maxSold) * 100), 10)

                    return (
                      <div key={item.menuItemId} className="top-item-row">
                        <div
                          className={`top-item-rank ${
                            rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : ''
                          }`}
                        >
                          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                        </div>

                        <div className="top-item-info">
                          <div className="top-item-name" title={item.itemName}>
                            {item.itemName}
                          </div>
                          <div className="top-item-category">
                            Danh mục: {item.categoryName}
                          </div>
                          <div className="top-item-progress-track">
                            <div
                              className="top-item-progress-fill"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="top-item-numbers">
                          <span className="top-item-qty">{item.quantitySold} phần</span>
                          <span className="top-item-rev">{formatCurrency(item.totalRevenue)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Launchpad Shortcuts */}
          <div className="launchpad-grid">
            <div className="launchpad-card">
              <div className="launchpad-header">
                <h3>🪑 Sơ đồ Bàn & Thu ngân (POS)</h3>
                <Badge variant="success">Hoạt động</Badge>
              </div>
              <p>
                Theo dõi trực quan bàn ăn theo màu sắc thời gian thực, mở bàn gọi món và thanh toán tiền mặt/chuyển khoản VietQR.
              </p>
              <Button variant="primary" size="md" onClick={() => navigate('/pos')}>
                Mở giao diện POS →
              </Button>
            </div>

            <div className="launchpad-card">
              <div className="launchpad-header">
                <h3>🍲 Quản lý Thực đơn & Giá bán</h3>
                <Badge variant="info">Hoạt động</Badge>
              </div>
              <p>
                Cập nhật danh sách món ăn, thay đổi đơn giá, phân loại danh mục món và bật tắt trạng thái Còn bán/Hết món tức thì.
              </p>
              <Button variant="secondary" size="md" onClick={() => navigate('/menu')}>
                Quản lý Thực đơn →
              </Button>
            </div>

            <div className="launchpad-card">
              <div className="launchpad-header">
                <h3>🧾 Lịch sử Hóa đơn & Tra cứu</h3>
                <Badge variant="warning">Hoạt động</Badge>
              </div>
              <p>
                Tra cứu danh sách hóa đơn theo ngày, kiểm tra chi tiết thanh toán của từng bàn ăn và in lại hóa đơn biên lai khi cần.
              </p>
              <Button variant="outline" size="md" onClick={() => navigate('/orders')}>
                Xem Lịch sử Hóa đơn →
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage
