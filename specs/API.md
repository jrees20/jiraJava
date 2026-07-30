# API Specification

## Base Configuration

```
Base URL: /api
Authentication: Bearer {token}
Response Format: JSON
Content-Type: application/json
```

---

## Core Endpoints

### 1. Get Overnight Summary

**Endpoint:** `GET /api/overnight-summary`

**Query Parameters:**
```
date?: string          // YYYY-MM-DD format, defaults to today
includeDetails?: boolean // true = include raw jiraItems/emailItems/calendarItems
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "data": {
    "id": "uuid",
    "userId": "user-uuid",
    "generatedAt": "2025-07-30T08:15:00Z",
    "generatedFromData": "2025-07-29T06:00:00Z",
    
    "metrics": {
      "jiraItemsRequiringAction": 3,
      "escalationsAssigned": 2,
      "itemsResolved": 5,
      "itemsClosed": 3,
      "criticalEmails": 1,
      "agingEmails": 2,
      "meetingConflicts": 1,
      "unacceptedMeetings": 2
    },
    
    "biggestRisk": {
      "title": "ANB Sprint 1 integration testing is blocked by API access",
      "source": "JIRA",
      "sourceId": "DAIS-123",
      "severity": "CRITICAL"
    },
    
    "recommendedActions": [
      {
        "order": 1,
        "description": "Review DAIS-123",
        "sourceType": "JIRA",
        "sourceId": "DAIS-123",
        "actionType": "REVIEW",
        "estimatedTime": 15
      },
      {
        "order": 2,
        "description": "Respond to Charlie's design question",
        "sourceType": "EMAIL",
        "sourceId": "msg-id-123",
        "actionType": "RESPOND",
        "estimatedTime": 10
      },
      {
        "order": 3,
        "description": "Accept Architecture Review meeting",
        "sourceType": "CALENDAR",
        "sourceId": "event-id-123",
        "actionType": "ACCEPT",
        "estimatedTime": 5
      }
    ],
    
    "jiraItems": [ /* ... */ ],
    "emailItems": [ /* ... */ ],
    "calendarItems": [ /* ... */ ],
    
    "attentionScore": 78,
    "sourcesQueried": ["JIRA", "OUTLOOK"],
    "generationTimeMs": 1250
  },
  "metadata": {
    "queriedSources": ["JIRA", "OUTLOOK"],
    "generationTime": 1250,
    "cacheHit": false
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "status": "ERROR",
  "error": {
    "code": "AGGREGATION_FAILED",
    "message": "Failed to aggregate overnight summary",
    "details": "Jira API timeout after 30s"
  },
  "metadata": {
    "queriedSources": ["OUTLOOK"],
    "generationTime": 30000,
    "cacheHit": false
  }
}
```

**Error Response (206 Partial):**
```json
{
  "status": "PARTIAL",
  "data": {
    /* ... partial summary with available data ... */
  },
  "errors": [
    {
      "source": "JIRA",
      "message": "Jira API rate limit exceeded, using cached data"
    }
  ],
  "metadata": {
    "queriedSources": ["OUTLOOK"],
    "generationTime": 5000,
    "cacheHit": true
  }
}
```

---

### 2. Get Executive Dashboard

**Endpoint:** `GET /api/executive-dashboard`

**Query Parameters:**
```
date?: string          // YYYY-MM-DD format
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "data": {
    "userId": "user-uuid",
    "generatedAt": "2025-07-30T08:15:00Z",
    
    "cards": [
      {
        "id": "ATTENTION_SCORE",
        "title": "Today's Attention Score",
        "currentValue": 78,
        "threshold": {
          "good": 30,
          "warning": 60,
          "critical": 80
        },
        "status": "YELLOW",
        "trend": "UP",
        "trendPercent": 12,
        "detail": "Up from 66 yesterday",
        "drillDownTarget": "overnight-summary"
      },
      {
        "id": "OPEN_ACTIONS",
        "title": "Open Action Items",
        "currentValue": 8,
        "threshold": {
          "good": 5,
          "warning": 10,
          "critical": 15
        },
        "status": "YELLOW",
        "trend": "UP",
        "trendPercent": 2,
        "detail": "From Jira and email",
        "drillDownTarget": "jira-activity"
      },
      {
        "id": "CRITICAL_EMAILS",
        "title": "Critical Emails",
        "currentValue": 1,
        "threshold": {
          "good": 0,
          "warning": 2,
          "critical": 5
        },
        "status": "GREEN",
        "trend": "STABLE",
        "trendPercent": 0,
        "detail": "From leadership",
        "drillDownTarget": "email-section"
      }
    ]
  },
  "cachedAt": "2025-07-30T08:15:00Z"
}
```

