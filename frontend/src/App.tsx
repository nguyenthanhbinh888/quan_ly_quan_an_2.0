import { useState, useEffect } from 'react'

interface HealthResponse {
  success: boolean
  message: string
  data?: {
    status: string
    appName: string
    version: string
    serverTime: string
  }
}

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

  const checkBackendHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${apiBaseUrl}/health`)
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }
      const data: HealthResponse = await response.json()
      setHealth(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Không thể kết nối đến Backend')
      setHealth(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkBackendHealth()
  }, [])

  return (
    <div className="container">
      <div className="card">
        <div className="header-badge">
          <span className="pulse-dot"></span>
          Giai đoạn 3 — Skeleton Ready
        </div>

        <h1>Hệ Thống Quản Lý Quán Ăn</h1>
        <p className="subtitle">
          Nền tảng vận hành tập trung: Quản lý thực đơn, sơ đồ bàn trực quan, gọi món tại bàn,
          tính tiền & báo cáo doanh thu với Java Spring Boot và React + TypeScript.
        </p>

        <div className="grid-features">
          <div className="feature-box">
            <div className="feature-icon">🍲</div>
            <div className="feature-title">Quản lý Thực đơn</div>
            <div className="feature-desc">Danh mục món ăn, giá niêm yết, phân loại và trạng thái còn/hết món.</div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🪑</div>
            <div className="feature-title">Sơ đồ Bàn ăn</div>
            <div className="feature-desc">Theo dõi trạng thái trực quan: Bàn trống, Đang phục vụ, Chờ thanh toán.</div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🧾</div>
            <div className="feature-title">Gọi món & Thanh toán</div>
            <div className="feature-desc">Lưu snapshot giá món, tính tiền chuẩn xác, hỗ trợ tiền mặt & chuyển khoản QR.</div>
          </div>

          <div className="feature-box">
            <div className="feature-icon">📊</div>
            <div className="feature-title">Báo cáo Doanh thu</div>
            <div className="feature-desc">Thống kê doanh thu theo ngày, số đơn hoàn tất và top món ăn bán chạy nhất.</div>
          </div>
        </div>

        <div className="health-status-box">
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Trạng thái kết nối Backend API: <code>{apiBaseUrl}/health</code>
            </div>
            {loading && (
              <span className="status-badge checking">
                <span className="pulse-dot"></span> Đang kiểm tra...
              </span>
            )}
            {!loading && health?.data?.status === 'UP' && (
              <span className="status-badge online">
                <span className="pulse-dot"></span> Backend ONLINE ({health.data.appName} v{health.data.version})
              </span>
            )}
            {!loading && error && (
              <span className="status-badge offline">
                ● Backend OFFLINE ({error})
              </span>
            )}
          </div>

          <button id="btn-recheck-health" className="btn-check" onClick={checkBackendHealth} disabled={loading}>
            {loading ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
