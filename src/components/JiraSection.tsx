import React from 'react'
import { JiraActivityItem } from '@/types'
import { JiraItemCard } from './JiraItemCard'

interface JiraSectionProps {
  items: JiraActivityItem[]
  isLoading: boolean
  onItemClick: (item: JiraActivityItem) => void
}

export const JiraSection: React.FC<JiraSectionProps> = ({
  items,
  isLoading,
  onItemClick,
}) => {
  if (isLoading) {
    return (
      <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
        <h2 className="text-heading-2 mb-4">Overnight Jira Activity</h2>
        <p className="text-body text-neutral-400 dark:text-dark-neutral-300">
          Loading Jira activity...
        </p>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
        <h2 className="text-heading-2 mb-4">Overnight Jira Activity</h2>
        <div className="text-center py-12">
          <p className="text-heading-3 text-neutral-400 dark:text-dark-neutral-400 mb-2">
            ✨
          </p>
          <p className="text-body text-neutral-400 dark:text-dark-neutral-300">
            No Jira activity overnight — nice and quiet!
          </p>
        </div>
      </section>
    )
  }

  // Group items by change type
  const groupedItems: Record<string, JiraActivityItem[]> = {}
  items.forEach((item) => {
    const type = item.changeType
    if (!groupedItems[type]) {
      groupedItems[type] = []
    }
    groupedItems[type].push(item)
  })

  const getGroupLabel = (changeType: string) => {
    switch (changeType) {
      case 'NEW':
        return '✨ New Issues'
      case 'STATUS_CHANGE':
        return '↔️ Status Changes'
      case 'BLOCKER':
        return '🚫 Blockers'
      case 'CLOSED':
        return '✅ Closed'
      default:
        return 'Updates'
    }
  }

  const groupOrder = ['BLOCKER', 'NEW', 'STATUS_CHANGE', 'CLOSED']
  const orderedGroups = groupOrder.filter((type) => groupedItems[type])

  return (
    <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
      <h2 className="text-heading-2 mb-6">Overnight Jira Activity</h2>

      <div className="space-y-6">
        {orderedGroups.map((groupType) => (
          <div key={groupType}>
            <h3 className="text-heading-4 text-neutral-500 dark:text-dark-neutral-500 mb-3">
              {getGroupLabel(groupType)} ({groupedItems[groupType].length})
            </h3>
            <div className="space-y-2">
              {groupedItems[groupType].map((item) => (
                <div
                  key={item.issueId}
                  onClick={() => onItemClick(item)}
                  className="cursor-pointer hover:shadow-elevation-1 transition-shadow"
                >
                  <JiraItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
