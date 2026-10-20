import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { RouterProvider, useRouter } from './context/RouterContext'
import { MainLayout } from './layouts/MainLayout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPlaceholder } from './pages/DashboardPlaceholder'
import { PosPlaceholder } from './pages/PosPlaceholder'
import { MenuPlaceholder } from './pages/MenuPlaceholder'
import { OrdersPlaceholder } from './pages/OrdersPlaceholder'
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
      pageContent = <DashboardPlaceholder />
      break
    case '/pos':
      pageContent = <PosPlaceholder />
      break
    case '/menu':
      pageContent = <MenuPlaceholder />
      break
    case '/orders':
    case '/reports':
      pageContent = <OrdersPlaceholder />
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
