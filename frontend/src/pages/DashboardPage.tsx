import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'
import { dashboardService } from '../services/dashboardService'
import { DashboardSummary, DailyRevenue, TopSellingItem } from '../types/dashboard'
import { Button } from '../components/common/Button'
import { Badge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import {
  IconCash,
  IconReceipt,
  IconTrendingUp,
  IconTable,
  IconRefresh,
  IconAlertCircle,
  IconReport,
  IconUtensils,
  IconMenu,
} from '../components/common/Icons'

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
            Xin chào <strong>{user?.fullName || user?.username}</strong>! Tổng hợp chỉ số kinh doanh, công suất bàn và phân tích món bán chạy
          </p>
        </div>
        <div className="dashboard-header-actions">
          <span className="last-updated-tag tabular-nums">
            Cập nhật: {lastUpdated.toLocaleTimeString('vi-VN')}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => loadDashboardData(true)}
            isLoading={refreshing}
            icon={<IconRefresh size={15} />}
          >
            Làm mới dữ liệu
          </Button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <IconAlertCircle size={18} />
          <span>Lỗi tải dữ liệu: {error}</span>
        </div>
      )}

      {loading ? (
        <LoadingSpinner text="Đang phân tích số liệu kinh doanh..." />
      ) : (
        <>
          {/* Top 4 KPI Cards */}
          <div className="dashboard-kpi-grid">
            {/* KPI 1: Doanh thu hôm nay */}
            <div className="kpi-card kpi-card-orange">
              <div className="kpi-top-row">
                <span className="kpi-label">Doanh thu hôm nay</span>
                <div className="kpi-icon-badge icon-orange">
                  <IconCash size={20} strokeWidth={2} />
                </div>
              </div>
              <div className="kpi-value tabular-nums">{formatCurrency(summary?.todayRevenue || 0)}</div>
              <div className="kpi-subtext">
                <span>Doanh thu thực nhận từ các đơn hoàn tất hôm nay</span>
              </div>
            </div>

            {/* KPI 2: Số hóa đơn đã thanh toán */}
            <div className="kpi-card kpi-card-green">
              <div className="kpi-top-row">
                <span className="kpi-label">Hóa đơn hoàn tất</span>
                <div className="kpi-icon-badge icon-green">
                  <IconReceipt size={20} strokeWidth={2} />
                </div>
              </div>
              <div className="kpi-value tabular-nums">{summary?.todayOrderCount || 0} đơn</div>
              <div className="kpi-subtext">
                <span>Khách hàng đã thanh toán và bàn đã giải phóng</span>
              </div>
            </div>

            {/* KPI 3: Giá trị trung bình đơn (AOV) */}
            <div className="kpi-card kpi-card-cyan">
              <div className="kpi-top-row">
                <span className="kpi-label">Giá trị TB / Đơn (AOV)</span>
                <div className="kpi-icon-badge icon-cyan">
                  <IconTrendingUp size={20} strokeWidth={2} />
                </div>
              </div>
              <div className="kpi-value tabular-nums">{formatCurrency(summary?.averageOrderValue || 0)}</div>
              <div className="kpi-subtext">
                <span>Doanh thu bình quân trên mỗi hóa đơn trong ngày</span>
              </div>
            </div>

            {/* KPI 4: Công suất phục vụ bàn */}
            <div className="kpi-card kpi-card-purple">
              <div className="kpi-top-row">
                <span className="kpi-label">Công suất bàn hiện tại</span>
                <div className="kpi-icon-badge icon-purple">
                  <IconTable size={20} strokeWidth={2} />
                </div>
              </div>
              <div className="kpi-value tabular-nums">{summary?.occupancyRate || 0}%</div>
              <div className="kpi-subtext">
                <span>
                  Đang phục vụ {summary?.occupiedTables || 0} / {summary?.totalTables || 0} bàn ăn
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
                  <h2>
                    <IconReport size={20} strokeWidth={2} />
                    <span>Xu hướng Doanh thu</span>
                  </h2>
                  <p>Biểu đồ cột theo dõi doanh thu thực nhận theo chu kỳ</p>
                </div>
                <div className="filter-pills">
                  <button
                    type="button"
                    className={`filter-pill ${period === 'today' ? 'active' : ''}`}
                    onClick={() => setPeriod('today')}
                  >
                    Hôm nay
                  </button>
                  <button
                    type="button"
                    className={`filter-pill ${period === '7days' ? 'active' : ''}`}
                    onClick={() => setPeriod('7days')}
                  >
                    7 ngày
                  </button>
                  <button
                    type="button"
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
                    <span className="period-stat-val tabular-nums" style={{ color: 'var(--primary)' }}>
                      {formatCurrency(totalPeriodRevenue)}
                    </span>
                  </div>
                  <div className="period-stat-item">
                    <span className="period-stat-label">Tổng số hóa đơn</span>
                    <span className="period-stat-val tabular-nums" style={{ color: 'var(--status-empty)' }}>
                      {totalPeriodOrders} đơn
                    </span>
                  </div>
                  <div className="period-stat-item">
                    <span className="period-stat-label">Bình quân / Ngày</span>
                    <span className="period-stat-val tabular-nums" style={{ color: 'var(--info)' }}>
                      {formatCurrency(avgDailyRevenue)}
                    </span>
                  </div>
                </div>

                {/* Bar Chart Bars */}
                {revenueData.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Không có phát sinh doanh thu trong khoảng thời gian này
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
                            <div className="tabular-nums">{formatCurrency(item.revenue)}</div>
                            <small>{item.orderCount} hóa đơn</small>
                          </div>
                          <div
                            className="bar-fill"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="bar-label-date tabular-nums">
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
                  <h2>
                    <IconUtensils size={20} strokeWidth={2} />
                    <span>Món Bán Chạy Nhất</span>
                  </h2>
                  <p>Xếp hạng theo sản lượng đã phục vụ</p>
                </div>
                <Badge variant="warning">Top 5</Badge>
              </div>

              {topItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                  <IconUtensils size={36} strokeWidth={1.5} style={{ margin: '0 auto 0.5rem', display: 'block', color: 'var(--text-dim)' }} />
                  <p style={{ fontWeight: 600 }}>Chưa có dữ liệu món ăn được bán</p>
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
                          {rank < 10 ? `0${rank}` : rank}
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
                          <span className="top-item-qty tabular-nums">{item.quantitySold} phần</span>
                          <span className="top-item-rev tabular-nums">{formatCurrency(item.totalRevenue)}</span>
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
                <h3>Sơ đồ Bàn & Thu ngân (POS)</h3>
                <Badge variant="success">Hoạt động</Badge>
              </div>
              <p>
                Theo dõi trực quan bàn ăn theo màu sắc thời gian thực, mở bàn gọi món và thanh toán tiền mặt/chuyển khoản VietQR.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/pos')}
                icon={<IconTable size={16} />}
              >
                Mở giao diện POS
              </Button>
            </div>

            <div className="launchpad-card">
              <div className="launchpad-header">
                <h3>Quản lý Thực đơn & Giá bán</h3>
                <Badge variant="info">Hoạt động</Badge>
              </div>
              <p>
                Cập nhật danh sách món ăn, thay đổi đơn giá, phân loại danh mục món và bật tắt trạng thái Còn bán/Hết món tức thì.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/menu')}
                icon={<IconMenu size={16} />}
              >
                Quản lý Thực đơn
              </Button>
            </div>

            <div className="launchpad-card">
              <div className="launchpad-header">
                <h3>Lịch sử Hóa đơn & Tra cứu</h3>
                <Badge variant="neutral">Hoạt động</Badge>
              </div>
              <p>
                Tra cứu danh sách hóa đơn theo ngày, kiểm tra chi tiết thanh toán của từng bàn ăn và in lại hóa đơn biên lai khi cần.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/orders')}
                icon={<IconReceipt size={16} />}
              >
                Xem Lịch sử Hóa đơn
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage
