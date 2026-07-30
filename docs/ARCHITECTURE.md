# System Architecture

## High-Level Data Flow

```
┌─────────────┐
│   User      │ (opens app at 8:00 AM)
└──────┬──────┘
       │
       ├────────────────────────────────────────┐
       │                                        │
       ▼                                        ▼
   [Frontend]                              [API Server]
   ┌────────────┐                          ┌──────────────┐
   │React+TS    │◄──────────────────────►  │Node.js/Deno  │
   │Tailwind    │  REST API                │TypeScript    │
   │Dark/Light  │  GET /overnight-summary  │PostgreSQL    │
   └────────────┘                          └──────┬───────┘
                                                  │
                ┌─────────────────────┬───────────┼───────────┬────────────────┐
                │                     │           │           │                │
                ▼                     ▼           ▼           ▼                ▼
            ┌────────┐          ┌──────────┐ ┌──────────┐ ┌────────┐    ┌─────────┐
            │ Jira   │          │ Outlook  │ │ Calendar │ │ Cache  │    │Analytics│
            │ Cloud  │          │ Graph API│ │ (MS 365) │ │ (Redis)│    │(optional)
            │ API v3 │          │          │ │          │ │        │    │         │
            └────────┘          └──────────┘ └──────────┘ └────────┘    └─────────┘
```

## Component Architecture

### Frontend Stack

```
src/
├── pages/
│   ├── index.tsx              # Dashboard (main page)
│   ├── overnight-summary.tsx   # Detail view
│   └── settings.tsx            # User preferences
├── components/
│   ├── OvernightSummaryCard.tsx
│   ├── KPICard.tsx
│   ├── KPIGrid.tsx
│   ├── JiraItemCard.tsx
│   ├── EmailItemCard.tsx
│   ├── CalendarItemCard.tsx
│   ├── Header.tsx
│   ├── Navigation.tsx
│   └── ThemeToggle.tsx
├── hooks/
│   ├── useOvernightSummary.ts   # Fetch + cache logic
│   ├── useDashboard.ts           # KPI aggregation
│   ├── useJiraItems.ts
│   ├── useEmailItems.ts
│   └── useCalendarItems.ts
├── api/
│   ├── client.ts                # HTTP client with auth
│   └── endpoints.ts             # API URL constants
├── types/
│   ├── jira.ts
│   ├── outlook.ts
│   ├── calendar.ts
│   └── dashboard.ts
├── styles/
│   ├── globals.css
│   ├── theme.css
│   └── animations.css
└── utils/
    ├── format.ts                # Date/time formatting
    ├── priority.ts              # Priority ranking
    └── grouping.ts              # Item grouping logic
```

### Backend Stack

```
src/
├── routes/
│   ├── overnight-summary.ts
│   ├── dashboard.ts
│   ├── jira.ts
│   ├── outlook.ts
│   ├── calendar.ts
│   └── auth.ts
├── services/
│   ├── jira-service.ts          # Jira API client
│   ├── outlook-service.ts        # Outlook API client
│   ├── calendar-service.ts       # Calendar logic
│   ├── aggregation-service.ts    # Summary generation
│   ├── auth-service.ts           # OAuth + tokens
│   └── cache-service.ts          # Redis cache
├── database/
│   ├── schema.ts                 # DB schema definition
│   ├── migrations/               # Database migrations
│   └── queries.ts                # DB helper functions
├── types/
│   ├── jira.ts
│   ├── outlook.ts
│   ├── calendar.ts
│   └── api.ts
├── utils/
│   ├── timezone.ts               # Timezone handling
│   ├── business-hours.ts         # Business hours logic
│   ├── attention-score.ts        # Scoring algorithm
│   └── error-handling.ts         # Error responses
└── middleware/
    ├── auth.ts                   # JWT verification
    └── error-handler.ts          # Global error handling
```

---

## Data Flow Sequences

### 1. User Opens App (First Load)

