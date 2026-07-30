# Feature Specifications

## Sprint 0 (MVP) — Core Features

### Feature 1: What Changed Overnight Summary
**Owner:** Product Manager  
**Priority:** P0  
**Status:** Spec  

#### Overview
AI-generated summary card showing what changed outside business hours that requires immediate attention.

#### Acceptance Criteria
- [ ] Aggregates data from all connected sources (Jira, Outlook, Calendar)
- [ ] Identifies activity between 6 PM previous day → 8 AM current day
- [ ] Ranks by attention priority (Critical → Medium → Low)
- [ ] Displays in <1 second
- [ ] Shows 5-7 key items
- [ ] Includes "Biggest Risk" and "Recommended First Actions"

#### Data Requirements
- Jira: Issues assigned/mentioned/watched/changed
- Outlook: Critical emails (flagged, from managers)
- Calendar: Unaccepted invites, conflicts

#### Time Estimate
- Backend: 4 hours
- Frontend: 2 hours
- Testing: 1 hour

---

### Feature 2: Executive Dashboard (KPI Cards)
**Owner:** UX Architect  
**Priority:** P0  
**Status:** Spec  

#### Overview
Grid of KPI cards showing key metrics with red/yellow/green indicators.

#### Cards Required
- [ ] Today's Attention Score (0-100)
- [ ] Open Action Items (count)
- [ ] Critical Emails (count)
- [ ] Aging Emails (>48hrs)
- [ ] Jira Updates (count)
- [ ] Meeting Conflicts (count)
- [ ] Unaccepted Meetings (count)
- [ ] Blocked Work Items (count)

#### Display Requirements
- Responsive 2-column grid (4 cards each)
- Color coding: Green (good) / Yellow (warning) / Red (critical)
- Trend indicators (↑/↓/→)
- Click-through to detail section

#### Time Estimate
- Component build: 3 hours
- Theme system: 2 hours
- Dark mode: 1 hour

---

### Feature 3: Jira Activity Section
**Owner:** Full Stack Engineer  
**Priority:** P0  
**Status:** Spec  

#### Overview
Detailed list of Jira issues changed outside business hours.

#### Inclusion Criteria
- User is: Assignee, Reporter, Watcher, Mentioned, Tagged, or Approver
- Changed outside business hours (6 PM - 8 AM, weekdays + weekends)

#### Item Highlights
- [ ] NEW ISSUES
- [ ] STATUS CHANGES
- [ ] BLOCKERS
- [ ] ESCALATIONS
- [ ] SEVERITY 1 / 2
- [ ] RESOLVED
- [ ] CLOSED

#### Display Fields
- Issue Key (clickable to Jira)
- Summary
- Priority (P1-P5)
- Project
- Current Status → Previous Status
- Changed By (avatar + name)
- Last Updated (relative time)
- Reason it appears (badge)

#### Grouping
- By type (New, Status Change, Blocker, etc.)
- Or by project (user preference)

#### Time Estimate
- Data aggregation: 3 hours
- UI component: 3 hours
- Filtering/sorting: 2 hours

---

### Feature 4: Email Intelligence
**Owner:** Full Stack Engineer  
**Priority:** P1  
**Status:** Spec  

#### Overview
Surface critical and aging emails from Outlook.

#### Categories
- **Critical:** Flagged, from leadership, unread
- **Aging:** >48 hours old, unread
- **Action Required:** Sender awaiting response

#### Display Fields
- Sender (name + avatar)
- Subject (truncated with ellipsis)
- First 100 chars of body
- Received time (relative)
- Flag status
- Read/Unread indicator

#### Grouping
- Critical emails (up to 5)
- Aging emails (up to 5)
- Action required (up to 3)

#### Time Estimate
- Outlook integration: 4 hours
- Email filtering logic: 2 hours
- UI component: 2 hours

---

### Feature 5: Calendar Processing
**Owner:** Full Stack Engineer  
**Priority:** P1  
**Status:** Spec  

#### Overview
Identify meeting conflicts and unaccepted invites.

#### Detection Rules
- [ ] Same time overlap (conflicts)
- [ ] Tentative status (unaccepted)
- [ ] All-day meeting conflicts
- [ ] Timezone handling

#### Display
- Meeting title
- Time and duration
- Conflict type (Overlap vs Unaccepted)
- Attendees (count)
- Calendar name
- Quick action (Accept/Decline buttons)

#### Time Estimate
- Calendar API integration: 3 hours
- Conflict detection: 2 hours
- UI component: 2 hours

---

## Data Connector Specifications

### Jira Connector
**Status:** Spec  
- Cloud API v3 support
- Data Center (self-hosted) support
- Query scope: Last 24 hours + user relationships
- Cache strategy: 5-minute TTL
- Error handling: Graceful degradation

### Outlook Connector
**Status:** Spec  
- Microsoft Graph API integration
- Email search: Last 24 hours
- Calendar: Next 7 days
- Cache strategy: 5-minute TTL
- Auth: OAuth 2.0 + refresh tokens

### Teams Integration (Optional - P2)
**Status:** Spec  
- Mention notifications only
- Quick reference for context
- Low priority for MVP

---

## Non-Functional Requirements

| Requirement | Target | Acceptance |
|------------|--------|-----------|
| Page Load Time | <2 seconds | Lighthouse >80 |
| Time to Insight | <30 seconds | User can scan summary in under 30s |
| Accessibility | WCAG 2.1 AA | No critical issues in axe audit |
| Mobile Support | Responsive | Works on iPad (minimum) |
| API Response Time | <500ms | P95 latency |
| Availability | 99.5% | SLA tracking |

---

## Definition of Done (for each feature)

- [ ] Code written in TypeScript with strict types
- [ ] Unit tests written (>80% coverage)
- [ ] Integration tests written
- [ ] Accessibility audit passed (axe or equivalent)
- [ ] Responsive design tested (desktop, tablet, mobile)
- [ ] Dark mode verified
- [ ] Performance tested (Lighthouse >80)
- [ ] PR reviewed by 1 teammate
- [ ] Spec document updated with discoveries
- [ ] Feature deployed to staging

---

## Timeline

**Sprint Duration:** 90 minutes

- **0-15 min:** Spec review and architecture alignment
- **15-45 min:** Data model + API contract definition
- **45-75 min:** Core component implementation
- **75-90 min:** Integration + testing + demo prep

---

## Blockers / Assumptions

- [ ] Jira API credentials available
- [ ] Outlook/Microsoft Graph credentials available
- [ ] Design system (Tailwind + theme) pre-configured
- [ ] Database schema ready
- [ ] Authentication system in place
