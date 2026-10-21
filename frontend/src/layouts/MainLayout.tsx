import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'
import { Badge } from '../components/common/Badge'
import {
  IconUtensils,
  IconDashboard,
  IconTable,
  IconMenu,
  IconReceipt,
  IconReport,
  IconLogout,
  IconMenuToggle,
  IconClose,
} from '../components/common/Icons'

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, logout } = useAuth()
  const { path, navigate } = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Tổng quan', icon: <IconDashboard size={18} /> },
    { path: '/pos', label: 'Sơ đồ bàn & POS', icon: <IconTable size={18} /> },
    { path: '/menu', label: 'Quản lý Thực đơn', icon: <IconMenu size={18} /> },
    { path: '/orders', label: 'Đơn hàng & Hóa đơn', icon: <IconReceipt size={18} /> },
    ...(isAdmin ? [{ path: '/reports', label: 'Báo cáo doanh thu', icon: <IconReport size={18} /> }] : []),
  ]

  const handleNav = (targetPath: string) => {
    navigate(targetPath)
    setSidebarOpen(false)
  }

  const getPageTitle = () => {
    if (path === '/') return 'Tổng quan hoạt động'
    if (path === '/pos') return 'Sơ đồ bàn ăn & Bán hàng (POS)'
    if (path === '/menu') return 'Quản lý Thực đơn & Món ăn'
    if (path === '/orders') return 'Lịch sử Đơn hàng & Hóa đơn'
    if (path === '/reports') return 'Báo cáo doanh thu & Thống kê'
    return 'Hệ thống Quản lý Quán ăn'
  }

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {sidebarOpen ? <IconClose size={20} /> : <IconMenuToggle size={20} />}
          </button>

          <div className="brand-logo" onClick={() => handleNav('/')} role="button" tabIndex={0}>
            <div className="brand-icon-box">
              <IconUtensils size={20} strokeWidth={2} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">HƯƠNG VIỆT</span>
              <span className="brand-tagline">POS & Restaurant Ops</span>
            </div>
          </div>

          <div className="header-divider" />

          <div className="header-current-context">
            <span className="current-page-label">{getPageTitle()}</span>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info-chip">
            <div className="user-avatar" title={user?.fullName || user?.username}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-meta">
              <span className="user-name">{user?.fullName || user?.username}</span>
              <Badge variant={user?.role === 'ADMIN' ? 'warning' : 'info'} dot>
                {user?.role === 'ADMIN' ? 'Quản trị viên' : 'Nhân viên thu ngân'}
              </Badge>
            </div>
          </div>

          <button
            type="button"
            className="btn-logout"
            onClick={logout}
            title="Đăng xuất khỏi hệ thống"
          >
            <IconLogout size={16} strokeWidth={2} />
            <span className="logout-text">Đăng xuất</span>
          </button>
        </div>
      </header>

      <div className="main-body">
        {/* Sidebar */}
        <aside className={`app-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-section-title">ĐIỀU HƯỚNG TỔNG QUAN</div>
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const isActive = path === item.path
              return (
                <button
                  type="button"
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
              <span className="status-ping-dot" />
              <span>Hệ thống trực tuyến</span>
            </div>
            <div className="version-tag">Phiên bản 1.0 • Vận hành quầy</div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content Area */}
        <main className="content-area">{children}</main>
      </div>
    </div>
  )
}
