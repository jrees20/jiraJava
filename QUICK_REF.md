# Quick Reference Card

## Files You Need to Know

| File | Purpose | Owner |
|------|---------|-------|
| `specs/FEATURES.md` | Feature specs & acceptance criteria | Product Manager |
| `specs/DATA_MODEL.md` | TypeScript interfaces & DB schema | Enterprise Architect |
| `specs/API.md` | REST API contracts & examples | Full Stack Engineer |
| `specs/UI_SPECS.md` | Component specs & design tokens | UX Architect |
| `docs/ARCHITECTURE.md` | System design & data flow | Enterprise Architect |
| `docs/INTEGRATIONS.md` | API integration code samples | Full Stack Engineer |
| `CLAUDE.md` | Code standards & team collab | All |
| `PROJECT_PLAN.md` | 90-minute sprint timeline | Product Manager |
| `SETUP.md` | Environment setup & dev guide | Full Stack Engineer |

---

## Key TypeScript Interfaces

```typescript
// Core domain objects
interface OvernightSummary {
  id: string
  userId: string
  metrics: { jiraItemsRequiringAction, escalationsAssigned, ... }
  biggestRisk: { title, source, severity }
  recommendedActions: RecommendedAction[]
  attentionScore: number
}

interface JiraItem {
  issueKey: string
  summary: string
  priority: 'BLOCKER' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5'
  currentStatus: string
  previousStatus: string
  changeType: 'NEW' | 'STATUS_CHANGE' | 'BLOCKER' | ...
  changedBy: User
}

interface EmailItem {
  subject: string
  sender: { name, email }
  body: string
  category: 'CRITICAL' | 'AGING' | 'ACTION_REQUIRED'
  receivedAt: Date
  isRead: boolean
  isFlagged: boolean
}

interface CalendarItem {
  title: string
  startTime: Date
  endTime: Date
  conflictType: 'OVERLAP' | 'UNACCEPTED'
  userResponseStatus: 'ACCEPTED' | 'TENTATIVE' | 'DECLINED'
}
```

---

## Core API Endpoints

```
GET /api/overnight-summary    → OvernightSummary
GET /api/executive-dashboard  → ExecutiveDashboard
GET /api/jira-items          → JiraItem[]
GET /api/email-items         → EmailItem[]
GET /api/calendar-items      → CalendarItem[]
```

---

## Component Hierarchy

```
App
├─ Header (Navigation, Theme Toggle)
├─ OvernightSummaryCard (Hero - top)
├─ ExecutiveDashboard (KPI Grid - 2x4)
├─ OvernightJiraActivity (List section)
├─ CriticalEmails (List section)
├─ CalendarIssues (List section)
└─ Footer
```

---

## Color Status Mapping

```
GREEN  = Good (value < threshold.good)
YELLOW = Warning (threshold.good ≤ value < threshold.critical)
RED    = Critical (value ≥ threshold.critical)

Example for Attention Score:
- 0-30:   GREEN (relaxed day)
- 31-60:  YELLOW (normal day)
- 61+:    RED (urgent day)
```

---

## Business Logic Notes

### Overnight Window
- **Default:** 6 PM yesterday → 8 AM today
- **Timezone:** User-configurable (from Users table)
- **Business hours:** User-configurable (default 8-6)

### Attention Score Calculation
```
score = 0
score += criticalEmails × 20
score += meetingConflicts × 15
score += actionItems × 10
score += escalations × 15
score -= resolved × 3
score -= closed × 2
return max(0, min(100, score))
```

### Recommended Actions
1. **Order by:** Priority (Blocker > P1 > ...) → Age (oldest first)
2. **Count:** Top 5 actions max
3. **Estimate:** Manual time estimates (5-15 min each)

---

## Common Commands

```bash
# Setup
npm install
npm run db:migrate

# Development
npm run dev          # Start dev server on :3000
npm run type-check   # TypeScript type checking
npm test             # Run tests
npm run lint         # Run ESLint

# Database
npm run db:reset     # Drop & recreate (dev only)
psql morning_command_center_dev  # Connect to DB

# Git
git checkout -b feat/my-feature
git commit -m "feat(section): description"
git push origin feat/my-feature
```

---

## 90-Minute Sprint Checklist

### First 15 Minutes
- [ ] Team reviews specs together
- [ ] Roles assigned (PM, EA, FSE, UX)
- [ ] Tech stack confirmed
- [ ] Blockers identified