---

### 3. List Jira Items (Filtered)

**Endpoint:** `GET /api/jira-items`

**Query Parameters:**
```
date?: string                    // YYYY-MM-DD
changeType?: string              // NEW,STATUS_CHANGE,BLOCKER,etc (comma-separated)
projectKey?: string              // Filter by project
priority?: string                // BLOCKER,P1,P2,etc (comma-separated)
sortBy?: string                  // 'date' (default), 'priority', 'changeType'
limit?: number                   // Default 50
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": "jira-item-uuid",
      "issueKey": "DAIS-123",
      "summary": "API authentication not working in staging",
      "priority": "BLOCKER",
      "projectKey": "DAIS",
      "projectName": "Data Integration Service",
      
      "currentStatus": "In Progress",
      "previousStatus": "Open",
      "statusChangedAt": "2025-07-30T02:30:00Z",
      
      "changeType": "STATUS_CHANGE",
      "changedBy": {
        "id": "jira-user-123",
        "name": "Alex Chen",
        "avatarUrl": "https://jira.company.com/avatar/123"
      },
      
      "relevanceReason": "ASSIGNEE",
      "url": "https://jira.company.com/browse/DAIS-123",
      "updatedAt": "2025-07-30T02:30:00Z",
      "blockedBy": null,
      "blocks": ["DAIS-456", "DAIS-789"]
    }
  ],
  "pagination": {
    "total": 12,
    "limit": 50,
    "offset": 0
  },
  "metadata": {
    "cacheAge": 120,
    "source": "jira-cloud"
  }
}
```

---

### 4. List Email Items (Filtered)

**Endpoint:** `GET /api/email-items`

**Query Parameters:**
```
category?: string       // CRITICAL,AGING,ACTION_REQUIRED (comma-separated)
senderPriority?: string // LEADERSHIP,MANAGER,TEAMMATE (comma-separated)
isRead?: boolean
isFlagged?: boolean
limit?: number          // Default 20
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": "email-uuid",
      "messageId": "<msg@company.com>",
      "subject": "ACTION REQUIRED: Urgent approval needed for Q3 roadmap",
      
      "sender": {
        "name": "Jennifer Wong",
        "email": "jennifer.wong@company.com",
        "avatarUrl": "https://outlook.office.com/avatar/123"
      },
      
      "body": "We need your approval on the Q3 roadmap update. Can you review and sign off by EOD today?",
      "isRead": false,
      "isFlagged": true,
      
      "receivedAt": "2025-07-30T06:45:00Z",
      "sentAt": "2025-07-30T06:40:00Z",
      
      "category": "CRITICAL",
      "senderPriority": "LEADERSHIP",
      "responseStatus": "AWAITING_RESPONSE",
      
      "isAutoGenerated": false,
      "hasAttachments": true,
      "url": "https://outlook.office.com/mail/inbox/id/123"
    }
  ],
  "pagination": {
    "total": 3,
    "limit": 20,
    "offset": 0
  },
  "metadata": {
    "cacheAge": 180,
    "source": "outlook-graph-api"
  }
}
```

---

### 5. List Calendar Items (Conflicts/Unaccepted)

**Endpoint:** `GET /api/calendar-items`

