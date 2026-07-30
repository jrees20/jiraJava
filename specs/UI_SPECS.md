# UI/UX Specifications

## Design System

### Color Palette (Light Mode)

```
Primary:    #0052CC  (Jira Blue)
Success:    #216E4E  (Green)
Warning:    #974F0C  (Orange)
Danger:     #AE2A19  (Red)
Neutral-50: #F7F8F9
Neutral-100:#F1F2F4
Neutral-200:#DFE1E6
Neutral-300:#626F86
Neutral-400:#44546F
Neutral-500:#22242F
```

### Color Palette (Dark Mode)

```
Primary:    #0052CC  (same)
Success:    #4BCE97
Warning:    #F5CD47
Danger:     #F87462
Neutral-50: #161A1D
Neutral-100:#22242F
Neutral-200:#44546F
Neutral-300:#738496
Neutral-400:#DFE1E6
Neutral-500:#F1F2F4
```

### Typography

```
Heading 1: 28px, 700 weight, line-height 32px
Heading 2: 24px, 600 weight, line-height 28px
Heading 3: 20px, 600 weight, line-height 24px
Heading 4: 16px, 600 weight, line-height 20px
Body:      14px, 400 weight, line-height 20px
Small:     12px, 400 weight, line-height 16px
Code:      12px, 500 weight, font-family monospace
```

### Spacing Scale

```
0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px
Use multiples of 4px
```

### Shadows

```
Elevation 0: none
Elevation 1: 0 1px 1px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
Elevation 2: 0 4px 8px -2px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
Elevation 3: 0 12px 24px -6px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
Elevation 4: 0 20px 32px -8px rgba(0,0,0,0.13), 0 0 1px rgba(0,0,0,0.15)
```

---

## Page Layout

### Header / Navigation

```
┌─────────────────────────────────────────────────────────────┐
│ 🏠 Logo   Morning Command Center                      ⚙️ 👤 │
│ Home / Overnight Summary / Dashboard / Settings             │
└─────────────────────────────────────────────────────────────┘
```

**Elements:**
- Logo (clickable to home)
- App title
- Navigation tabs (sticky at top)
- Theme toggle (light/dark)
- Settings (gear icon)
- User menu (avatar)

**Responsive:** 
- Desktop: Full navigation bar
- Tablet: Condensed navigation
- Mobile: Hamburger menu

---

## Main Page Layout (Desktop)