```
User opens http://localhost:3000
      ↓
Frontend: GET /api/overnight-summary
      ↓
Backend: Aggregation Pipeline
├─ GET Jira items (last 24h)
│  └─ Cache 5 min
├─ GET Outlook emails (last 24h)
│  └─ Cache 5 min
├─ GET Calendar events (next 7 days)
│  └─ Cache 5 min
└─ Rank & synthesize → JSON
      ↓
Frontend: Render OvernightSummaryCard
Frontend: Render KPI Grid
Frontend: Render Jira/Email/Calendar sections
      ↓
User sees summary in < 2 seconds
```

### 2. User Clicks "View in Jira"

```
User clicks on DAIS-123
      ↓
Frontend: window.open(item.url)
      ↓
Opens: https://company.atlassian.net/browse/DAIS-123
```

### 3. User Changes Theme

```
User clicks theme toggle
      ↓
Frontend: localStorage.setItem('theme', 'dark')
Frontend: document.documentElement.classList.add('dark')
      ↓
All components re-render with dark theme
```

---

## Key Algorithms

### Attention Score Calculation

```typescript
// Pseudo-code
function calculateAttentionScore(summary: OvernightSummary): number {
  let score = 0;
  
  // Critical items (weight 20)
  score += summary.metrics.criticalEmails * 20;
  score += summary.metrics.meetingConflicts * 15;
  
  // Action items (weight 10)
  score += summary.metrics.jiraItemsRequiringAction * 10;
  score += summary.metrics.escalationsAssigned * 15;
  
  // Aging items (weight 15)
  score += summary.metrics.agingEmails * 15;
  
  // Positives (weight -5)
  score -= summary.metrics.itemsResolved * 3;
  score -= summary.metrics.itemsClosed * 2;
  
  // Cap at 0-100
  return Math.max(0, Math.min(100, score));
}
```

### Relevance Ranking

```typescript
// Determine why item appears to user
function determineRelevance(user: User, jiraIssue: JiraIssue): RelevanceReason {
  if (jiraIssue.assignee.id === user.id) return 'ASSIGNEE';
  if (jiraIssue.reporter.id === user.id) return 'REPORTER';
  if (jiraIssue.watchers.includes(user.id)) return 'WATCHER';
  if (jiraIssue.description.includes(user.name)) return 'MENTIONED';
  if (jiraIssue.labels.includes(user.team)) return 'TAGGED';
  if (jiraIssue.approvers.includes(user.id)) return 'APPROVER';
  return null; // Not relevant
}
```

### Overnight Window Calculation

```typescript
function getOvernightWindow(user: User): { start: Date, end: Date } {
  const now = new Date();
  const userTZ = user.timezone; // e.g., 'America/New_York'
  
  // Convert to user's timezone
  const todayStart = startOfDay(now, userTZ);
  const businessHourStart = todayStart + user.businessHoursStart * hours;
  
  // Overnight = yesterday 6 PM → today 8 AM
  return {
    start: new Date(businessHourStart - 26 * hours), // 6 PM yesterday
    end: businessHourStart                            // 8 AM today
  };
}
```

---

## API Integration Patterns

### Jira Cloud API v3

**Authentication:** OAuth 2.0 or API Token

**Key Endpoints:**
```
GET /rest/api/3/search
  ?jql=assignee=USERID OR reporter=USERID OR ...
  &fields=key,summary,priority,status,created,updated,...
  &maxResults=50

GET /rest/api/3/user/{id}
  # Get user info (name, avatar, etc.)
```

**Rate Limiting:** 1000 requests/hour per instance

**Caching Strategy:** 5 minutes (per-user key + filters)

---

### Microsoft Graph API (Outlook + Calendar)

**Authentication:** OAuth 2.0 (delegated permissions)

**Key Endpoints:**
```
GET /me/messages
  ?$filter=receivedDateTime gt {date-time}
  &$orderby=receivedDateTime desc
  &$top=50

GET /me/events
  ?$filter=start/dateTime ge '{date-time}'
  &$orderby=start/dateTime asc
  &$top=100
```

**Permissions Required:**
- `Mail.Read`
- `Calendar.Read`

**Rate Limiting:** Microsoft's standard throttling (respects Retry-After header)

**Caching Strategy:** 3-5 minutes (calendar events more frequent)

---

## Error Handling Strategy

