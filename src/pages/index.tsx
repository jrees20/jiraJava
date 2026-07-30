import React, { useState } from 'react'
import Head from 'next/head'
import { EmailSection } from '@/components/EmailSection'
import { EmailDetailModal } from '@/components/EmailDetailModal'
import { JiraSection } from '@/components/JiraSection'
import { JiraDetailModal } from '@/components/JiraDetailModal'
import { OutlookActivityItem, JiraActivityItem } from '@/types'
import { getMockEmails, getMockJiraActivity } from '@/services/mockData'

interface PageProps {
  isDarkMode?: boolean
  toggleTheme?: () => void
}

export default function Home({ isDarkMode, toggleTheme }: PageProps) {
  const [selectedEmail, setSelectedEmail] = useState<OutlookActivityItem | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [selectedJiraItem, setSelectedJiraItem] = useState<JiraActivityItem | null>(null)
  const [isJiraModalOpen, setIsJiraModalOpen] = useState(false)

  const mockEmails = getMockEmails()
  const mockJiraItems = getMockJiraActivity()

  const handleEmailClick = (email: OutlookActivityItem) => {
    setSelectedEmail(email)
    setIsEmailModalOpen(true)
  }

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false)
    setSelectedEmail(null)
  }

  const handleJiraClick = (item: JiraActivityItem) => {
    setSelectedJiraItem(item)
    setIsJiraModalOpen(true)
  }

  const handleCloseJiraModal = () => {
    setIsJiraModalOpen(false)
    setSelectedJiraItem(null)
  }

  return (
    <>
      <Head>
        <title>Morning Command Center - Dashboard</title>
      </Head>

      <div className="min-h-screen bg-neutral-50 dark:bg-dark-neutral-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-dark-neutral-100 border-b border-neutral-200 dark:border-dark-neutral-200 shadow-elevation-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="text-heading-4">🏠</div>
                <h1 className="text-heading-4">Morning Command Center</h1>
              </div>

              <nav className="hidden md:flex items-center space-x-6">
                <a href="/" className="text-body text-neutral-500 dark:text-dark-neutral-400 hover:text-neutral-400 dark:hover:text-dark-neutral-300 transition-colors">
                  Dashboard
                </a>
                <a href="/overnight" className="text-body text-neutral-500 dark:text-dark-neutral-400 hover:text-neutral-400 dark:hover:text-dark-neutral-300 transition-colors">
                  Overnight Summary
                </a>
                <a href="/settings" className="text-body text-neutral-500 dark:text-dark-neutral-400 hover:text-neutral-400 dark:hover:text-dark-neutral-300 transition-colors">
                  Settings
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-neutral-200 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-neutral-200 transition-colors">
                  ⚙️
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-dark-neutral-200 transition-colors">
                  👤
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Hero Section */}
          <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
            <h2 className="text-heading-2 mb-4">What Changed Overnight</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded">
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300">Jira Items</p>
                <p className="text-heading-3">3</p>
              </div>
              <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded">
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300">Escalations</p>
                <p className="text-heading-3">2</p>
              </div>
              <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded">
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300">Resolved</p>
                <p className="text-heading-3">5</p>
              </div>
              <div className="bg-neutral-50 dark:bg-dark-neutral-50 p-4 rounded">
                <p className="text-small text-neutral-400 dark:text-dark-neutral-300">Critical Emails</p>
                <p className="text-heading-3">1</p>
              </div>
            </div>

            <div className="bg-danger bg-opacity-10 dark:bg-danger-dark dark:bg-opacity-10 border-l-4 border-danger dark:border-danger-dark p-4 rounded mb-6">
              <p className="font-semibold text-neutral-500 dark:text-dark-neutral-400">Biggest Risk:</p>
              <p className="text-body text-neutral-400 dark:text-dark-neutral-300 mt-2">
                ANB Sprint 1 integration testing is blocked by API access. Assign @Sarah or @Mike ASAP.
              </p>
            </div>

            <div>
              <p className="font-semibold text-neutral-500 dark:text-dark-neutral-400 mb-3">Recommended First Actions:</p>
              <ol className="space-y-2">
                <li className="text-body text-neutral-400 dark:text-dark-neutral-300">
                  1. Review DAIS-123 (5 min)
                </li>
                <li className="text-body text-neutral-400 dark:text-dark-neutral-300">
                  2. Respond to Charlie's design question (10 min)
                </li>
                <li className="text-body text-neutral-400 dark:text-dark-neutral-300">
                  3. Accept Architecture Review meeting (2 min)
                </li>
              </ol>
            </div>

            <div className="mt-6 flex items-center justify-between text-small text-neutral-300 dark:text-dark-neutral-400">
              <p>⟲ Last updated: 8:15 AM (just now)</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity">
                  Refresh
                </button>
                <button className="px-4 py-2 border border-neutral-200 dark:border-dark-neutral-200 rounded hover:bg-neutral-50 dark:hover:bg-dark-neutral-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </section>

          {/* KPI Grid */}
          <section>
            <h2 className="text-heading-2 mb-4">Executive Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Today's Attention", value: 78, trend: 'UP', percent: 12 },
                { title: 'Open Actions', value: 8, trend: 'STABLE', percent: 0 },
                { title: 'Critical Items', value: 1, trend: 'DOWN', percent: -5 },
                { title: 'Aging Emails', value: 2, trend: 'UP', percent: 33 },
              ].map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200 hover:shadow-elevation-3 transition-shadow cursor-pointer"
                >
                  <p className="text-small text-neutral-400 dark:text-dark-neutral-300 mb-4">{kpi.title}</p>
                  <div className="text-heading-1 text-neutral-500 dark:text-dark-neutral-500 mb-2">{kpi.value}</div>
                  <div className="flex items-center">
                    <span className={kpi.trend === 'UP' ? 'text-danger dark:text-danger-dark' : kpi.trend === 'DOWN' ? 'text-success dark:text-success-dark' : 'text-neutral-400'}>
                      {kpi.trend === 'UP' ? '🔺' : kpi.trend === 'DOWN' ? '🔻' : '➡️'}
                    </span>
                    <span className="ml-2 text-small text-neutral-400 dark:text-dark-neutral-300">
                      {kpi.percent > 0 ? '+' : ''}{kpi.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Placeholder for upcoming sections */}
          <JiraSection
            items={mockJiraItems}
            isLoading={false}
            onItemClick={handleJiraClick}
          />

          <EmailSection
            emails={mockEmails}
            isLoading={false}
            onEmailClick={handleEmailClick}
          />

          <section className="bg-white dark:bg-dark-neutral-100 rounded-lg shadow-elevation-2 p-6 border border-neutral-200 dark:border-dark-neutral-200">
            <h2 className="text-heading-2 mb-4">Calendar Issues</h2>
            <p className="text-body text-neutral-400 dark:text-dark-neutral-300">
              Component coming soon - displays calendar conflicts and unaccepted meetings
            </p>
          </section>
        </main>
      </div>

      <EmailDetailModal
        email={selectedEmail}
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
      />

      <JiraDetailModal
        item={selectedJiraItem}
        isOpen={isJiraModalOpen}
        onClose={handleCloseJiraModal}
      />
    </>
  )
}
