import React from 'react'
import { OutlookActivityItem } from '@/types'

interface EmailDetailModalProps {
  email: OutlookActivityItem | null
  isOpen: boolean
  onClose: () => void
}

export const EmailDetailModal: React.FC<EmailDetailModalProps> = ({
  email,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !email) return null

  const { item } = email

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
          <div className="sticky top-0 bg-white dark:bg-dark-neutral-100 border-b border-neutral-200 dark:border-dark-neutral-200 p-6 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-heading-2 text-neutral-500 dark:text-dark-neutral-500 truncate">
                {item.subject}
              </h2>
              <p className="text-small text-neutral-400 dark:text-dark-neutral-300 mt-1">
                From: {item.from.emailAddress.name || item.from.emailAddress.address}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 text-neutral-400 dark:text-dark-neutral-400 hover:text-neutral-500 dark:hover:text-dark-neutral-300 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-200 dark:border-dark-neutral-200">
              <div>
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                  From
                </p>
                <p className="text-body text-neutral-500 dark:text-dark-neutral-500 mt-1">
                  {item.from.emailAddress.name || item.from.emailAddress.address}
                </p>
              </div>
              <div>
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                  Date
                </p>
                <p className="text-body text-neutral-500 dark:text-dark-neutral-500 mt-1">
                  {new Date(item.receivedDateTime).toLocaleString()}
                </p>
              </div>
              {item.hasAttachments && (
                <div>
                  <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                    Attachments
                  </p>
                  <p className="text-body text-neutral-500 dark:text-dark-neutral-500 mt-1">
                    📎 This email has attachments
                  </p>
                </div>
              )}
              <div>
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold">
                  Status
                </p>
                <p className="text-body text-neutral-500 dark:text-dark-neutral-500 mt-1">
                  {item.email.flag?.flagStatus === 'flagged' ? '🚩 Flagged' : 'Received'}
                </p>
              </div>
            </div>

            {/* Email Body */}
            <div>
              <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold mb-3">
                Message
              </p>
              <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded-lg border border-neutral-200 dark:border-dark-neutral-200">
                <p className="text-body text-neutral-500 dark:text-dark-neutral-500 whitespace-pre-wrap">
                  {item.email.bodyPreview}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded-lg border border-neutral-200 dark:border-dark-neutral-200">
              <p className="text-small text-neutral-400 dark:text-dark-neutral-300 font-semibold mb-2">
                Email ID
              </p>
              <p className="text-small text-neutral-300 dark:text-dark-neutral-300 font-code break-all">
                {item.email.id}
              </p>
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="bg-neutral-50 dark:bg-dark-neutral-50 border-t border-neutral-200 dark:border-dark-neutral-200 p-6 flex items-center justify-between gap-4">
            <p className="text-small text-neutral-400 dark:text-dark-neutral-300">
              {item.reason}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-neutral-200 dark:border-dark-neutral-200 text-neutral-500 dark:text-dark-neutral-500 rounded hover:bg-neutral-100 dark:hover:bg-dark-neutral-100 transition-colors"
              >
                Close
              </button>
              <a
                href={item.email.webLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity"
              >
                Open in Outlook →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
