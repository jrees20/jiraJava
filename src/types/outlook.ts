export interface OutlookEmail {
  id: string
  subject: string
  bodyPreview: string
  from: OutlookEmailAddress
  receivedDateTime: string
  flag?: {
    flagStatus: 'flagged' | 'complete' | 'notFlagged'
  }
  hasAttachments: boolean
  isRead: boolean
  categories?: string[]
  conversationId: string
  webLink: string
}

export interface OutlookEmailAddress {
  emailAddress: {
    address: string
    name: string
  }
}

export interface OutlookCalendarEvent {
  id: string
  subject: string
  start: OutlookDateTime
  end: OutlookDateTime
  attendees: OutlookAttendee[]
  organizer: OutlookEmailAddress
  responseStatus?: {
    response: 'accepted' | 'tentativelyAccepted' | 'declined' | 'notResponded'
  }
  bodyPreview: string
  webLink: string
  isReminderOn: boolean
  isOnlineMeeting?: boolean
}

export interface OutlookDateTime {
  dateTime: string
  timeZone: string
}

export interface OutlookAttendee {
  emailAddress: {
    address: string
    name: string
  }
  status?: {
    response: 'accepted' | 'tentativelyAccepted' | 'declined' | 'notResponded'
    time?: string
  }
  type: 'required' | 'optional' | 'resource'
}

export interface OutlookActivityItem {
  id: string
  type: 'CRITICAL_EMAIL' | 'AGING_EMAIL' | 'ACTION_REQUIRED'
  email: OutlookEmail
  severity: 'CRITICAL' | 'WARNING' | 'INFO'
  reason: string
  actionUrl?: string
}
