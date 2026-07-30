import { OutlookCalendarEvent } from './outlook'

export interface CalendarConflict {
  id: string
  primary: OutlookCalendarEvent
  conflicts: OutlookCalendarEvent[]
  severity: 'OVERLAP' | 'BACK_TO_BACK'
  overlapMinutes: number
  suggestedActions?: string[]
}

export interface CalendarIssueItem {
  event: OutlookCalendarEvent
  issueType: 'CONFLICT' | 'UNACCEPTED' | 'DUPLICATE'
  message: string
  overlappingEvent?: OutlookCalendarEvent
  attendeeCount: number
}
