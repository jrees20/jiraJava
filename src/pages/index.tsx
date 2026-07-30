import React, { useState } from 'react'
import Head from 'next/head'
import { EmailSection } from '@/components/EmailSection'
import { EmailDetailModal } from '@/components/EmailDetailModal'
import { JiraSection } from '@/components/JiraSection'
import { JiraDetailModal } from '@/components/JiraDetailModal'
import { KPICard } from '@/components/KPICard'
import { OvernightSummaryCard } from '@/components/OvernightSummaryCard'
import { OutlookActivityItem, JiraActivityItem } from '@/types'
import { getMockEmails, getMockJiraActivity, mockKPIMetrics, mockOvernightSummary } from '@/services/mockData'

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
          {/* Hero Section - What Changed Overnight */}
          <OvernightSummaryCard
            summary={mockOvernightSummary}
            isLoading={false}
            onRefresh={() => {
              // TODO: Refresh overnight summary
            }}
          />

          {/* KPI Grid */}
          <section>
            <h2 className="text-heading-2 mb-6">Executive Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {mockKPIMetrics.map((metric) => (
                <KPICard
                  key={metric.id}
                  metric={metric}
                  onClick={() => {
                    // TODO: Navigate to drill-down view
                  }}
                />
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
