import React from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { useRouter } from '../context/RouterContext'

export const PosPlaceholder: React.FC = () => {
  const { navigate } = useRouter()

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Sơ Đồ Bàn & Đặt Món (POS)</h1>
          <p className="page-subtitle">Khu vực hiển thị và tương tác trạng thái bàn ăn thời gian thực</p>
        </div>
      </div>

      <div className="card-panel">
        <EmptyState
          icon="🪑"
          title="Chức năng Sơ Đồ Bàn sẵn sàng cho Giai đoạn 8"
          description="Khung giao diện đã được kết nối với hệ thống xác thực. Chức năng mở bàn, gọi món tại bàn, hiển thị màu sắc bàn theo trạng thái sẽ được triển khai đầy đủ ở Giai đoạn 8."
          action={{
            label: 'Quay về trang Tổng quan',
            onClick: () => navigate('/'),
          }}
        />
      </div>
    </div>
  )
}
