import React from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { useRouter } from '../context/RouterContext'

export const OrdersPlaceholder: React.FC = () => {
  const { navigate } = useRouter()

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Đơn Hàng & Lịch Sử Hóa Đơn</h1>
          <p className="page-subtitle">Quản lý hóa đơn thanh toán, tra cứu theo bàn và thời gian</p>
        </div>
      </div>

      <div className="card-panel">
        <EmptyState
          icon="🧾"
          title="Chức năng Hóa Đơn & Thanh Toán sẽ triển khai ở Giai đoạn 9"
          description="Hệ thống đã chuẩn bị sẵn cấu trúc bảng orders, order_items và payments. Giai đoạn 9 sẽ hoàn thiện luồng thanh toán tiền mặt và chuyển khoản QR."
          action={{
            label: 'Quay về trang Tổng quan',
            onClick: () => navigate('/'),
          }}
        />
      </div>
    </div>
  )
}
