import React from 'react'
import { EmptyState } from '../components/common/EmptyState'
import { useRouter } from '../context/RouterContext'

export const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter()

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <EmptyState
        icon="🔍"
        title="404 - Không tìm thấy trang"
        description="Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển."
        action={{
          label: 'Quay lại Trang Chủ',
          onClick: () => navigate('/'),
        }}
      />
    </div>
  )
}
