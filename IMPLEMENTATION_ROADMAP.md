# Implementation Roadmap - Morning Command Center

**Sprint Duration:** 90 minutes  
**Target:** Production-quality prototype with mock data  
**Status:** 🟢 Environment Ready - Ready for component development

---

## Phase Breakdown

### Phase 1: Foundation (✅ COMPLETE)

**Completed:**
- ✅ Project configuration (TS, Next.js, Tailwind, ESLint, Jest)
- ✅ Design system tokens (colors, typography, spacing, shadows)
- ✅ TypeScript types (Jira, Outlook, Calendar, Dashboard)
- ✅ React pages setup (_app, _document, index)
- ✅ Global styles with dark mode support
- ✅ UI specifications document (complete)
- ✅ Environment setup guide
- ✅ Mock data service (mockData.ts)
- ✅ npm install completed

**Time Saved:** 15 minutes (reallocated to implementation)

---

### Phase 2: Components (✅ 60% COMPLETE)

**Completed - Email System:**
- ✅ EmailItemCard component
- ✅ EmailSection component
- ✅ EmailDetailModal component
- ✅ 3 realistic mock emails
- ✅ Click-to-view functionality
- ✅ [Open in Outlook] linking
- ✅ Dark mode support
- ✅ Responsive layout

**Completed - Jira System:**
- ✅ JiraItemCard component
- ✅ JiraSection component (with grouping)
- ✅ JiraDetailModal component
- ✅ 3 realistic mock issues
- ✅ Click-to-view functionality
- ✅ Grouped by change type
- ✅ [Open in Jira] linking
- ✅ Priority color coding
- ✅ Dark mode support
- ✅ Responsive layout

**In Progress:**
- ⏳ Calendar components (priority next)

**Not Yet Started:**
- [ ] Skeleton loader component
- [ ] EmptyState component (reusable)
- [ ] ErrorState component (reusable)
- [ ] Header component (separate)
- [ ] OvernightSummaryCard (separate)

**Status:** Components functional, integrated into dashboard

---

## Phase 2: Core Components (45 minutes)

### Tier 1: Header & Summary (10 min)

**Component:** `src/components/Header.tsx`
```typescript
interface HeaderProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  activeTab?: 'dashboard' | 'overnight' | 'settings'
}
```

**What to build:**
- Logo + app title (left)
- Navigation tabs (center)
- Theme toggle + settings + user menu (right)
- Sticky positioning
- Mobile hamburger (skip for MVP)

**Acceptance Criteria:**
- [ ] Renders header with all sections
- [ ] Theme toggle works
- [ ] Navigation links route correctly
- [ ] Dark mode colors apply
- [ ] Responsive at 640px+ (tablet/desktop)

**Estimated Time:** 10 min

---

**Component:** `src/components/OvernightSummaryCard.tsx`
```typescript
interface OvernightSummaryCardProps {
  summary: OvernightSummary
  isLoading: boolean
  error?: string
  onRefresh: () => void
}
```

**What to build:**
- Hero card layout (full width)
- Metrics display (7 items)
- "Biggest Risk" alert box
- Recommended actions list (3 items)
- Last updated timestamp
- [Refresh] and [View Details] buttons

**States:**
1. Loading: Skeleton with pulse
2. Loaded: Full content
3. Empty: "No changes overnight ☕"
4. Error: "Failed to load [Retry]"
5. Cached: Show timestamp

**Acceptance Criteria:**
- [ ] Renders all sections
- [ ] Loading state shows skeleton
- [ ] Empty/error states render
- [ ] Buttons are clickable
- [ ] Responsive layout
- [ ] Dark mode colors

**Estimated Time:** 15 min

---

### Tier 2: KPI Cards (10 min)

**Component:** `src/components/KPICard.tsx`
```typescript
interface KPICardProps {
  id: string
  title: string
  value: number
  status: 'GREEN' | 'YELLOW' | 'RED'
  trend: 'UP' | 'DOWN' | 'STABLE'
  trendPercent: number
  detail: string
  onClick?: () => void
}
```

**What to build:**
- Title (top, small text)
- Large value (centered, bold)
- Trend indicator + percent
- Detail text (bottom)
- Status color on border/background

**Styling:**
- Card background (white/dark)
- Left border or top accent (2px) with status color
- Hover: shadow increase, cursor pointer
- Responsive: full-width on mobile

**Acceptance Criteria:**
- [ ] Renders value + trend
- [ ] Color status applies (GREEN/YELLOW/RED)
- [ ] Trend arrows show (🔺/🔻/➡️)
- [ ] Hover shadow works
- [ ] Click handler fires

**Estimated Time:** 5 min

---

**Component:** `src/components/KPIGrid.tsx`
```typescript
interface KPIGridProps {
  metrics: KPIMetric[]
  isLoading: boolean
}
```

