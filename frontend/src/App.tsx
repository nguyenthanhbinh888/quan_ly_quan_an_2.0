import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { RouterProvider, useRouter } from './context/RouterContext'
import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { PosPage } from './pages/PosPage'
import { MenuPage } from './pages/MenuPage'
import { OrdersPage } from './pages/OrdersPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { LoadingSpinner } from './components/common/LoadingSpinner'

const AppRouter: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()
  const { path } = useRouter()

  if (loading) {
    return <LoadingSpinner text="Đang khởi tạo phiên làm việc..." fullPage />
  }

  // Nếu chưa đăng nhập mà không ở trang /login -> hiển thị LoginPage
  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Nếu đã đăng nhập mà đang ở /login -> hiển thị trang chủ qua MainLayout
  let pageContent: React.ReactNode

  switch (path) {
    case '/':
    case '/login':
      pageContent = <DashboardPage />
      break
    case '/pos':
      pageContent = <PosPage />
      break
    case '/menu':
      pageContent = <MenuPage />
      break
    case '/orders':
      pageContent = <OrdersPage />
      break
    case '/reports':
      pageContent = <DashboardPage />
      break
    default:
      pageContent = <NotFoundPage />
      break
  }

  return <MainLayout>{pageContent}</MainLayout>
}

export function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <AppRouter />
      </RouterProvider>
    </AuthProvider>
  )
}

export default App
