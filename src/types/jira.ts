export interface JiraIssue {
  id: string
  key: string
  summary: string
  description?: string
  status: JiraStatus
  priority: JiraPriority
  assignee?: JiraUser
  updated: string
  created: string
  customFields?: Record<string, unknown>
}

export interface JiraStatus {
  id: string
  name: string
  category: 'TODO' | 'IN_PROGRESS' | 'DONE'
}

export type JiraPriority = 'BLOCKER' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export interface JiraUser {
  id: string
  displayName: string
  emailAddress: string
  avatar?: string
}

export interface JiraProject {
  id: string
  key: string
  name: string
  avatar?: string
}

export interface JiraActivityItem {
  issueKey: string
  issueId: string
  summary: string
  projectKey: string
  priority: JiraPriority
  changeType: 'NEW' | 'STATUS_CHANGE' | 'BLOCKER' | 'CLOSED'
  fromStatus?: string
  toStatus?: string
  changedBy: JiraUser
  changedAt: string
  url: string
}
