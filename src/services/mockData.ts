import {
  ExecutiveDashboard,
  OvernightSummary,
  KPIMetric,
  JiraActivityItem,
  OutlookActivityItem,
  CalendarIssueItem,
} from '@/types'

const now = new Date()
const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000)
const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000)
const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000)

export const mockOvernightSummary: OvernightSummary = {
  id: 'summary-1',
  userId: 'user-1',
  generatedAt: now.toISOString(),
  generatedFromDate: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
  generatedToDate: now.toISOString(),
  metrics: {
    jiraItemsRequiringAction: 3,
    escalationsAssigned: 2,
    itemsResolved: 5,
    itemsClosed: 3,
    criticalEmailsOlderThan48h: 1,
    unacceptedMeetings: 2,
    calendarConflicts: 1,
  },
  biggestRisk: {
    description:
      'ANB Sprint 1 integration testing is blocked by API access. Assign @Sarah or @Mike ASAP.',
    severity: 'CRITICAL',
  },
  recommendedActions: [
    {
      id: 'action-1',
      priority: 1,
      description: 'Review DAIS-123 (5 min)',
      estimatedMinutes: 5,
      actionType: 'REVIEW_ISSUE',
      targetId: 'DAIS-123',
    },
    {
      id: 'action-2',
      priority: 2,
      description: "Respond to Charlie's design question (10 min)",
      estimatedMinutes: 10,
      actionType: 'RESPOND_EMAIL',
      targetId: 'email-2',
    },
    {
      id: 'action-3',
      priority: 3,
      description: 'Accept Architecture Review meeting (2 min)',
      estimatedMinutes: 2,
      actionType: 'ACCEPT_MEETING',
      targetId: 'event-1',
    },
  ],
  lastUpdated: now.toISOString(),
  dataAgeSeconds: 30,
}

export const mockKPIMetrics: KPIMetric[] = [
  {
    id: 'kpi-1',
    title: "Today's Attention Score",
    value: 78,
    status: 'YELLOW',
    trend: 'UP',
    trendPercent: 12,
    detail: 'Up from 66 yesterday',
    threshold: { good: 50, critical: 85 },
  },
  {
    id: 'kpi-2',
    title: 'Open Actions',
    value: 8,
    status: 'YELLOW',
    trend: 'STABLE',
    trendPercent: 0,
    detail: '5 require response today',
    threshold: { good: 5, critical: 12 },
  },
  {
    id: 'kpi-3',
    title: 'Critical Items',
    value: 1,
    status: 'RED',
    trend: 'DOWN',
    trendPercent: -5,
    detail: 'API access blocker',
    threshold: { good: 0, critical: 1 },
  },
  {
    id: 'kpi-4',
    title: 'Aging Emails',
    value: 2,
    status: 'YELLOW',
    trend: 'UP',
    trendPercent: 33,
    detail: '48+ hours without response',
    threshold: { good: 0, critical: 3 },
  },
  {
    id: 'kpi-5',
    title: 'Unaccepted Meetings',
    value: 2,
    status: 'YELLOW',
    trend: 'STABLE',
    trendPercent: 0,
    detail: 'Response required',
    threshold: { good: 0, critical: 5 },
  },
  {
    id: 'kpi-6',
    title: 'Jira Updates',
    value: 12,
    status: 'GREEN',
    trend: 'UP',
    trendPercent: 20,
    detail: 'Team activity overnight',
    threshold: { good: 10, critical: 20 },
  },
  {
    id: 'kpi-7',
    title: 'Calendar Conflicts',
    value: 1,
    status: 'RED',
    trend: 'STABLE',
    trendPercent: 0,
    detail: 'Tomorrow 9:00-10:00 AM',
    threshold: { good: 0, critical: 1 },
  },
  {
    id: 'kpi-8',
    title: 'Escalations This Week',
    value: 5,
    status: 'YELLOW',
    trend: 'UP',
    trendPercent: 67,
    detail: '3 new overnight',
    threshold: { good: 2, critical: 8 },
  },
]

export const mockJiraActivity: JiraActivityItem[] = [
  {
    issueKey: 'DAIS-123',
    issueId: 'issue-1',
    summary: 'API authentication not working in staging',
    projectKey: 'DAIS',
    priority: 'CRITICAL',
    changeType: 'BLOCKER',
    fromStatus: 'In Progress',
    toStatus: 'Blocked',
    changedBy: {
      id: 'user-2',
      displayName: 'Alex Chen',
      emailAddress: 'alex.chen@company.com',
    },
    changedAt: eightHoursAgo.toISOString(),
    url: 'https://jira.atlassian.net/browse/DAIS-123',
  },
  {
    issueKey: 'DAIS-987',
    issueId: 'issue-2',
    summary: 'Database migration script completed',
    projectKey: 'DAIS',
    priority: 'HIGH',
    changeType: 'STATUS_CHANGE',
    fromStatus: 'In Progress',
    toStatus: 'Resolved',
    changedBy: {
      id: 'user-3',
      displayName: 'Charlie Wong',
      emailAddress: 'charlie.wong@company.com',
    },
    changedAt: sixHoursAgo.toISOString(),
    url: 'https://jira.atlassian.net/browse/DAIS-987',
  },
  {
    issueKey: 'DAIS-551',
    issueId: 'issue-3',
    summary: 'Frontend component review needed - you were mentioned',
    projectKey: 'DAIS',
    priority: 'MEDIUM',
    changeType: 'NEW',
    changedBy: {
      id: 'user-4',
      displayName: 'Sarah Martinez',
      emailAddress: 'sarah.martinez@company.com',
    },
    changedAt: fourHoursAgo.toISOString(),
    url: 'https://jira.atlassian.net/browse/DAIS-551',
  },
]

