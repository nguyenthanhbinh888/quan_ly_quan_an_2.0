import React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  strokeWidth?: number
  className?: string
}

const baseProps = (size = 18, strokeWidth = 1.75, className = '', props: React.SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: `ui-icon ${className}`.trim(),
  ...props,
})

// Navigation & Brand
export const IconUtensils: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    <path d="M15 2v18" />
    <path d="M6 2v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
    <path d="M8 11v9" />
  </svg>
)

export const IconDashboard: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
)

export const IconTable: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M3 7h18" />
    <path d="M5 7v13" />
    <path d="M19 7v13" />
    <path d="M8 7v4" />
    <path d="M16 7v4" />
    <path d="M8 11h8" />
  </svg>
)

export const IconMenu: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="M6 14h7" />
  </svg>
)

export const IconReceipt: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2Z" />
    <path d="M8 8h8" />
    <path d="M8 12h8" />
    <path d="M8 16h5" />
  </svg>
)

export const IconReport: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

export const IconLogout: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export const IconUser: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const IconUsers: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

// Operational Actions
export const IconPlus: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export const IconEdit: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
)

export const IconTrash: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

export const IconCheck: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const IconClose: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const IconSearch: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export const IconRefresh: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
)

export const IconFilter: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

export const IconPrinter: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)

// Payment & POS
export const IconCash: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <line x1="6" y1="12" x2="6.01" y2="12" />
    <line x1="18" y1="12" x2="18.01" y2="12" />
  </svg>
)

export const IconQr: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="3" height="3" />
    <rect x="18" y="14" width="3" height="3" />
    <rect x="14" y="18" width="3" height="3" />
    <rect x="18" y="18" width="3" height="3" />
  </svg>
)

export const IconDiscount: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
)

export const IconClock: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export const IconNote: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

// Status & Feedback
export const IconAlertCircle: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

export const IconCheckCircle: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

export const IconXCircle: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

export const IconInfo: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

// UI Controls
export const IconMenuToggle: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export const IconChevronDown: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const IconChevronRight: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const IconArrowLeft: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

export const IconTrendingUp: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

export const IconTrendingDown: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
)

export const IconInbox: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

export const IconUpload: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

export const IconImage: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

export const IconCalendar: React.FC<IconProps> = ({ size, strokeWidth, className, ...props }) => (
  <svg {...baseProps(size, strokeWidth, className, props)}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
