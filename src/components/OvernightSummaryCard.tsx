import React from 'react'
import { OvernightSummary } from '@/types'

interface OvernightSummaryCardProps {
  summary: OvernightSummary
  isLoading?: boolean
  error?: string
  onRefresh?: () => void
}

const getMetricColor = (metricType: string) => {
  switch (metricType) {
    case 'jiraItemsRequiringAction':
      return {
        bg: 'bg-gradient-to-br from-danger/10 to-white dark:from-danger-dark/10 dark:to-dark-neutral-100',
        border: 'border-danger/30 dark:border-danger-dark/30',
        icon: '🚨',
        color: 'text-danger dark:text-danger-dark',
      }
    case 'escalationsAssigned':
      return {
        bg: 'bg-gradient-to-br from-warning/10 to-white dark:from-warning-dark/10 dark:to-dark-neutral-100',
        border: 'border-warning/30 dark:border-warning-dark/30',
        icon: '⬆️',
        color: 'text-warning dark:text-warning-dark',
      }
    case 'itemsResolved':
      return {
        bg: 'bg-gradient-to-br from-success/10 to-white dark:from-success-dark/10 dark:to-dark-neutral-100',
        border: 'border-success/30 dark:border-success-dark/30',
        icon: '✅',
        color: 'text-success dark:text-success-dark',
      }
    case 'itemsClosed':
      return {
        bg: 'bg-gradient-to-br from-primary/10 to-white dark:from-primary/10 dark:to-dark-neutral-100',
        border: 'border-primary/30 dark:border-primary/30',
        icon: '🔒',
        color: 'text-primary dark:text-primary',
      }
    case 'criticalEmailsOlderThan48h':
      return {
        bg: 'bg-gradient-to-br from-danger/10 to-white dark:from-danger-dark/10 dark:to-dark-neutral-100',
        border: 'border-danger/30 dark:border-danger-dark/30',
        icon: '📧',
        color: 'text-danger dark:text-danger-dark',
      }
    case 'unacceptedMeetings':
      return {
        bg: 'bg-gradient-to-br from-warning/10 to-white dark:from-warning-dark/10 dark:to-dark-neutral-100',
        border: 'border-warning/30 dark:border-warning-dark/30',
        icon: '📅',
        color: 'text-warning dark:text-warning-dark',
      }
    case 'calendarConflicts':
      return {
        bg: 'bg-gradient-to-br from-danger/10 to-white dark:from-danger-dark/10 dark:to-dark-neutral-100',
        border: 'border-danger/30 dark:border-danger-dark/30',
        icon: '⚡',
        color: 'text-danger dark:text-danger-dark',
      }
    default:
      return {
        bg: 'bg-gradient-to-br from-primary/10 to-white dark:from-primary/10 dark:to-dark-neutral-100',
        border: 'border-primary/30 dark:border-primary/30',
        icon: '📊',
        color: 'text-primary dark:text-primary',
      }
  }
}

const getMetricLabel = (metricType: string) => {
  switch (metricType) {
    case 'jiraItemsRequiringAction':
      return 'Items Requiring Action'
    case 'escalationsAssigned':
      return 'Escalations Assigned'
    case 'itemsResolved':
      return 'Items Resolved'
    case 'itemsClosed':
      return 'Items Closed'
    case 'criticalEmailsOlderThan48h':
      return 'Critical Emails (48h+)'
    case 'unacceptedMeetings':
      return 'Unaccepted Meetings'
    case 'calendarConflicts':
      return 'Calendar Conflicts'
    default:
      return 'Metric'
  }
}

export const OvernightSummaryCard: React.FC<OvernightSummaryCardProps> = ({
  summary,
  isLoading = false,
  error,
  onRefresh,
}) => {
  if (isLoading) {
    return (
      <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
        <h2 className="text-heading-2 mb-4">What Changed Overnight</h2>
        <p className="text-body text-neutral-400 dark:text-dark-neutral-300">Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
        <h2 className="text-heading-2 mb-4">What Changed Overnight</h2>
        <div className="bg-danger/10 dark:bg-danger-dark/10 border border-danger/30 dark:border-danger-dark/30 rounded-lg p-4">
          <p className="text-body text-danger dark:text-danger-dark">{error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="mt-3 px-4 py-2 bg-danger dark:bg-danger-dark text-white rounded hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          )}
        </div>
      </section>
    )
  }

  const metrics = [
    { key: 'jiraItemsRequiringAction', value: summary.metrics.jiraItemsRequiringAction },
    { key: 'escalationsAssigned', value: summary.metrics.escalationsAssigned },
    { key: 'itemsResolved', value: summary.metrics.itemsResolved },
    { key: 'itemsClosed', value: summary.metrics.itemsClosed },
    { key: 'criticalEmailsOlderThan48h', value: summary.metrics.criticalEmailsOlderThan48h },
    { key: 'unacceptedMeetings', value: summary.metrics.unacceptedMeetings },
    { key: 'calendarConflicts', value: summary.metrics.calendarConflicts },
  ]

  return (
    <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
      <h2 className="text-heading-2 mb-6">What Changed Overnight</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map(({ key, value }) => {
          const colors = getMetricColor(key)
          const label = getMetricLabel(key)

          return (
            <div
              key={key}
              className={`rounded-lg p-4 border-2 transition-all hover:shadow-elevation-1 ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold flex-1">
                  {label}
                </p>
                <span className="text-lg">{colors.icon}</span>
              </div>
              <div className={`text-heading-1 font-bold ${colors.color}`}>{value}</div>
            </div>
          )
        })}
      </div>

      {/* Biggest Risk Box */}
      <div className="bg-gradient-to-r from-danger/10 via-white to-white dark:from-danger-dark/10 dark:via-dark-neutral-100 dark:to-dark-neutral-100 border-l-4 border-danger dark:border-danger-dark p-6 rounded-lg mb-6">
        <p className="text-small text-danger dark:text-danger-dark font-bold mb-2">🎯 Biggest Risk:</p>
        <p className="text-body text-neutral-500 dark:text-dark-neutral-500">
          {summary.biggestRisk.description}
        </p>
      </div>

      {/* Recommended Actions */}
      <div className="mb-6">
        <p className="text-heading-4 text-neutral-500 dark:text-dark-neutral-500 mb-3 font-semibold">
          📋 Recommended First Actions:
        </p>
        <ol className="space-y-2">
          {summary.recommendedActions.map((action) => (
            <li key={action.id} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-small font-bold flex items-center justify-center">
                {action.priority}
              </span>
              <div>
                <p className="text-body text-neutral-500 dark:text-dark-neutral-500 font-medium">
                  {action.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-dark-neutral-200">
        <p className="text-small text-neutral-400 dark:text-dark-neutral-300">
          ⟲ Last updated: {new Date(summary.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (just now)
        </p>
        {onRefresh && (
          <div className="flex gap-3">
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-neutral-100 dark:bg-dark-neutral-200 text-neutral-500 dark:text-dark-neutral-500 rounded-lg hover:bg-neutral-200 dark:hover:bg-dark-neutral-300 transition-colors font-semibold text-small"
            >
              ↻ Refresh
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-small">
              View Details →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