**What to build:**
- Grid layout wrapper
- 4 columns on desktop, 2 on tablet, 1 on mobile
- Render KPICard for each metric
- Loading skeleton (4 placeholder cards)
- Spacing/gap between cards

**Acceptance Criteria:**
- [ ] Responsive grid (4/2/1 columns)
- [ ] KPI cards render correctly
- [ ] Loading skeleton displays
- [ ] Gap/spacing consistent

**Estimated Time:** 5 min

---

### Tier 3: Content Cards (15 min)

**Component:** `src/components/JiraItemCard.tsx`
```typescript
interface JiraItemCardProps {
  item: JiraActivityItem
  onClick?: () => void
}
```

**Layout:**
```
DAIS-123                            [P1]
In Progress → Resolved         [3h ago]
API authentication issue
Changed by: Alex Chen | DAIS
[View in Jira →]
```

**Features:**
- Issue key + priority badge (right)
- Status change + timestamp (right)
- Summary (main text)
- User + project (bottom)
- Left border (4px, colored by change type)
- Click → open Jira link in new tab

**Left Border Colors:**
- NEW: green (#216E4E)
- STATUS_CHANGE: blue (#0052CC)
- BLOCKER: red (#AE2A19)
- CLOSED: gray (#DFE1E6)

**Acceptance Criteria:**
- [ ] All fields render
- [ ] Left border color correct
- [ ] Priority badge displays
- [ ] Time stamp shown
- [ ] Link opens Jira (new tab)
- [ ] Hover shadow

**Estimated Time:** 5 min

---

**Component:** `src/components/EmailItemCard.tsx`
```typescript
interface EmailItemCardProps {
  item: OutlookActivityItem
  onClick?: () => void
}
```

**Layout:**
```
🚩 Jennifer Wong                 [Flagged]
ACTION REQUIRED: Q3 Roadmap...
We need your approval...

[📎 1 attachment] | 6:45 AM (4h ago)
Status: Awaiting response
[Reply →] [Forward →]
```

**Features:**
- Flag icon + sender name (top)
- Subject line (bold)
- Body preview (truncated)
- Attachment badge + timestamp
- Status badge (bottom)
- Action buttons (Reply/Forward - placeholder for MVP)
- Left border (4px, colored by severity)

**Left Border Colors:**
- CRITICAL: red (#AE2A19)
- AGING: orange (#974F0C)
- ACTION_REQUIRED: yellow (#F5CD47)

**Acceptance Criteria:**
- [ ] Sender name + flag icon
- [ ] Subject + preview text
- [ ] Attachment indicator
- [ ] Left border color
- [ ] Timestamp shown
- [ ] Status badge visible

**Estimated Time:** 5 min

---

**Component:** `src/components/CalendarItemCard.tsx`
```typescript
interface CalendarItemCardProps {
  item: CalendarIssueItem
  onClick?: () => void
}
```

**Layout:**
```
🔴 CONFLICT

Architecture Review — Q3 Planning
9:00 AM - 10:00 AM (1h) | 12 attendees

Organizer: Michael Johnson
Your status: TENTATIVE (⚠️)

Overlapping with:
  Q3 Planning (9:30 AM - 11:00 AM)

[Accept] [Decline] [View →]
```

**Features:**
- Status indicator emoji (top)
- Event title(s)
- Time + attendee count
- Organizer info
- Response status badge
- Conflict details
- Action buttons

**Status Indicators:**
- CONFLICT: 🔴
- UNACCEPTED: ⚠️
- DUPLICATE: ⚠️

**Acceptance Criteria:**
- [ ] Status emoji displays
- [ ] Times + attendees shown
- [ ] Organizer info present
- [ ] Response badge visible
- [ ] Conflict details shown
- [ ] Buttons present

**Estimated Time:** 5 min

---

### Tier 4: Loading States (5 min)

**Component:** `src/components/Skeleton.tsx`
```typescript
interface SkeletonProps {
  className?: string
  count?: number
}
```

**Features:**
- Div with pulse animation
- Accepts Tailwind className for sizing
- Multiple skeletons via count prop

**Usage:**
```tsx
<Skeleton className="h-12 w-full rounded" />
<div className="space-y-2">
  {Array(3).fill(0).map((_, i) => (
    <Skeleton key={i} className="h-4 w-3/4 rounded" />
  ))}
</div>
```

**Acceptance Criteria:**
- [ ] Pulse animation works
- [ ] Accepts size className
- [ ] No content flickering

**Estimated Time:** 2 min

---

**Component:** `src/components/EmptyState.tsx`
```typescript
interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}
```

**Features:**
- Large emoji icon (centered)
- Title (heading-3)
- Description (body)
- Optional action button

**Estimated Time:** 1 min

---

**Component:** `src/components/ErrorState.tsx`
```typescript
interface ErrorStateProps {
  title: string
  message: string
  onRetry?: () => void
}
```

**Features:**
- Error icon (⚠️)
- Title + message
- [Retry] button if retryable

**Estimated Time:** 1 min

---

### Tier 5: Dashboard Page Update (5 min)

**File:** `src/pages/index.tsx`

**What to update:**
- Replace hardcoded Header with `<Header />` component
- Replace hardcoded OvernightSummary with `<OvernightSummaryCard />` with mock data
- Replace hardcoded KPI cards with `<KPIGrid />` with mock data
- Import Jira/Email/Calendar card components
- Add section placeholders with <EmptyState> or mock data

**Acceptance Criteria:**
- [ ] All components render
- [ ] Dark mode works
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive layout
- [ ] Hover effects work

**Estimated Time:** 5 min

---

## Phase 3: Mock Data & Services (20 minutes)

### Mock Data Provider

**File:** `src/services/mockData.ts`

**What to create:**
```typescript
export const mockDashboard: ExecutiveDashboard = {
  id: 'dash-1',
  userId: 'user-1',
  generatedAt: new Date().toISOString(),
  metrics: [
    { id: 'kpi-1', title: "Today's Attention Score", value: 78, ... },
    // ... 7 more KPI metrics
  ],
  summary: { /* OvernightSummary data */ },
  jiraActivity: [
    { issueKey: 'DAIS-123', changeType: 'STATUS_CHANGE', ... },
    // ... more items
  ],
  outlookActivity: [
    { id: 'email-1', type: 'CRITICAL_EMAIL', ... },
    // ... more items
  ],
  calendarIssues: [
    { event: { /* calendar event */ }, issueType: 'CONFLICT', ... },
  ]
}

export function getMockDashboard(): ExecutiveDashboard {
  return mockDashboard
}
```

**Acceptance Criteria:**
- [ ] All entity types have mock data
- [ ] Realistic values
- [ ] Covers all UI states (loading, empty, error, loaded)

**Estimated Time:** 5 min

---

### API Service Layer

**File:** `src/services/api.ts`

```typescript
export const dashboardApi = {
  async getOvernightSummary(): Promise<OvernightSummary> {
    // Return mock data
  },
  
  async getExecutiveDashboard(): Promise<ExecutiveDashboard> {
    // Return mock data
  }
}
```

**Acceptance Criteria:**
- [ ] Functions return correct types
- [ ] Can swap to real API later
- [ ] Handles loading delay (optional: setTimeout)

**Estimated Time:** 5 min

---

### Custom Hooks

**File:** `src/hooks/useDashboard.ts`

```typescript
export function useDashboard() {
  const [dashboard, setDashboard] = useState<ExecutiveDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await dashboardApi.getExecutiveDashboard()
        setDashboard(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return { dashboard, isLoading, error }
}
```

**Estimated Time:** 5 min

---

## Phase 4: Polish & Testing (10 minutes)

### TypeScript & Linting
- [ ] Run `npm run type-check` (fix any errors)
- [ ] Run `npm run lint` (fix ESLint issues)
- [ ] No `any` types

**Time:** 3 min

### Dark Mode Verification
- [ ] All text readable in dark mode
- [ ] All buttons visible
- [ ] No contrast issues

**Time:** 2 min

### Responsive Testing
- [ ] Mobile (<640px): 1 column, stacked
- [ ] Tablet (640-1024px): 2 columns
- [ ] Desktop (>1024px): 4 columns KPI grid
- [ ] Touch targets >= 44px

**Time:** 3 min

### Browser Testing
- [ ] Chrome / Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browser

**Time:** 2 min

---

## Time Budget

```
Foundation:                15 min (✅ DONE)
├─ Config setup           5 min
├─ Design system          4 min
├─ Types                  3 min
├─ Pages skeleton         2 min
└─ Time saved            15 min (reallocate)

Phase 2: Components        45 min
├─ Header                 10 min
├─ OvernightSummaryCard   15 min
├─ KPI Cards              10 min
├─ Content Cards          15 min (Jira/Email/Calendar)
├─ Loaders               5 min (Skeleton/Empty/Error)
└─ Dashboard page         5 min

Phase 3: Mock Services    20 min
├─ Mock data             5 min
├─ API service          5 min
├─ Hooks                5 min
└─ Data wiring         5 min

Phase 4: Polish           10 min
├─ Type checking        3 min
├─ Dark mode verify     2 min
├─ Responsive test      3 min
└─ Browser test         2 min

BUFFER:                   0 min (tight!)

TOTAL:                   90 min
```

**Strategy:** If running behind, defer:
1. Component hover animations (can add static)
2. Email action buttons (add placeholder)
3. Calendar action buttons (add placeholder)
4. Secondary responsiveness (focus on tablet/desktop)

---

## Definition of Done (Sprint End)

### MVP Requirements
- [ ] Dashboard page renders without errors
- [ ] Header component visible + theme toggle works
- [ ] OvernightSummaryCard displays with mock data
- [ ] KPI Grid shows 8 metrics with correct colors
- [ ] Jira activity section renders (at least 3 items)
- [ ] Email section renders (at least 3 items)
- [ ] Calendar section renders (at least 2 conflicts)
- [ ] Dark mode toggle works on all pages
- [ ] Responsive design on tablet + desktop
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No ESLint violations

### Nice to Have (if time)
- [ ] Skeleton loading state UX
- [ ] Component hover effects
- [ ] Mobile responsiveness (<640px)
- [ ] Accessibility spot-check (contrast, focus)

### Success Criteria
✅ Working prototype  
✅ Mock data end-to-end  
✅ Dark mode support  
✅ Type-safe  
✅ Ready for real API swap (post-sprint)  

---

## Component Dependency Graph

```
_app.tsx (Theme context)
    └── _document.tsx
        └── index.tsx (Dashboard page)
            ├── Header
            ├── OvernightSummaryCard
            │   └── Skeleton (loading state)
            │   └── EmptyState
            │   └── ErrorState
            ├── KPIGrid
            │   └── KPICard (x8)
            │       └── Skeleton (loading state)
            ├── JiraActivitySection
            │   └── JiraItemCard (x3+)
            ├── EmailSection
            │   └── EmailItemCard (x3+)
            └── CalendarSection
                └── CalendarItemCard (x2+)
```

**Build Order (parallel where possible):**
1. Header (no deps)
2. Skeleton, EmptyState, ErrorState (no deps)
3. KPICard → KPIGrid (KPICard is dep)
4. OvernightSummaryCard (uses Skeleton)
5. JiraItemCard, EmailItemCard, CalendarItemCard (no deps)
6. Update index.tsx (all components ready)
7. Mock data + hooks
8. Wire data through page

---

## Post-Sprint Roadmap

### Overnight & Settings Pages
- [ ] Create `/overnight` page structure
- [ ] Create `/settings` page structure
- [ ] Add navigation to header

### Real API Integration
- [ ] Implement Jira OAuth
- [ ] Implement Outlook OAuth
- [ ] Replace mock data with real API calls
- [ ] Add token refresh logic

### Features
- [ ] Email reply/forward buttons
- [ ] Calendar conflict resolution
- [ ] Advanced filtering & sorting
- [ ] WebSocket real-time updates
- [ ] Caching strategy

### Polish
- [ ] Full accessibility audit
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Analytics integration

---

## Questions & Escalations

**If blocked:**
1. Check spec (`UI_REQUIREMENTS.md`)
2. Check component checklist (this document)
3. Ask team in sync
4. Product Manager breaks tie (2 min max)

**Common blockers:**
- "What should hover look like?" → See UI_REQUIREMENTS.md
- "What color is this?" → Check tailwind.config.js
- "What data shape?" → Check types/ folder

---

## Success Checklist

**Current Status (At ~4 hours):**
- ✅ npm install completed
- ✅ npm run dev works
- ✅ Dashboard renders at localhost:3000
- ✅ Header visible + theme toggle works (🌙)
- ✅ All 8 KPI cards visible (demo data)
- ✅ Dark mode colors visible (full support)
- ✅ No console errors
- ✅ No TypeScript errors
- ✅ **Email cards clickable** → Detail modal
- ✅ **Jira cards clickable** → Detail modal
- ✅ External links working (Outlook, Jira)
- ✅ Responsive layout tested

**Remaining (Next 1.5 hours):**
- ⏳ Calendar section + components
- ⏳ OvernightSummary as separate component
- ⏳ Settings page structure
- ⏳ Overnight summary page structure
- ⏳ Final polish & accessibility spot-check
- ⏳ Demo preparation (2 min walkthrough)

**End of Sprint Criteria:**
- ✅ Email linking functional
- ✅ Jira linking functional
- ✅ Dark mode on all sections
- ✅ Type-safe (strict mode)
- ⏳ Calendar integration (in progress)
- ✅ Mock data complete
- ✅ No console/TypeScript errors
- ✅ Responsive design (desktop/tablet)

**If all ✅, project is ready for:**
- Real API integration (post-sprint)
- Additional features (post-sprint)
- Production deployment (2-3 sprints)

---

**Status:** 🟢 Ready to Code  
**Time:** 90 minutes  
**Team:** 4 people (PM, EA, FSE, UX)  
**Goal:** Production-quality prototype ✅
