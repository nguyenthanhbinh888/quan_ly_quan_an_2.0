import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'
import { Badge } from '../components/common/Badge'

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, logout } = useAuth()
  const { path, navigate } = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Tổng quan', icon: '📊' },
    { path: '/pos', label: 'Sơ đồ bàn & POS', icon: '🪑' },
    { path: '/menu', label: 'Quản lý Thực đơn', icon: '🍲' },
    { path: '/orders', label: 'Đơn hàng & Hóa đơn', icon: '🧾' },
    ...(isAdmin ? [{ path: '/reports', label: 'Báo cáo doanh thu', icon: '📈' }] : []),
  ]

  const handleNav = (targetPath: string) => {
    navigate(targetPath)
    setSidebarOpen(false)
  }

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <button
            className="mobile-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div className="brand-logo" onClick={() => handleNav('/')}>
            <span className="brand-icon">🍽️</span>
            <span className="brand-name">Quán Ăn POS</span>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info-chip">
            <div className="user-avatar">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-meta">
              <span className="user-name">{user?.fullName || user?.username}</span>
              <Badge variant={user?.role === 'ADMIN' ? 'warning' : 'info'} dot>
                {user?.role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên'}
              </Badge>
            </div>
          </div>

          <button className="btn-logout" onClick={logout} title="Đăng xuất">
            🚪 Đăng xuất
          </button>
        </div>
      </header>

      <div className="main-body">
        {/* Sidebar */}
        <aside className={`app-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-section-title">CHỨC NĂNG CHÍNH</div>
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const isActive = path === item.path
              return (
                <button
                  key={item.path}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  onClick={() => handleNav(item.path)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="system-status-indicator">
              <span className="pulse-dot green-dot" />
              <span>Hệ thống sẵn sàng</span>
            </div>
            <div className="version-tag">v1.0.0 (MVP)</div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Content Area */}
        <main className="content-area">{children}</main>
      </div>
    </div>
  )
}
