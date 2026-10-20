import React from 'react'

export interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  action,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      {description && <p className="empty-desc">{description}</p>}
      {action && (
        <button className="btn btn-primary btn-sm" onClick={action.onClick} style={{ marginTop: '1rem' }}>
          {action.label}
        </button>
      )}
    </div>
  )
}
