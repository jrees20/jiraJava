# UI Requirements & Component Specifications

**Document Status:** Live Spec  
**Last Updated:** July 30, 2026  
**Version:** 1.0 - Foundation Build

---

## Table of Contents

1. [Design System](#design-system)
2. [Component Library](#component-library)
3. [Page Layouts](#page-layouts)
4. [Interaction Patterns](#interaction-patterns)
5. [Accessibility Requirements](#accessibility-requirements)
6. [Implementation Checklist](#implementation-checklist)

---

## Design System

### Color Palette

#### Light Mode
| Name | Hex | Usage |
|------|-----|-------|
| Primary | #0052CC | Links, CTAs, active states |
| Success | #216E4E | Positive indicators, good metrics |
| Warning | #974F0C | Caution, aging items, warnings |
| Danger | #AE2A19 | Critical, blockers, errors |
| Neutral-50 | #F7F8F9 | Page background |
| Neutral-100 | #F1F2F4 | Secondary backgrounds |
| Neutral-200 | #DFE1E6 | Borders, dividers |
| Neutral-300 | #626F86 | Secondary text |
| Neutral-400 | #44546F | Primary text, body |
| Neutral-500 | #22242F | Headings, strong text |

#### Dark Mode
| Name | Hex | Usage |
|------|-----|-------|
| Primary | #0052CC | Links, CTAs (unchanged) |
| Success | #4BCE97 | Positive indicators |
| Warning | #F5CD47 | Caution, warnings |
| Danger | #F87462 | Critical, blockers |
| Dark Neutral-50 | #161A1D | Page background |
| Dark Neutral-100 | #22242F | Secondary backgrounds |
| Dark Neutral-200 | #44546F | Borders, dividers |
| Dark Neutral-300 | #738496 | Secondary text |
| Dark Neutral-400 | #DFE1E6 | Primary text, body |
| Dark Neutral-500 | #F1F2F4 | Headings, strong text |

### Typography

```
Heading 1: 28px, 700 weight, 32px line-height  (Page titles)
Heading 2: 24px, 600 weight, 28px line-height  (Section titles)
Heading 3: 20px, 600 weight, 24px line-height  (Subsection titles)
Heading 4: 16px, 600 weight, 20px line-height  (Card titles)
Body:      14px, 400 weight, 20px line-height  (Regular text)
Small:     12px, 400 weight, 16px line-height  (Captions, timestamps)
Code:      12px, 500 weight, monospace         (Code blocks)
```

### Spacing Scale

Use multiples of 4px:
- `0` = 0px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px
- `10` = 40px
- `12` = 48px

### Elevation / Shadows

```
Elevation 0: none
Elevation 1: 0 1px 1px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
Elevation 2: 0 4px 8px -2px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
Elevation 3: 0 12px 24px -6px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
Elevation 4: 0 20px 32px -8px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
```

### Animations & Transitions

```
Color, background-color, border-color: 150ms ease-in-out
Opacity, transform: 200ms ease-out
Pulse animation: 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

---

## Component Library

### 1. Header / Navigation Component

**Location:** `src/components/Header.tsx`

**Props:**
```typescript
interface HeaderProps {
  isDarkMode: boolean
  onToggleTheme: () => void
  activeTab?: 'dashboard' | 'overnight' | 'settings'
}
```

**Features:**
- ✅ Logo + App title (left side)
- ✅ Navigation tabs: Dashboard, Overnight Summary, Settings
- ✅ Theme toggle (light/dark)
- ✅ Settings gear icon
- ✅ User avatar menu
- ✅ Responsive: hamburger menu on mobile (<640px)
- ✅ Sticky positioning (top: 0, z-index: 50)
- ✅ Box shadow elevation-1

**States:**
- Default (light navigation)
- Dark mode (dark navigation)
- Mobile (hamburger menu)
- Active tab highlight

**Responsive:**
```
Desktop (>1024px):  Full horizontal nav
Tablet (640-1024px): Condensed nav
Mobile (<640px):     Hamburger menu (not implemented in MVP)
```

---

### 2. OvernightSummary Card (Hero)

**Location:** `src/components/OvernightSummaryCard.tsx`

**Props:**
```typescript
interface OvernightSummaryCardProps {
  summary: OvernightSummary
  isLoading: boolean
  error?: string
  onRefresh: () => void
}
```

**Layout:**
```
┌─────────────────────────────────────────────┐
│ WHAT CHANGED OVERNIGHT                      │
│                                             │
│ 3 Jira items require action                 │
│ 2 escalations were assigned                 │
│ 5 items moved to Resolved                   │
│ ...                                         │
│                                             │
│ Biggest Risk: [alert box]                   │
│                                             │
│ Recommended First Actions:                  │
│ 1. ...                                      │
│ 2. ...                                      │
│ 3. ...                                      │
│                                             │
│ ⟲ Last updated: 8:15 AM   [Refresh] [View] │
└─────────────────────────────────────────────┘
```

**States:**

#### Loading
- Skeleton loader (pulsing animation)
- 5-6 placeholder lines
- Buttons disabled

#### Loaded
- Full content displayed
- Metrics visible
- Risk box displayed
- Action buttons active

#### Empty
- Icon: ☕
- Message: "No changes overnight — enjoy your coffee!"
- Buttons available

#### Error
- Error icon: ⚠️
- Message: "Failed to load overnight summary"
- [Retry] button prominent

#### Cached
- Timestamp badge: "Cached (5m old)"
- Refresh button highlighted
- Content displayed with reduced opacity

**Styling:**
- Background: white / dark-neutral-100
- Border: 1px neutral-200 / dark-neutral-200
- Shadow: elevation-2
- Padding: 24px
- Border-radius: 8px
- Hover shadow: elevation-3

---

### 3. KPI Card

**Location:** `src/components/KPICard.tsx`

**Props:**
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

**Layout:**
```
┌──────────────────────┐
│ Today's Attention    │  ← Title (Heading-4)
│                      │
│        78            │  ← Value (Heading-1)
│       🔺 +12%        │  ← Trend indicator
│                      │
│ Up from 66 today     │  ← Detail (Body)
│                      │
│ Click to drill ✓     │  ← Subtle footer
└──────────────────────┘
```

**Color Mapping:**
- GREEN status: Success color (good metric)
- YELLOW status: Warning color (alert threshold)
- RED status: Danger color (critical)

**Trend Indicators:**
- UP: 🔺 in danger/danger-dark
- DOWN: 🔻 in success/success-dark
- STABLE: ➡️ in neutral-300/dark-neutral-300

**Styling:**
- Background: white / dark-neutral-100
- Border: 1px neutral-200 / dark-neutral-200
- Shadow: elevation-2
- Padding: 24px
- Border-radius: 8px
- Hover: shadow elevation-3, cursor pointer
- Transition: shadow 200ms ease-out

**Responsive:**
```
Mobile (<640px):       1 column (full width)
Tablet (640-1024px):   2 columns
Desktop (>1024px):     4 columns
```

---

### 4. KPI Grid

**Location:** `src/components/KPIGrid.tsx`

**Props:**
```typescript
interface KPIGridProps {
  metrics: KPIMetric[]
  isLoading: boolean
}
```

**Features:**
- Grid layout with responsive columns
- 8 total KPI cards in full implementation:
  1. Today's Attention Score
  2. Open Actions
  3. Critical Items
  4. Aging Emails (>48h old)
  5. Unaccepted Meetings
  6. Jira Updates
  7. Calendar Conflicts
  8. Escalations This Week

**Loading State:**
- Skeleton loaders for each card
- Pulsing animation
- Maintains grid layout

---

### 5. Jira Item Card

**Location:** `src/components/JiraItemCard.tsx`

**Props:**
```typescript
interface JiraItemCardProps {
  item: JiraActivityItem
  onClick?: () => void
}
```

**Layout:**
```
┌──────────────────────────────────────────┐
│ DAIS-123                      [P1 Blue]   │  ← Issue key + priority badge
│ In Progress → Resolved         [3h ago]   │  ← Status change + timestamp
│ API authentication not working in staging │  ← Summary
│                                          │
│ Changed by: Alex Chen | DAIS             │  ← User + Project
│                                          │
│ [View in Jira →]                        │  ← CTA button
└──────────────────────────────────────────┘
```

**Left Border Color by Type:**
- NEW: green (success)
- STATUS_CHANGE: blue (primary)
- BLOCKER: red (danger)
- CLOSED: gray (neutral-300)

**Styling:**
- Background: white / dark-neutral-100
- Left border: 4px colored
- Padding: 16px
- Margin-bottom: 12px
- Border-radius: 4px
- Hover: shadow elevation-1, cursor pointer

---

### 6. Email Item Card

**Location:** `src/components/EmailItemCard.tsx`

**Props:**
```typescript
interface EmailItemCardProps {
  item: OutlookActivityItem
  onClick?: () => void
}
```

**Layout:**
```
┌──────────────────────────────────────────┐
│ 🚩 Jennifer Wong              [Flagged]   │  ← Avatar + name + flag
│ ACTION REQUIRED: Q3 Roadmap Approval     │  ← Subject
│ We need your approval on the Q3...       │  ← Body preview
│                                          │
│ [📎 1 attachment] | 6:45 AM (4h ago)     │  ← Metadata
│ Status: Awaiting response                │  ← Status
│                                          │
│ [Reply →] [Forward →]                   │  ← Actions
└──────────────────────────────────────────┘
```

**Left Border Color by Severity:**
- CRITICAL: red (danger)
- AGING: orange (warning)
- ACTION_REQUIRED: yellow (warning-dark)

**Icons:**
- 🚩 = Flagged
- 📎 = Attachment
- 🔴 = Unread

**Styling:**
- Background: white / dark-neutral-100
- Left border: 4px colored
- Padding: 16px
- Margin-bottom: 12px
- Border-radius: 4px
- Hover: shadow elevation-1, cursor pointer

---

### 7. Calendar Item Card

**Location:** `src/components/CalendarItemCard.tsx`

**Props:**
```typescript
interface CalendarItemCardProps {
  item: CalendarIssueItem
  onClick?: () => void
}
```

**Layout:**
```
┌──────────────────────────────────────────┐
│ 🔴 CONFLICT                              │  ← Status indicator
│                                          │
│ Architecture Review — Q3 Planning         │  ← Event titles
│ 9:00 AM - 10:00 AM (1 hour) | 12 attend. │  ← Time + attendees
│                                          │
│ Organizer: Michael Johnson               │  ← Organizer
│ Your status: TENTATIVE (⚠️ Not accepted) │  ← Response status
│                                          │
│ Overlapping with:                        │  ← Conflict details
│   Q3 Planning (9:30 AM - 11:00 AM)      │
│                                          │
│ [Accept] [Decline] [View in Cal →]      │  ← Actions
└──────────────────────────────────────────┘
```

**Status Badges:**
- ACCEPTED: ✅ Green
- TENTATIVE: ⚠️ Yellow
- DECLINED: ❌ Red
- NOT_RESPONDED: ❓ Gray

**Styling:**
- Background: white / dark-neutral-100
- Border: 1px colored (matches status)
- Padding: 16px
- Margin-bottom: 12px
- Border-radius: 4px

---

### 8. Loading Skeleton

**Location:** `src/components/Skeleton.tsx`

**Props:**
```typescript
interface SkeletonProps {
  className?: string
  count?: number
}
```

**Features:**
- Pulse animation (2s infinite)
- Configurable dimensions via className
- Use for cards, text lines, images
- Maintains layout structure while loading

---

### 9. Empty State

**Location:** `src/components/EmptyState.tsx`

**Props:**
```typescript
interface EmptyStateProps {
  icon: string
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}
```

**Examples:**
- No overnight changes: "☕" + "No changes overnight — enjoy your coffee!"
- No critical emails: "📭" + "All caught up!"
- No calendar conflicts: "✅" + "Your calendar is clear!"

---

### 10. Error State

**Location:** `src/components/ErrorState.tsx`

**Props:**
```typescript
interface ErrorStateProps {
  title: string
  message: string
  onRetry?: () => void
}
```

**Features:**
- Error icon: ⚠️
- Descriptive message
- [Retry] button (if retryable)
- Toast notification for transient errors

---

## Page Layouts

### Dashboard Page (/)

**File:** `src/pages/index.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│ HEADER (sticky, elevation-1)            │
├─────────────────────────────────────────┤
│                                         │
│ OVERNIGHT SUMMARY CARD (hero, full-width)
│                                         │
│ EXECUTIVE DASHBOARD (KPI Grid)          │
│                                         │
│ OVERNIGHT JIRA ACTIVITY (section)       │
│ ├─ Grouped by change type               │
│ └─ Items with left border               │
│                                         │
│ CRITICAL EMAILS (section)               │
│ └─ Sorted by age/priority               │
│                                         │
│ CALENDAR ISSUES (section)               │
│ └─ Conflicts first, then unaccepted     │
│                                         │
└─────────────────────────────────────────┘
```

**Content Width:** max-width: 1280px (7xl), centered with padding

---

### Overnight Summary Page (/overnight)

**File:** `src/pages/overnight.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│ HEADER                                  │
├─────────────────────────────────────────┤
│                                         │
│ Page Title: "Overnight Summary"          │
│ Subtitle: "Generated at 8:15 AM"        │
│                                         │
│ [Date Range Picker] [Export] [Share]    │
│                                         │
│ METRICS BREAKDOWN (grid)                │
│ ├─ Jira Items by Status                 │
│ ├─ Emails by Category                   │
│ ├─ Calendar Status                      │
│ └─ Escalations                          │
│                                         │
│ DETAILED ACTIVITY LOG                   │
│ └─ Timeline view or list                │
│                                         │
└─────────────────────────────────────────┘
```

---

### Settings Page (/settings)

**File:** `src/pages/settings.tsx`

**Layout:**
```
┌─────────────────────────────────────────┐
│ HEADER                                  │
├─────────────────────────────────────────┤
│                                         │
│ Page Title: "Settings"                  │
│                                         │
│ PROFILE SECTION                         │
│ ├─ Name, email, avatar                  │
│ └─ Edit Profile                         │
│                                         │
│ INTEGRATION SECTION                     │
│ ├─ Jira connection                      │
│ ├─ Outlook connection                   │
│ └─ Calendar sync status                 │
│                                         │
│ NOTIFICATION PREFERENCES                │
│ ├─ Email alerts                         │
│ ├─ Browser notifications                │
│ └─ Quiet hours                          │
│                                         │
│ DISPLAY PREFERENCES                     │
│ ├─ Theme (light/dark)                   │
│ └─ Timezone                             │
│                                         │
│ DANGER ZONE                             │
│ └─ Disconnect Jira / Logout             │
│                                         │
└─────────────────────────────────────────┘
```

---

## Interaction Patterns

### Loading Pattern

1. **Initial Load:**
   - Show skeleton loaders
   - Maintain layout structure (no jump)
   - Pulse animation at 2s interval

2. **Refresh:**
   - Show "Updating..." badge
   - Keep existing data visible
   - Fade in new data on arrival

3. **Slow Load (>2s):**
   - Show progress indicator
   - Estimated time to completion
   - Can cancel if desired

### Error Handling

1. **Transient Error:**
   - Toast notification (top-right)
   - Auto-dismiss after 5s
   - [Retry] button available

2. **Critical Error:**
   - Full-screen error state
   - Descriptive message
   - [Retry] or [Go Home] button

3. **Partial Failure:**
   - Section shows error state
   - Other sections continue loading
   - Toast notifies user of partial failure

### Hover Effects

```
Cards:
- Shadow increases to elevation-3
- Background slightly lightens/darkens
- Cursor changes to pointer

Links:
- Underline appears
- Color darkens
- Focus ring appears on Tab

Buttons:
- Background opacity decreases
- Shadow increases
- Cursor changes to pointer
```

### Click Behavior

- **Jira cards:** Opens Jira in new tab
- **Email cards:** Opens email client or modal
- **Calendar cards:** Opens Calendar app or modal
- **KPI cards:** Navigates to detail page (future)

### Keyboard Navigation

- **Tab:** Move through interactive elements
- **Shift + Tab:** Reverse direction
- **Enter:** Activate button/link
- **Space:** Toggle checkbox
- **Escape:** Close modal/menu

### Focus Indicators

- Visible ring: 2px primary color with 2px offset
- Min contrast: 3:1 against background
- Visible on all interactive elements
- No outline removal

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- [ ] Normal text: 4.5:1 contrast ratio
- [ ] Large text (18pt+): 3:1 contrast ratio
- [ ] UI components: 3:1 contrast ratio

#### Keyboard Access
- [ ] All interactive elements accessible via Tab key
- [ ] Logical Tab order (left-to-right, top-to-bottom)
- [ ] Visible focus indicators
- [ ] No keyboard traps

#### Screen Reader Support
- [ ] Semantic HTML (button, link, heading, etc.)
- [ ] ARIA labels for icon buttons
- [ ] Form labels associated with inputs
- [ ] List semantics for item lists
- [ ] Live region updates (for dynamic content)

#### Motion & Animation
- [ ] Respect `prefers-reduced-motion` media query
- [ ] Animations optional/can be disabled
- [ ] Auto-play videos: no sound, no animation

#### Images & Icons
- [ ] Alt text for all meaningful images
- [ ] Icon-only buttons have aria-label
- [ ] Decorative elements have aria-hidden

#### Forms
- [ ] All inputs have associated labels
- [ ] Error messages linked to fields
- [ ] Required fields indicated (not color-only)
- [ ] Clear error recovery instructions

#### Structure
- [ ] Descriptive page title
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] No empty headings
- [ ] Content landmarks (header, main, footer)

### Testing Tools
- [ ] WAVE (WebAIM)
- [ ] axe DevTools
- [ ] Lighthouse (Chrome)
- [ ] NVDA (screen reader testing)
- [ ] Manual keyboard testing

---

## Implementation Checklist

### Phase 1: Foundation Components (Priority 1)

- [ ] **Header**
  - [ ] Logo + app title
  - [ ] Navigation tabs
  - [ ] Theme toggle
  - [ ] Settings icon
  - [ ] User menu
  - [ ] Sticky positioning
  - [ ] Mobile hamburger (not in MVP)

- [ ] **OvernightSummaryCard**
  - [ ] Layout structure
  - [ ] Loading state (skeleton)
  - [ ] Loaded state
  - [ ] Empty state
  - [ ] Error state
  - [ ] Cached state
  - [ ] Refresh button
  - [ ] View details button

- [ ] **KPI Card**
  - [ ] Layout with value + trend
  - [ ] Color status mapping (GREEN/YELLOW/RED)
  - [ ] Trend indicators (UP/DOWN/STABLE)
  - [ ] Click handler
  - [ ] Hover effects

- [ ] **KPI Grid**
  - [ ] Responsive layout (1/2/4 columns)
  - [ ] Grid spacing
  - [ ] Loading skeleton grid
  - [ ] 8 KPI cards visible

### Phase 2: Content Components (Priority 2)

- [ ] **Jira Item Card**
  - [ ] Issue key + priority badge
  - [ ] Status change display
  - [ ] Left border by type
  - [ ] Timestamp
  - [ ] View Jira link
  - [ ] Hover effects

- [ ] **Email Item Card**
  - [ ] Sender avatar + name
  - [ ] Subject line
  - [ ] Body preview
  - [ ] Flag/attachment indicators
  - [ ] Timestamp
  - [ ] Status badge
  - [ ] Action buttons (Reply/Forward - future)

- [ ] **Calendar Item Card**
  - [ ] Conflict indicator
  - [ ] Event titles
  - [ ] Time + attendee count
  - [ ] Organizer info
  - [ ] Response status badge
  - [ ] Overlapping event details
  - [ ] Action buttons

- [ ] **Skeleton & Loading States**
  - [ ] Pulse animation
  - [ ] Multiple variants (line, card, image)
  - [ ] Accessibility (aria-busy)

### Phase 3: Pages & Layouts (Priority 3)

- [ ] **Dashboard Page (/)**
  - [ ] Header component
  - [ ] OvernightSummaryCard
  - [ ] KPIGrid
  - [ ] Jira activity section
  - [ ] Email section
  - [ ] Calendar section
  - [ ] Responsive layout
  - [ ] Dark mode support

- [ ] **Overnight Page (/overnight)** - Future
  - [ ] Page structure
  - [ ] Date range picker
  - [ ] Metrics breakdown
  - [ ] Activity log

- [ ] **Settings Page (/settings)** - Future
  - [ ] Profile section
  - [ ] Integration settings
  - [ ] Notification preferences
  - [ ] Display settings

### Phase 4: Polish & Accessibility (Priority 4)

- [ ] **Theme System**
  - [ ] Light mode colors
  - [ ] Dark mode colors
  - [ ] Transition animations
  - [ ] LocalStorage persistence

- [ ] **Accessibility**
  - [ ] WCAG AA contrast testing
  - [ ] Keyboard navigation
  - [ ] Screen reader testing
  - [ ] Focus indicators
  - [ ] ARIA labels

- [ ] **Responsive Design**
  - [ ] Mobile testing (<640px)
  - [ ] Tablet testing (640-1024px)
  - [ ] Desktop testing (>1024px)
  - [ ] Touch-friendly targets (44px min)

- [ ] **Performance**
  - [ ] Image optimization
  - [ ] Code splitting
  - [ ] Component lazy loading
  - [ ] Bundle size analysis

---

## File Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── OvernightSummaryCard.tsx
│   ├── KPICard.tsx
│   ├── KPIGrid.tsx
│   ├── JiraItemCard.tsx
│   ├── EmailItemCard.tsx
│   ├── CalendarItemCard.tsx
│   ├── Skeleton.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   └── index.ts
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx (Dashboard)
│   ├── overnight.tsx (Future)
│   └── settings.tsx (Future)
├── hooks/
│   ├── useOvernightSummary.ts
│   ├── useDashboard.ts
│   └── useFetch.ts
├── services/
│   ├── api.ts
│   └── cache.ts
├── types/
│   ├── index.ts
│   ├── jira.ts
│   ├── outlook.ts
│   ├── calendar.ts
│   └── dashboard.ts
├── styles/
│   └── globals.css
└── utils/
    ├── timezone.ts
    ├── formatting.ts
    └── validation.ts
```

---

## Notes & Known Issues

### MVP Scope (Sprint)
- ✅ Dashboard page with header
- ✅ OvernightSummaryCard
- ✅ KPI Grid (8 cards)
- ✅ Component placeholders for Jira/Email/Calendar
- ✅ Dark mode toggle
- ✅ Responsive design
- ⚠️ Uses mock data (no API integration)

### Post-Sprint (Next Phase)
- [ ] Connect to real Jira API
- [ ] Connect to Outlook/Calendar API
- [ ] Overnight & Settings pages
- [ ] Email action buttons (Reply, Forward)
- [ ] Calendar conflict resolution UI
- [ ] WebSocket real-time updates
- [ ] Advanced filtering & sorting

### Design Decisions
- Used Tailwind CSS for rapid prototyping
- Light/dark mode via CSS class toggle
- Component library approach for reusability
- No external UI framework (custom Tailwind setup)
- Accessibility-first with semantic HTML

---

**Next Step:** Begin component implementation starting with Header and OvernightSummaryCard.