**Query Parameters:**
```
conflictType?: string  // OVERLAP,UNACCEPTED,BOTH (default: BOTH)
days?: number          // Number of days to look ahead (default: 1)
```

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "data": [
    {
      "id": "event-uuid",
      "title": "Architecture Review - Q3 Planning",
      
      "startTime": "2025-07-30T09:00:00Z",
      "endTime": "2025-07-30T10:00:00Z",
      "duration": 60,
      "isAllDay": false,
      
      "conflictType": "UNACCEPTED",
      "conflictsWith": null,
      
      "userResponseStatus": "TENTATIVE",
      "organizer": {
        "name": "Michael Johnson",
        "email": "michael.johnson@company.com"
      },
      
      "attendeeCount": 12,
      "requiredAttendees": 8,
      
      "calendarName": "Team Calendar",
      "isTeamsEvent": true,
      "teamsMeetingUrl": "https://teams.microsoft.com/l/meetup-join/...",
      
      "url": "https://outlook.office.com/calendar/item/123",
      "updatedAt": "2025-07-30T08:00:00Z"
    }
  ],
  "metadata": {
    "cacheAge": 60,
    "source": "outlook-graph-api"
  }
}
```

---

### 6. Get User Preferences

**Endpoint:** `GET /api/user/preferences`

**Response (200 OK):**
```json
{
  "status": "SUCCESS",
  "data": {
    "userId": "user-uuid",
    "timezone": "America/New_York",
    "businessHoursStart": 8,
    "businessHoursEnd": 18,
    
    "enabledSources": ["JIRA", "OUTLOOK", "CALENDAR"],
    "jiraInstanceUrl": "https://company.atlassian.net",
    "outlookConnected": true,
    
    "notificationPreferences": {
      "emailSummary": true,
      "summaryTime": "08:00",
      "criticalsOnly": false
    }
  }
}
```

---

### 7. Update User Preferences

**Endpoint:** `POST /api/user/preferences`

**Request:**
```json
{
  "timezone": "America/Los_Angeles",
  "businessHoursStart": 9,
  "businessHoursEnd": 17,
  "enabledSources": ["JIRA", "OUTLOOK"]
}
```

**Response (200 OK):** Updated preferences object (same as GET)

---

## Authentication

### Bearer Token
All endpoints require Bearer token in Authorization header:
```
Authorization: Bearer {access_token}
```

### OAuth 2.0 Flow (for user-initiated requests)
```
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

---

## Error Handling

### Standard Error Response
```json
{
  "status": "ERROR",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": "Technical details (optional)"
  }
}
```

### Error Codes
| Code | HTTP | Meaning |
|------|------|---------|
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | User lacks permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `RATE_LIMITED` | 429 | API rate limit exceeded |
| `JIRA_API_ERROR` | 503 | Jira integration failed |
| `OUTLOOK_API_ERROR` | 503 | Outlook integration failed |
| `AGGREGATION_FAILED` | 500 | Failed to aggregate data |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Rate Limiting

- **Per User:** 100 requests/minute
- **Per IP:** 1000 requests/minute
- **Jira API:** Respect Jira's 1000 req/hour limit (pool across users)
- **Outlook API:** Respect Microsoft's throttling limits

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

---

## Caching Strategy

| Endpoint | TTL | Key | Invalidation |
|----------|-----|-----|--------------|
| `/overnight-summary` | 5 min | `user_id + date` | Manual refresh |
| `/executive-dashboard` | 5 min | `user_id + date` | Manual refresh |
| `/jira-items` | 5 min | `user_id + date + filters` | Manual refresh |
| `/email-items` | 3 min | `user_id + category` | Webhook on new email |
| `/calendar-items` | 5 min | `user_id + date` | Webhook on event change |

---

## Webhooks (Optional - P2)

**Events:**
- `jira.issue.updated`
- `jira.issue.created`
- `outlook.email.received`
- `outlook.calendar.updated`

**Delivery:**
- POST to user-registered endpoint
- Retry 3x with exponential backoff
- Sign with HMAC-SHA256

---

## Implementation Notes

1. **Aggregation Logic:** Sum counts from Jira, Outlook, Calendar
2. **Timezone Handling:** All times stored in UTC, convert for display based on user.timezone
3. **Business Hours:** Configurable per user (default 8 AM - 6 PM)
4. **Overnight Window:** 6 PM previous day → 8 AM current day (configurable)
5. **Attention Score:** TBD algorithm (recommend: weighted sum of priority, age, relevance)
6. **Error Recovery:** If one source fails, return PARTIAL status with available data
