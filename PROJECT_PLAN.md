# 90-Minute Sprint Plan

## Goal
Create a production-quality prototype of Morning Command Center with spec code for all core features.

## Timeline Breakdown

```
Total: 90 minutes
├─ Phase 1 (0-15 min):  Spec Alignment & Architecture
├─ Phase 2 (15-45 min): Data Model & API Contracts
├─ Phase 3 (45-75 min): Core Components & Services
└─ Phase 4 (75-90 min): Integration & Demo Prep
```

---

## PHASE 1: Spec Alignment & Architecture (0-15 minutes)

**Goal:** Align on approach, assign roles, understand dependencies

### Tasks

**Team Lead (Product Manager)** — 5 minutes
- [ ] Review project specs with team
- [ ] Clarify "overnight" definition for user's timezone
- [ ] Confirm priority ranking algorithm

**Enterprise Architect** — 5 minutes
- [ ] Review data model (DATA_MODEL.md)
- [ ] Confirm database schema (PostgreSQL approach)
- [ ] Identify critical path dependencies

**Full Stack Engineer** — 5 minutes
- [ ] Review API contract (API.md)
- [ ] Confirm tech stack decisions
- [ ] Map out service layer architecture

**UX Architect** — 5 minutes
- [ ] Review component specs (UI_SPECS.md)
- [ ] Confirm color palette & spacing scale
- [ ] Assign component build order

### Deliverables
- [ ] All team members understand spec
- [ ] Tech stack confirmed (React + Node.js + PostgreSQL)
- [ ] Dependencies identified (Jira API, Outlook API)
- [ ] Code style guidelines reviewed (CLAUDE.md)

### Blockers to Resolve
- [ ] Do we have Jira API credentials?
- [ ] Do we have Outlook API credentials?
- [ ] Is database already set up?

---

## PHASE 2: Data Model & API Contracts (15-45 minutes)

**Goal:** Solid foundation for implementation

### Part A: Database & Types (15-25 min)

