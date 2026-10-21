import React from 'react'

export interface LoadingSpinnerProps {
  text?: string
  fullPage?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'Đang tải dữ liệu...',
  fullPage = false,
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`spinner-container ${fullPage ? 'spinner-fullpage' : ''} ${className}`.trim()}>
      <div className={`spinner-ring spinner-ring-${size}`} />
      {text && <p className="spinner-text">{text}</p>}
    </div>
  )
}
