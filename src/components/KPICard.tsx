import React from 'react'
import { KPIMetric } from '@/types'

interface KPICardProps {
  metric: KPIMetric
  onClick?: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'GREEN':
      return {
        bg: 'bg-gradient-to-br from-success/10 to-white dark:from-success-dark/10 dark:to-dark-neutral-100',
        border: 'border-success/30 dark:border-success-dark/30',
        text: 'text-success dark:text-success-dark',
        icon: '🟢',
      }
    case 'YELLOW':
      return {
        bg: 'bg-gradient-to-br from-warning/10 to-white dark:from-warning-dark/10 dark:to-dark-neutral-100',
        border: 'border-warning/30 dark:border-warning-dark/30',
        text: 'text-warning dark:text-warning-dark',
        icon: '🟡',
      }
    case 'RED':
      return {
        bg: 'bg-gradient-to-br from-danger/10 to-white dark:from-danger-dark/10 dark:to-dark-neutral-100',
        border: 'border-danger/30 dark:border-danger-dark/30',
        text: 'text-danger dark:text-danger-dark',
        icon: '🔴',
      }
    default:
      return {
        bg: 'bg-gradient-to-br from-primary/10 to-white dark:from-primary/10 dark:to-dark-neutral-100',
        border: 'border-primary/30 dark:border-primary/30',
        text: 'text-primary dark:text-primary',
        icon: '◯',
      }
  }
}

const getTrendIcon = (trend: string, status: string) => {
  if (trend === 'UP') {
    return status === 'RED' ? '🔺' : status === 'GREEN' ? '📈' : '⬆️'
  }
  if (trend === 'DOWN') {
    return status === 'GREEN' ? '🔻' : status === 'RED' ? '📉' : '⬇️'
  }
  return '➡️'
}

export const KPICard: React.FC<KPICardProps> = ({ metric, onClick }) => {
  const statusColors = getStatusColor(metric.status)

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg p-6 border-2 transition-all hover:shadow-elevation-3 hover:translate-y-(-2px) ${statusColors.bg} ${statusColors.border} group`}
    >
      {/* Top: Status Icon + Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold mb-1">
            {metric.title}
          </p>
        </div>
        <span className="text-lg">{statusColors.icon}</span>
      </div>

      {/* Large Value */}
      <div className={`text-6xl font-bold mb-3 ${statusColors.text} group-hover:scale-105 transition-transform origin-left`}>
        {metric.value}
      </div>

      {/* Trend */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{getTrendIcon(metric.trend, metric.status)}</span>
        <span className={`text-small font-bold ${statusColors.text}`}>
          {metric.trendPercent > 0 ? '+' : ''}{metric.trendPercent}%
        </span>
      </div>

      {/* Detail Text */}
      <p className="text-small text-neutral-500 dark:text-dark-neutral-400 mb-3 min-h-5">
        {metric.detail}
      </p>

      {/* Footer CTA */}
      <div className={`text-xs font-semibold ${statusColors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
        Click to explore →
      </div>
    </button>
  )
}
