import React from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { useRouter } from '../context/RouterContext'

export const MenuPlaceholder: React.FC = () => {
  const { navigate } = useRouter()

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản Lý Thực Đơn & Danh Mục</h1>
          <p className="page-subtitle">Quản lý món ăn, bảng giá niêm yết và trạng thái còn/hết món</p>
        </div>
      </div>

      <div className="card-panel">
        <EmptyState
          icon="🍲"
          title="Chức năng Quản Lý Thực Đơn sẽ triển khai ở Giai đoạn 7"
          description="Cơ sở dữ liệu đã chuẩn bị sẵn 4 danh mục món ăn (Khai vị, Món chính, Đồ uống, Tráng miệng). Chức năng CRUD món ăn đầy đủ sẽ hoàn thiện ngay trong giai đoạn tiếp theo."
          action={{
            label: 'Quay về trang Tổng quan',
            onClick: () => navigate('/'),
          }}
        />
      </div>
    </div>
  )
}