**Enterprise Architect** — Lead
- [ ] Create PostgreSQL schema (users, integration_tokens, overnight_summaries)
- [ ] Write TypeScript interfaces (src/types/*.ts)
  - [ ] src/types/jira.ts
  - [ ] src/types/outlook.ts
  - [ ] src/types/calendar.ts
  - [ ] src/types/dashboard.ts
- [ ] Create database migration file

**Time estimate:** 10 minutes

**Full Stack Engineer** — Support
- [ ] Review types for API usability
- [ ] Suggest type refinements

### Part B: API Routes & Services (25-35 min)

**Full Stack Engineer** — Lead
- [ ] Create API endpoints stub (routes/overnight-summary.ts, routes/dashboard.ts)
- [ ] Create service layer structure (services/aggregation-service.ts)
- [ ] Define error handling patterns

**Time estimate:** 10 minutes

**UX Architect** — Support
- [ ] Review API contract matches UI needs
- [ ] Confirm response shapes for components

### Part C: Data Flow Diagram (35-45 min)

**Product Manager** — Lead
- [ ] Document user journey (FigJam or diagram)
- [ ] Map data flow (Jira → Backend → Frontend)

**Time estimate:** 5 minutes

### Deliverables
- [ ] PostgreSQL schema designed
- [ ] TypeScript interfaces defined (strict, no `any`)
- [ ] API route stubs created
- [ ] Service interfaces sketched
- [ ] Data flow documented

---

## PHASE 3: Core Components & Services (45-75 minutes)

**Goal:** Functional prototype with working components

### Part A: Backend Services (45-60 min)

**Full Stack Engineer** — Lead
- [ ] Implement Jira service (getIssuesForUser)
  - [ ] OAuth setup
  - [ ] Query builder (JQL)
  - [ ] Item mapping
  - [ ] Caching (5-min TTL)
- [ ] Implement Outlook service (getEmails, getCalendarEvents)
  - [ ] OAuth setup
  - [ ] Message/Event query
  - [ ] Item mapping
  - [ ] Caching

**Time estimate:** 10-12 minutes

**Enterprise Architect** — Support
- [ ] Verify data transformations
- [ ] Review caching strategy

**Deliverables:**
- [ ] `src/services/jira-service.ts` — functional
- [ ] `src/services/outlook-service.ts` — functional
- [ ] Token storage & refresh working
- [ ] Basic error handling

### Part B: Frontend Components (60-75 min)

**UX Architect** — Lead
- [ ] Create component structure (src/components/)
- [ ] Build OvernightSummaryCard
  - [ ] Loading state (skeleton)
  - [ ] Loaded state
  - [ ] Error state
- [ ] Build KPICard component
- [ ] Build KPIGrid (responsive)
- [ ] Wire theme system (light/dark)

**Time estimate:** 10-12 minutes

**Full Stack Engineer** — Support
- [ ] Create custom hooks (useOvernightSummary, useDashboard)
- [ ] Connect components to API
- [ ] Implement data fetching & caching

**Deliverables:**
- [ ] OvernightSummaryCard renders
- [ ] KPI cards render with data
- [ ] Theme toggle working
- [ ] Components accept props per spec
- [ ] Dark mode functional

---

## PHASE 4: Integration & Demo Prep (75-90 minutes)

**Goal:** Working prototype, ready to demo

### Part A: Integration Glue (75-83 min)

**Full Stack Engineer** — Lead
- [ ] Wire frontend → API → backend services
  - [ ] GET /api/overnight-summary endpoint
  - [ ] GET /api/executive-dashboard endpoint
- [ ] Implement aggregation logic
  - [ ] Count metrics
  - [ ] Calculate attention score
  - [ ] Generate recommended actions
- [ ] Error handling & fallbacks

**Time estimate:** 5-7 minutes

**Product Manager** — Support
- [ ] Verify algorithm produces sensible output
- [ ] Check metrics accuracy

**Deliverables:**
- [ ] API endpoints return real data
- [ ] Frontend displays data correctly
- [ ] Error states handled gracefully

### Part B: Polish & Demo (83-90 min)

**UX Architect** — Lead
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Check accessibility (WCAG 2.1 AA spot-checks)
- [ ] Test dark mode on all screens
- [ ] Create demo flow (happy path)

**Time estimate:** 5 minutes

**All** — Final checks
- [ ] [ ] No console errors
- [ ] [ ] No type errors (strict mode)
- [ ] [ ] Fonts/colors match spec
- [ ] [ ] Component interactions smooth
- [ ] [ ] Demo script ready

**Deliverables:**
- [ ] Working prototype
- [ ] Demo video or live walkthrough script
- [ ] Known issues documented
- [ ] Architecture diagram updated

---

## Task Assignment Matrix

| Task | Owner | Support | Time |
|------|-------|---------|------|
| Spec review & alignment | Product Manager | Team | 5 min |
| Database schema design | Enterprise Architect | FSE | 5 min |
| TypeScript interfaces | Enterprise Architect | UX | 5 min |
| Jira service implementation | Full Stack Engineer | EA | 7 min |
| Outlook service implementation | Full Stack Engineer | EA | 7 min |
| Component build (OvernightSummary, KPI) | UX Architect | FSE | 10 min |
| Custom hooks & data fetching | Full Stack Engineer | UX | 5 min |
| API endpoint integration | Full Stack Engineer | PM | 5 min |
| Aggregation algorithm | Product Manager | EA | 5 min |
| Responsive design & accessibility | UX Architect | All | 5 min |
| Testing & demo prep | All | N/A | 5 min |
| **TOTAL** | | | **90 min** |

---

## Success Criteria

### MVP (Must Have)
- [ ] OvernightSummary card displays real data from Jira + Outlook
- [ ] Executive Dashboard shows 4+ KPI cards with live data
- [ ] Light mode + dark mode both working
- [ ] Mobile responsive (works on iPad minimum)
- [ ] No console errors or TypeScript errors
- [ ] Team understands full data flow

### Nice to Have (if time permits)
- [ ] All 8 KPI cards implemented
- [ ] Jira items grouped by type
- [ ] Email items displayed with styling
- [ ] Calendar conflicts shown
- [ ] Accessibility audit (axe) passes

### Stretch Goals (post-sprint)
- [ ] WebSocket updates for real-time data
- [ ] Email action buttons (Reply, Forward)
- [ ] Calendar conflict resolution UI
- [ ] Analytics tracking
- [ ] Notification system

---

## Dependency Checklist

Before sprint starts, verify:

### For 90-Minute Sprint (Mock Data)
- [ ] **Database**
  - [ ] PostgreSQL running locally
  - [ ] Database created (`morning_command_center_dev`)
  - [ ] Connection string in `.env.local`
  
- [ ] **Development Environment**
  - [ ] Node.js 18+ installed
  - [ ] npm/yarn available
  - [ ] Git repo cloned
  - [ ] `.env.local` created (no real API credentials needed)
  
- [ ] **Code Setup**
  - [ ] Tailwind CSS configured
  - [ ] TypeScript strict mode enabled
  - [ ] ESLint rules in place
  - [ ] `.gitignore` updated

### Post-Sprint (Real API Integration)
- [ ] **Jira API Access**
  - [ ] API token or OAuth client created
  - [ ] Credentials in `.env.local`
  - [ ] Instance URL confirmed
  
- [ ] **Outlook / MS 365 API Access**
  - [ ] App registered in Azure AD
  - [ ] Client ID & secret obtained
  - [ ] Delegated permissions set (Mail.Read, Calendars.Read)

**Note:** Real API integration is deferred. Use mock data for sprint.

---

## Comm & Escalation

### Blockers Resolution

If blocked on:
- **API credentials:** Assign to 1 person to unblock team (5 min max)
- **Database issue:** Revert to in-memory cache, fix async (no time lost)
- **API response time:** Use mock data, swap real API after sprint
- **Design decision:** Product Manager breaks tie immediately (no debate)

### Status Check Points

| Time | Check | Owner |
|------|-------|-------|
| **15 min** | Specs aligned, roles clear | Product Manager |
| **45 min** | Data model + API stubs done | Enterprise Architect |
| **75 min** | Components render, services callable | Full Stack Engineer |
| **90 min** | Demo ready, no blockers | All |

### Daily Standup (Async, 2 minutes)

```
- What shipped? (1 task completed)
- What's next? (1 task in progress)
- Any blockers? (1 item, if any)
```

---

## Post-Sprint Checklist

- [ ] All code committed & pushed to main
- [ ] PR description documents decisions
- [ ] Specs updated with implementation discoveries
- [ ] README updated with setup instructions
- [ ] Demo video or walkthrough recorded
- [ ] Known issues / tech debt documented
- [ ] Next sprint priorities identified
