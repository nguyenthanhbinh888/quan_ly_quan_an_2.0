import React from 'react'

export interface LoadingSpinnerProps {
  text?: string
  fullPage?: boolean
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Đang tải dữ liệu...',
  fullPage = false,
}) => {
  return (
    <div className={`spinner-container ${fullPage ? 'spinner-fullpage' : ''}`}>
      <div className="spinner-ring" />
      {text && <p className="spinner-text">{text}</p>}
    </div>
  )
}
