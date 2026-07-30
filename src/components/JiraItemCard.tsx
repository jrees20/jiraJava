import React from 'react'
import { JiraActivityItem } from '@/types'

interface JiraItemCardProps {
  item: JiraActivityItem
  onClick?: () => void
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'BLOCKER':
    case 'CRITICAL':
      return 'bg-danger dark:bg-danger-dark text-white'
    case 'HIGH':
      return 'bg-warning dark:bg-warning-dark text-white'
    case 'MEDIUM':
      return 'bg-neutral-300 dark:bg-dark-neutral-300 text-neutral-500 dark:text-dark-neutral-500'
    case 'LOW':
      return 'bg-success dark:bg-success-dark text-white'
    default:
      return 'bg-neutral-200 dark:bg-dark-neutral-200'
  }
}

const getBorderColor = (changeType: string) => {
  switch (changeType) {
    case 'NEW':
      return 'border-l-4 border-success dark:border-success-dark'
    case 'STATUS_CHANGE':
      return 'border-l-4 border-primary'
    case 'BLOCKER':
      return 'border-l-4 border-danger dark:border-danger-dark'
    case 'CLOSED':
      return 'border-l-4 border-neutral-300 dark:border-dark-neutral-300'
    default:
      return 'border-l-4 border-primary'
  }
}

const getChangeTypeIcon = (changeType: string) => {
  switch (changeType) {
    case 'NEW':
      return '✨'
    case 'STATUS_CHANGE':
      return '↔️'
    case 'BLOCKER':
      return '🚫'
    case 'CLOSED':
      return '✅'
    default:
      return '📝'
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

export const JiraItemCard: React.FC<JiraItemCardProps> = ({ item, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white dark:bg-dark-neutral-100 rounded p-4 hover:shadow-elevation-1 transition-all hover:translate-x-0.5 ${getBorderColor(item.changeType)}`}
    >
      {/* Header: Key + Priority */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg">{getChangeTypeIcon(item.changeType)}</span>
          <h4 className="text-heading-4 text-primary dark:text-primary font-semibold hover:underline truncate">
            {item.issueKey}
          </h4>
        </div>
        <span className={`px-2.5 py-1 rounded text-small font-semibold whitespace-nowrap ml-2 ${getPriorityColor(item.priority)}`}>
          {item.priority}
        </span>
      </div>

      {/* Status Change or Summary */}
      {item.fromStatus && item.toStatus ? (
        <p className="text-small text-neutral-400 dark:text-dark-neutral-300 mb-2">
          <span className="bg-neutral-100 dark:bg-dark-neutral-200 px-2 py-0.5 rounded">
            {item.fromStatus}
          </span>
          {' '}
          <span className="text-neutral-400 dark:text-dark-neutral-400">→</span>
          {' '}
          <span className="bg-primary bg-opacity-20 dark:bg-opacity-30 text-primary px-2 py-0.5 rounded">
            {item.toStatus}
          </span>
        </p>
      ) : null}

      {/* Summary */}
      <p className="text-body text-neutral-500 dark:text-dark-neutral-500 mb-3 line-clamp-1">
        {item.summary}
      </p>

      {/* Footer: Metadata */}
      <div className="flex items-center justify-between gap-4 text-small text-neutral-300 dark:text-dark-neutral-400">
        <div className="flex items-center gap-2 flex-wrap">
          <span>By {item.changedBy.displayName}</span>
          <span>•</span>
          <span>{item.projectKey}</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span>{timeAgo(item.changedAt)}</span>
          <span className="text-primary dark:text-primary">→</span>
        </div>
      </div>
    </button>
  )
}