```
┌──────────────────────────────────────────────────────────────┐
│ HEADER                                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  WHAT CHANGED OVERNIGHT (Hero Card - Full Width)            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 3 Jira items  │ 2 Escalations │ 5 Resolved │ 1 Email  │ │
│  │ Biggest Risk: ANB Sprint 1...                           │ │
│  │ Recommended Actions: 1. Review DAIS-123 ...             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  EXECUTIVE DASHBOARD (Grid - 4 cols on desktop)             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ...     │
│  │ Attention 78 │ │ Open Actions │ │ Critical ... │         │
│  │ 🔺 +12%      │ │     8        │ │      1       │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ...     │
│  │ Aging Emails │ │ Jira Updates │ │ Conflicts    │         │
│  │      2       │ │      12      │ │      1       │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                              │
│  OVERNIGHT JIRA ACTIVITY (Grouped List)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ STATUS CHANGES (5)                                      │ │
│  │ ├─ DAIS-123  In Progress → Resolved [by Alex Chen]     │ │
│  │ ├─ DAIS-987  Resolved → Closed [by Charlie Wong]       │ │
│  │ └─ ...                                                  │ │
│  │                                                         │ │
│  │ NEW ISSUES (2)                                          │ │
│  │ ├─ DAIS-551  NEW [You were mentioned]                  │ │
│  │ └─ ...                                                  │ │
│  │                                                         │ │
│  │ BLOCKERS (1)                                            │ │
│  │ └─ DAIS-123  Blocked by API access [Critical]          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  CRITICAL EMAILS (List)                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ From: Jennifer Wong                                    │ │
│  │ Subject: ACTION REQUIRED: Q3 Roadmap Approval 🚩       │ │
│  │ Body preview: We need your approval on the Q3 roadmap │ │
│  │ 6:45 AM (4h ago) | 🎯 Flagged | Has attachment        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ...                                                        │
│                                                              │
│  CALENDAR ISSUES (List)                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 🔴 CONFLICT: Architecture Review (9:00 AM - 10:00 AM)  │ │
│  │    Overlaps with: Q3 Planning (9:30 AM - 11:00 AM)     │ │
│  │    Status: TENTATIVE (unaccepted)                       │ │
│  │    [Accept] [Decline]                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. OvernightSummary Card (Hero)

**State: Loaded**
```
┌─────────────────────────────────────────────────────────┐
│ WHAT CHANGED OVERNIGHT                                  │
│                                                         │
│ 3 Jira items require action                             │
│ 2 escalations were assigned                             │
│ 5 items moved to Resolved                               │
│ 3 items moved to Closed                                 │
│ 1 critical email is 48 hours old                        │
│ 2 meetings are unaccepted                               │
│ 1 calendar conflict exists                              │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Biggest Risk:                                       │ │
│ │ ANB Sprint 1 integration testing is blocked by API │ │
│ │ access. Assign @Sarah or @Mike ASAP.               │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Recommended First Actions:                              │
│ 1. Review DAIS-123 (5 min)                              │
│ 2. Respond to Charlie's design question (10 min)        │
│ 3. Accept Architecture Review meeting (2 min)           │
│                                                         │
│ ⟲ Last updated: 8:15 AM (just now)                     │
│ [Refresh] [View Details]                               │
└─────────────────────────────────────────────────────────┘
```

**States:**
- Loading: Skeleton loader with pulse animation
- Empty: "No changes overnight — enjoy your coffee ☕"
- Error: "Failed to load overnight summary [Retry]"
- Cached: Show timestamp, "This data is cached (5m old)"

---

### 2. KPI Card Component

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
  onClick: () => void
}
```

**Rendering:**
```
┌─────────────────────┐
│ Today's Attention.. │
│                     │
│        78           │  <- Value (large, bold)
│       🔺 +12%       │  <- Trend indicator
│                     │
│ Up from 66 today    │  <- Detail text
│                     │
│ [Click to drill]    │  <- Subtle footer hint
└─────────────────────┘
```

**Color Mapping:**
- GREEN: Value good (below threshold.good)
- YELLOW: Value warning (between good/critical)
- RED: Value critical (above threshold.critical)

---

### 3. Jira Item Card

```
┌──────────────────────────────────────────────────────┐
│ DAIS-123                                  [P1 Blue]   │
│ In Progress → Resolved                     [3h ago]   │
│ API authentication not working in staging             │
│                                                      │
│ Changed by: Alex Chen (avatar) | Project: DAIS      │
│                                                      │
│ [View in Jira →]                                     │
└──────────────────────────────────────────────────────┘
```

**Variants:**
- NEW: Green left border
- STATUS_CHANGE: Blue left border
- BLOCKER: Red left border
- CLOSED: Gray with strikethrough

**Clickable areas:**
- Issue key → Jira
- Summary → Jira
- Project → Filter by project
- Changed by → View user profile (optional)

---

### 4. Email Item Card

```
┌──────────────────────────────────────────────────────┐
│ 🚩 Jennifer Wong                           [Flagged]  │
│ ACTION REQUIRED: Q3 Roadmap Approval                 │
│ We need your approval on the Q3 roadmap update...    │
│                                                      │
│ [📎 1 attachment] | 6:45 AM (4h ago)                 │
│ Status: Awaiting response                            │
│                                                      │
│ [Reply →] [Forward →]                               │
└──────────────────────────────────────────────────────┘
```

**Color Coding:**
- CRITICAL: Red left border
- AGING: Orange left border
- ACTION_REQUIRED: Yellow left border

**Icons:**
- 🚩 = Flagged
- 📎 = Attachment
- 🔴 = Unread (for variation)

---

### 5. Calendar Item Card

