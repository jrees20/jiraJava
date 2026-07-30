import React from 'react'
import { OutlookActivityItem } from '@/types'

interface EmailItemCardProps {
  item: OutlookActivityItem
  onClick?: () => void
}

export const EmailItemCard: React.FC<EmailItemCardProps> = ({ item, onClick }) => {
  const getBorderColor = () => {
    switch (item.severity) {
      case 'CRITICAL':
        return 'border-l-4 border-danger dark:border-danger-dark'
      case 'WARNING':
        return 'border-l-4 border-warning dark:border-warning-dark'
      default:
        return 'border-l-4 border-warning-dark dark:border-warning'
    }
  }

  const getSeverityIcon = () => {
    switch (item.severity) {
      case 'CRITICAL':
        return '🚩'
      case 'WARNING':
        return '⚠️'
      default:
        return '📧'
    }
  }

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white dark:bg-dark-neutral-100 rounded p-4 hover:shadow-elevation-1 transition-all hover:translate-x-0.5 ${getBorderColor()}`}
    >
      {/* Header: Sender + Flag */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg">{getSeverityIcon()}</span>
          <h4 className="text-heading-4 text-neutral-500 dark:text-dark-neutral-500 truncate">
            {item.email.from.emailAddress.name || item.email.from.emailAddress.address}
          </h4>
        </div>
        <span className="text-small text-neutral-400 dark:text-dark-neutral-300 whitespace-nowrap ml-2">
          {item.email.flag?.flagStatus === 'flagged' ? '🚩 Flagged' : 'Received'}
        </span>
      </div>

      {/* Subject */}
      <p className="text-body font-semibold text-neutral-500 dark:text-dark-neutral-500 mb-2 line-clamp-1">
        {item.email.subject}
      </p>

      {/* Preview */}
      <p className="text-small text-neutral-400 dark:text-dark-neutral-300 mb-3 line-clamp-2">
        {item.email.bodyPreview}
      </p>

      {/* Footer: Metadata */}
      <div className="flex items-center justify-between gap-4 text-small text-neutral-300 dark:text-dark-neutral-400">
        <div className="flex items-center gap-3 flex-wrap">
          {item.email.hasAttachments && <span>📎 Has attachment</span>}
          <span>{timeAgo(item.email.receivedDateTime)}</span>
        </div>
        <span className="text-primary dark:text-primary hover:underline">
          View →
        </span>
      </div>
    </button>
  )
}