### Minutes 15-45
- [ ] Database schema designed
- [ ] TypeScript interfaces written
- [ ] API stubs created
- [ ] Service interfaces sketched

### Minutes 45-75
- [ ] Jira service working
- [ ] Outlook service working
- [ ] Component basics rendering
- [ ] Custom hooks connecting to APIs

### Minutes 75-90
- [ ] API endpoints wired
- [ ] Aggregation algorithm working
- [ ] Dark mode tested
- [ ] Demo ready

---

## Accessibility Checklist

Before every component ships:
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)
- [ ] Focus indicators visible (keyboard nav)
- [ ] ARIA labels for icons/complex elements
- [ ] Alt text for images
- [ ] Keyboard-only navigation works
- [ ] Respects `prefers-reduced-motion`

---

## Performance Targets

```
Page Load:      < 2 seconds
API Response:   < 500ms P95
Time to Insight:< 30 seconds
Lighthouse:     > 80 (Performance)
```

---

## API Error Codes

```
200 OK              ✅ Success
206 Partial         ⚠️ Some sources failed, using cache
400 Bad Request     ❌ Invalid params
401 Unauthorized    ❌ Missing token
429 Too Many Req.   ⏱️ Rate limited
503 Unavailable     🔥 Jira/Outlook down
500 Server Error    💥 Our bug
```

---

## Data Flow (Simplified)

```
User opens app
    ↓
Browser requests GET /api/overnight-summary
    ↓
Backend aggregates from:
  • Jira (issues in last 24h)
  • Outlook (emails in last 24h)
  • Calendar (events today)
    ↓
Backend generates:
  • Metrics counts
  • Attention score
  • Recommended actions
    ↓
Frontend renders:
  • OvernightSummaryCard
  • KPI Dashboard
  • Detailed lists
    ↓
User sees answer in < 2 seconds
"What changed overnight?"
```

---

## Team Communication Shortcuts

**When blocked:**
- Jira API down? → Use mock data, swap later
- Outlook API down? → Use mock data, swap later
- Database issue? → Use in-memory cache, fix after sprint
- Design question? → Product Manager decides immediately

**When in doubt:**
- Check the spec (specs/ folder)
- Check the architecture doc (docs/)
- Ask the team in Slack (no async decisions)

**When done:**
- Create PR with clear description
- Reference spec document
- Wait for 1 approval
- Merge to main

---

## Roles at a Glance

| Role | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|------|---------|---------|---------|---------|
| **PM** | Lead spec review | Define algorithm | Support FSE | Verify output |
| **EA** | Align architecture | Design DB + types | Review services | Check flows |
| **FSE** | Confirm tech stack | Code services | Implement APIs | Integration |
| **UX** | Review UI spec | Support types | Build components | Polish & demo |

---

## Useful Links (Once Connected)

- Jira instance: https://company.atlassian.net
- Outlook: https://outlook.office.com
- GitHub repo: (will be provided)
- Azure portal: https://portal.azure.com
- PostgreSQL docs: https://www.postgresql.org/docs/

---

## One-Line Status Format

Use this for async standup messages:

```
✅ Jira service working | ⏳ Wiring API endpoints | 🚫 None | Next: Integration tests
```

Format: `[Done] | [In Progress] | [Blockers] | [Next]`

---

## Post-Sprint Success Looks Like...

- [ ] Running prototype with real Jira + Outlook data
- [ ] All core components rendering correctly
- [ ] Theme system working (light + dark)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] No TypeScript errors, no console errors
- [ ] Team understands full data flow
- [ ] Specs updated with implementation learnings
- [ ] 2-minute demo ready to show

---

## Emergency Contacts (Use Sparingly)

Product Manager: Make scope/priority decisions  
Enterprise Architect: DB/schema decisions  
Full Stack Engineer: Tech/API decisions  
UX Architect: Design/component decisions  

**Decision needed?** Ask the right person. No debate. Decide in < 2 minutes.

---

## Last Reminders

✔️ **Code quality matters** — even in a 90-minute sprint  
✔️ **Tests matter** — at least for critical paths  
✔️ **Specs are real** — update them if you discover something  
✔️ **Dark mode matters** — test both themes  
✔️ **Accessibility matters** — quick audit required  
✔️ **Communication matters** — ask questions early, not at the end  
✔️ **Scope is fixed** — if behind, cut features, not quality  

🎯 **Goal:** Production-quality prototype, not a demo.

---

**Generated:** 2025-07-30  
**Sprint Duration:** 90 minutes  
**Status:** Ready to start  

Good luck! 🚀