```
┌──────────────────────────────────────────────────────┐
│ 🔴 CONFLICT                                          │
│                                                      │
│ Architecture Review — Q3 Planning                     │
│ 9:00 AM - 10:00 AM (1 hour) | 12 attendees           │
│                                                      │
│ Organizer: Michael Johnson                           │
│ Your status: TENTATIVE (⚠️ Not accepted)             │
│                                                      │
│ Overlapping meeting:                                 │
│   Q3 Planning (9:30 AM - 11:00 AM)                   │
│                                                      │
│ [Accept] [Decline] [View in Calendar →]             │
└──────────────────────────────────────────────────────┘
```

**Status Badges:**
- ACCEPTED: Green checkmark
- TENTATIVE: Yellow warning triangle (⚠️)
- DECLINED: Red X
- NOT_RESPONDED: Gray question mark

---

## Responsive Breakpoints

```css
/* Mobile First */
Mobile:   < 640px    (1 column)
Tablet:   640px-1024px (2 columns)
Desktop:  > 1024px   (3-4 columns)
```

**KPI Grid Breakpoints:**
```
Mobile:   1 column (full width)
Tablet:   2 columns
Desktop:  4 columns
```

**Navigation Breakpoints:**
```
Mobile:   Hamburger menu (collapse nav)
Tablet:   Condensed horizontal nav
Desktop:  Full horizontal nav
```

---

## Interaction Patterns

### Loading States
- Skeleton loaders (pulse animation)
- Progress indicator for slow operations (>2s)
- "Updating..." badge during refresh

### Error States
- Toast notification (top-right, auto-dismiss after 5s)
- Error message in card with [Retry] button
- Fallback to cached data if available

### Empty States
- Friendly message with icon
- Suggest next action
- Example: "No issues overnight. You're all caught up! 🎉"

### Hover States
- Card shadow elevation increases
- Background color subtle change
- Cursor changes to pointer for clickable areas

### Accessibility
- All interactive elements keyboard-accessible (Tab order)
- Focus indicators visible (ring outline)
- Color not only indicator (use icons/patterns)
- Alt text for all icons/images
- ARIA labels for dynamic content
- Sufficient color contrast (WCAG AA 4.5:1 for text)

---

## Theme System (Tailwind CSS Config)

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      primary: '#0052CC',
      success: '#216E4E',
      warning: '#974F0C',
      danger: '#AE2A19',
      neutral: {
        50: '#F7F8F9',
        100: '#F1F2F4',
        200: '#DFE1E6',
        300: '#626F86',
        400: '#44546F',
        500: '#22242F'
      }
    },
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px'
    }
  }
}
```

---

## Animation & Transitions

```css
/* Transitions */
color, background, border-color: 150ms ease-in-out
opacity, transform: 200ms ease-out

/* Keyframe Animations */
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.5 }
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
}
```

---

## Accessibility Checklist

- [ ] Contrast ratio ≥ 4.5:1 for normal text
- [ ] Contrast ratio ≥ 3:1 for large text
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard navigation works (Tab/Shift+Tab/Enter)
- [ ] ARIA labels for complex components
- [ ] Alt text for all images/icons (or aria-hidden for decorative)
- [ ] Form labels properly associated
- [ ] Error messages linked to fields
- [ ] Page has descriptive title
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Motion/animation respects prefers-reduced-motion
- [ ] Color not the only differentiator

---

## Component Checklist (for Implementation)

- [ ] OvernightSummaryCard (loading, loaded, error, empty states)
- [ ] KPICard (all status variants)
- [ ] KPIGrid (responsive layout)
- [ ] JiraItemCard (all change types)
- [ ] EmailItemCard (all categories)
- [ ] CalendarItemCard (conflict types)
- [ ] SectionHeader (with filter/sort controls)
- [ ] EmptyState (icon + message + CTA)
- [ ] LoadingState (skeleton loaders)
- [ ] ErrorState (with retry)
- [ ] Header/Navigation (sticky, responsive)
- [ ] Theme Toggle (light/dark)
- [ ] UserMenu (settings, logout)