export const mockEmails: OutlookActivityItem[] = [
  {
    id: 'email-1',
    type: 'CRITICAL_EMAIL',
    severity: 'CRITICAL',
    reason: 'Flagged and requires immediate action',
    email: {
      id: 'outlook-email-1',
      subject: 'ACTION REQUIRED: Q3 Roadmap Approval 🚩',
      bodyPreview:
        'We need your approval on the Q3 roadmap update. The engineering and product teams are waiting for your sign-off before we can finalize the timeline and resource allocation. Please review the attached document and confirm by EOD.',
      from: {
        emailAddress: {
          address: 'jennifer.wong@company.com',
          name: 'Jennifer Wong',
        },
      },
      receivedDateTime: fourHoursAgo.toISOString(),
      flag: { flagStatus: 'flagged' },
      hasAttachments: true,
      isRead: false,
      conversationId: 'conv-1',
      webLink: 'https://outlook.office365.com/mail/inbox/email-1',
    },
  },
  {
    id: 'email-2',
    type: 'ACTION_REQUIRED',
    severity: 'WARNING',
    reason: 'Awaiting your response',
    email: {
      id: 'outlook-email-2',
      subject: 'Design Review: New Dashboard Layout',
      bodyPreview:
        "Hi, I've uploaded the new dashboard mockups for your review. Can you provide feedback on the layout changes by tomorrow? The design team is ready to implement once we get your approval.",
      from: {
        emailAddress: {
          address: 'charlie.design@company.com',
          name: 'Charlie Design',
        },
      },
      receivedDateTime: sixHoursAgo.toISOString(),
      flag: { flagStatus: 'notFlagged' },
      hasAttachments: true,
      isRead: false,
      conversationId: 'conv-2',
      webLink: 'https://outlook.office365.com/mail/inbox/email-2',
    },
  },
  {
    id: 'email-3',
    type: 'CRITICAL_EMAIL',
    severity: 'CRITICAL',
    reason: '48+ hours old without response',
    email: {
      id: 'outlook-email-3',
      subject: 'Budget Approval Needed - Project Phoenix',
      bodyPreview:
        'This is a follow-up on the budget approval for Project Phoenix that was sent 2 days ago. We need your confirmation to proceed with vendor contracts. Please let me know if you have any questions.',
      from: {
        emailAddress: {
          address: 'finance@company.com',
          name: 'Finance Team',
        },
      },
      receivedDateTime: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      flag: { flagStatus: 'notFlagged' },
      hasAttachments: false,
      isRead: true,
      conversationId: 'conv-3',
      webLink: 'https://outlook.office365.com/mail/inbox/email-3',
    },
  },
]

export const mockCalendarIssues: CalendarIssueItem[] = [
  {
    event: {
      id: 'event-1',
      subject: 'Architecture Review',
      start: {
        dateTime: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: [
        {
          emailAddress: {
            address: 'you@company.com',
            name: 'You',
          },
          type: 'required',
        },
        {
          emailAddress: {
            address: 'michael.johnson@company.com',
            name: 'Michael Johnson',
          },
          type: 'required',
        },
        {
          emailAddress: {
            address: 'team@company.com',
            name: 'Engineering Team',
          },
          type: 'optional',
        },
      ],
      organizer: {
        emailAddress: {
          address: 'michael.johnson@company.com',
          name: 'Michael Johnson',
        },
      },
      responseStatus: { response: 'tentativelyAccepted' },
      bodyPreview: 'Discussion of system architecture and design patterns',
      webLink: 'https://outlook.office365.com/calendar/event-1',
      isReminderOn: true,
    },
    issueType: 'CONFLICT',
    message: 'Overlaps with Q3 Planning (9:30 AM - 11:00 AM)',
    overlappingEvent: {
      id: 'event-2',
      subject: 'Q3 Planning',
      start: {
        dateTime: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 9.5 * 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: [],
      organizer: {
        emailAddress: {
          address: 'pm@company.com',
          name: 'Product Manager',
        },
      },
      bodyPreview: 'Quarterly planning session',
      webLink: 'https://outlook.office365.com/calendar/event-2',
      isReminderOn: true,
    },
    attendeeCount: 12,
  },
]

export const mockDashboard: ExecutiveDashboard = {
  id: 'dashboard-1',
  userId: 'user-1',
  generatedAt: now.toISOString(),
  metrics: mockKPIMetrics,
  summary: mockOvernightSummary,
  jiraActivity: mockJiraActivity,
  outlookActivity: mockEmails,
  calendarIssues: mockCalendarIssues,
}

export function getMockDashboard(): ExecutiveDashboard {
  return mockDashboard
}

export function getMockOvernightSummary(): OvernightSummary {
  return mockOvernightSummary
}

export function getMockEmails(): OutlookActivityItem[] {
  return mockEmails
}

export function getMockJiraActivity(): JiraActivityItem[] {
  return mockJiraActivity
}

export function getMockCalendarIssues(): CalendarIssueItem[] {
  return mockCalendarIssues
}
