import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'
import { Button } from '../components/common/Button'
import { Badge } from '../components/common/Badge'

export const DashboardPlaceholder: React.FC = () => {
  const { user } = useAuth()
  const { navigate } = useRouter()
  const [healthStatus, setHealthStatus] = useState<string>('checking')
  const [serverTime, setServerTime] = useState<string>('')
  const [checking, setChecking] = useState<boolean>(false)

  const checkHealth = async () => {
    setChecking(true)
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
      const res = await fetch(`${baseUrl}/health`)
      if (res.ok) {
        const json = await res.json()
        setHealthStatus('ONLINE')
        setServerTime(json.data?.serverTime || new Date().toISOString())
      } else {
        setHealthStatus('ERROR')
      }
    } catch {
      setHealthStatus('OFFLINE')
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tổng Quan Vận Hành</h1>
          <p className="page-subtitle">
            Xin chào, <strong>{user?.fullName}</strong> ({user?.role === 'ADMIN' ? 'Chủ quán / Quản lý' : 'Nhân viên phục vụ'})!
          </p>
        </div>
        <div className="header-actions">
          <Button variant="outline" size="sm" onClick={checkHealth} isLoading={checking}>
            🔄 Kiểm tra kết nối
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon orange-bg">💰</div>
          <div className="stat-content">
            <span className="stat-label">Doanh thu hôm nay (Dự kiến)</span>
            <span className="stat-value">0 đ</span>
            <span className="stat-hint">*Sẽ kích hoạt ở Giai đoạn 9 & 10</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue-bg">🪑</div>
          <div className="stat-content">
            <span className="stat-label">Bàn sẵn sàng phục vụ</span>
            <span className="stat-value">10 bàn</span>
            <span className="stat-hint">Đã khởi tạo qua Flyway V2</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green-bg">🍲</div>
          <div className="stat-content">
            <span className="stat-label">Danh mục thực đơn</span>
            <span className="stat-value">4 danh mục</span>
            <span className="stat-hint">Khai vị, Món chính, Nước, Tráng miệng</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-bg">⚡</div>
          <div className="stat-content">
            <span className="stat-label">Trạng thái máy chủ API</span>
            <span className="stat-value">
              {healthStatus === 'ONLINE' ? (
                <Badge variant="success" dot>Backend Online</Badge>
              ) : healthStatus === 'checking' ? (
                <Badge variant="warning" dot>Đang kết nối...</Badge>
              ) : (
                <Badge variant="danger" dot>Mất kết nối</Badge>
              )}
            </span>
            <span className="stat-hint">{serverTime ? new Date(serverTime).toLocaleTimeString('vi-VN') : '8080/api'}</span>
          </div>
        </div>
      </div>

      {/* Quick Launchpad */}
      <div className="launchpad-grid" style={{ marginTop: '2rem' }}>
        <div className="launchpad-card">
          <div className="launchpad-header">
            <h3>🪑 Sơ đồ bàn & Gọi món (POS)</h3>
            <span className="stage-badge">Giai đoạn 8</span>
          </div>
          <p>
            Xem trực quan trạng thái từng bàn ăn (trống, đang có khách, chờ thanh toán), mở bàn và thêm món nhanh chóng.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/pos')} style={{ marginTop: '1rem' }}>
            Xem giao diện sơ đồ bàn →
          </Button>
        </div>

        <div className="launchpad-card">
          <div className="launchpad-header">
            <h3>🍲 Quản lý Thực đơn & Món ăn</h3>
            <span className="stage-badge">Giai đoạn 7</span>
          </div>
          <p>
            Thêm mới, sửa giá niêm yết, bật/tắt trạng thái Còn bán hoặc Hết món trong ca trực.
          </p>
          <Button variant="secondary" size="md" onClick={() => navigate('/menu')} style={{ marginTop: '1rem' }}>
            Xem quản lý thực đơn →
          </Button>
        </div>
      </div>
    </div>
  )
}
