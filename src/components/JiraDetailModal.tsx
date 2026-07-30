import React from 'react'
import { JiraActivityItem } from '@/types'

interface JiraDetailModalProps {
  item: JiraActivityItem | null
  isOpen: boolean
  onClose: () => void
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

const getChangeTypeLabel = (changeType: string) => {
  switch (changeType) {
    case 'NEW':
      return 'New Issue'
    case 'STATUS_CHANGE':
      return 'Status Updated'
    case 'BLOCKER':
      return 'Blocked'
    case 'CLOSED':
      return 'Closed'
    default:
      return 'Updated'
  }
}

const getPriorityHeaderColor = (priority: string) => {
  switch (priority) {
    case 'BLOCKER':
    case 'CRITICAL':
      return 'bg-gradient-to-r from-danger via-danger/80 to-danger/60 dark:from-danger-dark dark:via-danger-dark/80 dark:to-danger-dark/60'
    case 'HIGH':
      return 'bg-gradient-to-r from-warning via-warning/80 to-warning/60 dark:from-warning-dark dark:via-warning-dark/80 dark:to-warning-dark/60'
    case 'MEDIUM':
      return 'bg-gradient-to-r from-primary via-primary/80 to-primary/60 dark:from-primary dark:via-primary/80 dark:to-primary/60'
    case 'LOW':
      return 'bg-gradient-to-r from-success via-success/80 to-success/60 dark:from-success-dark dark:via-success-dark/80 dark:to-success-dark/60'
    default:
      return 'bg-gradient-to-r from-primary via-primary/80 to-primary/60'
  }
}

export const JiraDetailModal: React.FC<JiraDetailModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 pointer-events-none">
        <div className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-4 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto pointer-events-auto">
          {/* Header */}
          <div className={`sticky top-0 ${getPriorityHeaderColor(item.priority)} text-white p-6 flex items-start justify-between`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{getChangeTypeIcon(item.changeType)}</span>
                <h2 className="text-heading-2 text-white">
                  {item.issueKey}
                </h2>
              </div>
              <p className="text-body text-white/80 line-clamp-2">
                {item.summary}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-white/70 hover:text-white text-2xl leading-none transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Change Information */}
            <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded-lg border border-neutral-200 dark:border-dark-neutral-200">
              <h3 className="text-heading-4 text-neutral-500 dark:text-dark-neutral-500 mb-4">
                Recent Change
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                    Change Type
                  </span>
                  <span className="text-body text-neutral-500 dark:text-dark-neutral-500">
                    {getChangeTypeLabel(item.changeType)}
                  </span>
                </div>

                {item.fromStatus && item.toStatus && (
                  <div className="flex items-center justify-between">
                    <span className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                      Status
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-neutral-200 dark:bg-dark-neutral-200 rounded text-small">
                        {item.fromStatus}
                      </span>
                      <span className="text-neutral-400 dark:text-dark-neutral-400">→</span>
                      <span className="px-3 py-1 bg-primary text-white rounded text-small">
                        {item.toStatus}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                    Changed By
                  </span>
                  <span className="text-body text-neutral-500 dark:text-dark-neutral-500">
                    {item.changedBy.displayName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                    When
                  </span>
                  <span className="text-body text-neutral-500 dark:text-dark-neutral-500">
                    {timeAgo(item.changedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Issue Details */}
            <div>
              <h3 className="text-heading-4 text-neutral-500 dark:text-dark-neutral-500 mb-3">
                Issue Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold mb-1">
                    Summary
                  </p>
                  <p className="text-body text-neutral-500 dark:text-dark-neutral-500">
                    {item.summary}
                  </p>
                </div>

                <div>
                  <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold mb-1">
                    Project
                  </p>
                  <p className="text-body text-primary hover:underline">
                    {item.projectKey}
                  </p>
                </div>

                <div>
                  <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold mb-1">
                    Issue ID
                  </p>
                  <p className="text-small text-neutral-300 dark:text-dark-neutral-300 font-code break-all">
                    {item.issueId}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Items */}
            {item.changeType === 'BLOCKER' && (
              <div className="bg-danger bg-opacity-10 dark:bg-danger-dark dark:bg-opacity-10 border-l-4 border-danger dark:border-danger-dark p-4 rounded">
                <p className="text-small text-danger dark:text-danger-dark font-semibold mb-2">
                  🚫 This issue is blocked
                </p>
                <p className="text-small text-neutral-500 dark:text-dark-neutral-500">
                  This issue is blocking progress. Consider it a priority to unblock.
                </p>
              </div>
            )}
          </div>

          {/* Footer / Actions */}
          <div className="bg-neutral-50 dark:bg-dark-neutral-50 border-t border-neutral-200 dark:border-dark-neutral-200 p-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-neutral-200 dark:border-dark-neutral-200 text-neutral-500 dark:text-dark-neutral-500 rounded hover:bg-neutral-100 dark:hover:bg-dark-neutral-100 transition-colors"
            >
              Close
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity"
            >
              Open in Jira →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