```typescript
// HTTP Error Codes
200 OK                  // Success
206 Partial Content     // Partial data (some sources failed)
400 Bad Request         // Invalid params
401 Unauthorized        // Missing/invalid token
403 Forbidden           // User lacks permissions
404 Not Found           // Resource not found
429 Too Many Requests   // Rate limited
503 Service Unavailable // Jira/Outlook API down
500 Internal Error      // Server error

// Application Errors
{
  "status": "ERROR",
  "error": {
    "code": "JIRA_API_ERROR",
    "message": "Failed to fetch Jira items",
    "details": "Rate limit exceeded. Retry after 60 seconds."
  }
}

// Partial Response (206)
{
  "status": "PARTIAL",
  "data": { /* available data */ },
  "errors": [
    { "source": "JIRA", "message": "Rate limited, using cache" }
  ]
}
```

**User-Facing Strategy:**
- Show what worked (Outlook data ✓, Jira data ✗)
- Use cached data as fallback
- Offer [Retry] button
- Toast notification: "Some data is cached (30 min old)"

---

## Caching Strategy

### Frontend Cache (Browser LocalStorage)

```typescript
// Cache key: user_id + endpoint + hash(filters)
const cacheKey = `cache:${userId}:overnight-summary:${dateHash}`;
const cached = localStorage.getItem(cacheKey);

if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
  return cached.data; // Use cache
}
```

### Backend Cache (Redis)

```typescript
// Cache key: jira:{user_id}:{date}
// Cache key: outlook:{user_id}:{category}

// 5-minute TTL
const cacheKey = `jira:${userId}:${dateKey}`;
const cached = await redis.get(cacheKey);

if (cached) return JSON.parse(cached);

// Otherwise, fetch and cache
const items = await jiraService.getItems(...);
await redis.setex(cacheKey, 5 * 60, JSON.stringify(items));
return items;
```

### Invalidation Triggers

1. **Manual Refresh:** User clicks [Refresh] button → clear cache
2. **Time-based:** 5-minute TTL
3. **Webhook:** On new Jira issue → invalidate Jira cache
4. **Logout:** Clear all user caches

---

## Security Considerations

1. **OAuth 2.0:** Use code flow (not implicit)
2. **Token Storage:** HttpOnly cookies (not localStorage)
3. **CORS:** Restrict to trusted origins
4. **Rate Limiting:** Per-user + per-IP limits
5. **Input Validation:** Sanitize all query params
6. **Error Messages:** Don't expose internal details
7. **HTTPS:** All communication encrypted
8. **Secrets Management:** Use environment variables

---

## Performance Targets

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| Page Load | < 2s | Lazy loading, CDN, compression |
| API Response | < 500ms P95 | Caching, database indexing |
| Rendering | < 1s | Code splitting, memoization |
| Time to Interactive | < 3s | Minimize JS, optimize images |

---

## Deployment Architecture

```
┌─────────────┐
│ GitHub Repo │
└──────┬──────┘
       │
       ├─► CI/CD Pipeline (GitHub Actions)
       │    ├─ Run tests
       │    ├─ Build frontend (webpack)
       │    ├─ Build backend (if applicable)
       │    └─ Deploy to staging
       │
       ├─► Staging Environment
       │    ├─ Frontend (Vercel / Netlify)
       │    ├─ API Server (Heroku / Railway)
       │    └─ Database (PostgreSQL on AWS RDS)
       │
       └─► Production Environment
            ├─ Frontend CDN (Cloudflare / Vercel)
            ├─ API Server (load balanced)
            └─ Database (replicated, backed up)
```

---

## Team Responsibility Matrix

| Component | Owner | Support |
|-----------|-------|---------|
| Frontend Components | UX Architect | Full Stack Engineer |
| API Routes | Full Stack Engineer | Enterprise Architect |
| Data Models | Enterprise Architect | Full Stack Engineer |
| Integrations (Jira/Outlook) | Full Stack Engineer | Product Manager |
| Aggregation Algorithm | Product Manager | Enterprise Architect |
| Database Schema | Enterprise Architect | Full Stack Engineer |
| Styling/Theme | UX Architect | Frontend devs |
| Testing | All | Full Stack Engineer |
