import { JiraActivityItem } from './jira'
import { OutlookActivityItem } from './outlook'
import { CalendarIssueItem } from './calendar'

export interface KPIMetric {
  id: string
  title: string
  value: number
  status: 'GREEN' | 'YELLOW' | 'RED'
  trend: 'UP' | 'DOWN' | 'STABLE'
  trendPercent: number
  detail: string
  threshold: {
    good: number
    critical: number
  }
}

export interface OvernightSummary {
  id: string
  userId: string
  generatedAt: string
  generatedFromDate: string
  generatedToDate: string
  metrics: {
    jiraItemsRequiringAction: number
    escalationsAssigned: number
    itemsResolved: number
    itemsClosed: number
    criticalEmailsOlderThan48h: number
    unacceptedMeetings: number
    calendarConflicts: number
  }
  biggestRisk: {
    description: string
    relatedIssue?: JiraActivityItem
    severity: 'CRITICAL' | 'WARNING'
  }
  recommendedActions: RecommendedAction[]
  lastUpdated: string
  dataAgeSeconds?: number
}

export interface RecommendedAction {
  id: string
  priority: number
  description: string
  estimatedMinutes: number
  actionType: 'REVIEW_ISSUE' | 'RESPOND_EMAIL' | 'ACCEPT_MEETING' | 'RESOLVE_CONFLICT'
  targetId: string
  targetUrl?: string
}

export interface ExecutiveDashboard {
  id: string
  userId: string
  generatedAt: string
  metrics: KPIMetric[]
  summary: OvernightSummary
  jiraActivity: JiraActivityItem[]
  outlookActivity: OutlookActivityItem[]
  calendarIssues: CalendarIssueItem[]
}

export interface DashboardState {
  isLoading: boolean
  error?: string
  data?: ExecutiveDashboard
  lastFetched?: string
}
