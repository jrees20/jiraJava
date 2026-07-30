import React from 'react'
import { OutlookActivityItem } from '@/types'
import { EmailItemCard } from './EmailItemCard'

interface EmailSectionProps {
  emails: OutlookActivityItem[]
  isLoading: boolean
  onEmailClick: (email: OutlookActivityItem) => void
}

export const EmailSection: React.FC<EmailSectionProps> = ({
  emails,
  isLoading,
  onEmailClick,
}) => {
  if (isLoading) {
    return (
      <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
        <h2 className="text-heading-2 mb-4">Critical Emails</h2>
        <p className="text-body text-neutral-400 dark:text-dark-neutral-300">
          Loading emails...
        </p>
      </section>
    )
  }

  if (emails.length === 0) {
    return (
      <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
        <h2 className="text-heading-2 mb-4">Critical Emails</h2>
        <div className="text-center py-12">
          <p className="text-heading-3 text-neutral-400 dark:text-dark-neutral-400 mb-2">
            📭
          </p>
          <p className="text-body text-neutral-400 dark:text-dark-neutral-300">
            All caught up! No critical emails overnight.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
      <h2 className="text-heading-2 mb-4">Critical Emails</h2>
      <div className="space-y-3">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onEmailClick(email)}
            className="cursor-pointer hover:shadow-elevation-1 transition-shadow"
          >
            <EmailItemCard item={email} />
          </div>
        ))}
      </div>
    </section>
  )
}
