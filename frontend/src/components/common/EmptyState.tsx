import React from 'react'
import { IconInbox } from './Icons'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`empty-state ${className}`.trim()}>
      <div className="empty-icon">
        {icon ? (
          typeof icon === 'string' ? (
            <span className="empty-icon-text">{icon}</span>
          ) : (
            icon
          )
        ) : (
          <IconInbox size={44} strokeWidth={1.5} />
        )}
      </div>
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
