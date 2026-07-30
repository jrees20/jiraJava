# Getting Started — Morning Command Center

**Welcome to the 90-minute sprint!** This document tells you exactly what's been set up and where to start.

---

## 📋 What You Have

Your team has a **complete specification package** for the Morning Command Center prototype. No ambiguity. No extra meetings. Just spec and build.

### Documentation (Read in this order)

1. **[README.md](./README.md)** — Project overview (1 min)
2. **[QUICK_REF.md](./QUICK_REF.md)** — One-page sprint guide (2 min)
3. **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** — 90-minute timeline & task breakdown (3 min)
4. **[SETUP.md](./SETUP.md)** — Environment setup & dev guide (10 min)
5. **[CLAUDE.md](./CLAUDE.md)** — Code standards & team collaboration rules (3 min)

**Total reading time: ~20 minutes. Then you code.**

### Specification Documents

These define **what to build**. Keep these open while coding.

- **[specs/FEATURES.md](./specs/FEATURES.md)** — Feature specs, acceptance criteria, time estimates
- **[specs/DATA_MODEL.md](./specs/DATA_MODEL.md)** — TypeScript interfaces, database schema, enums
- **[specs/API.md](./specs/API.md)** — REST API contracts with example responses
- **[specs/UI_SPECS.md](./specs/UI_SPECS.md)** — Component specs, color palette, responsive layout

### Architecture & Implementation Guides

These help you **build it right**.

- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — System design, data flow, caching strategy
- **[docs/INTEGRATIONS.md](./docs/INTEGRATIONS.md)** — Code samples for Jira, Outlook, auth

---

## 🚀 Start Here (Pick Your Role)

### Product Manager

**Read first (5 min):**
- [QUICK_REF.md](./QUICK_REF.md) — Overview
- [PROJECT_PLAN.md](./PROJECT_PLAN.md#phase-1-spec-alignment--architecture-0-15-minutes) — Your phase 1 tasks

**Then do:**
1. Review [specs/FEATURES.md](./specs/FEATURES.md) with team
2. Clarify "overnight" algorithm and priority ranking
3. Define the 5 recommended actions (see [docs/INTEGRATIONS.md — Aggregation Service](./docs/INTEGRATIONS.md#4-aggregation-service-core-logic))
4. Throughout sprint: Validate metrics accuracy

**Key files to keep open:**
- specs/FEATURES.md
- docs/INTEGRATIONS.md (Aggregation Service section)

---

### Enterprise Architect

**Read first (10 min):**
- [QUICK_REF.md](./QUICK_REF.md)
- [specs/DATA_MODEL.md](./specs/DATA_MODEL.md) — Database schema & interfaces
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — System design

**Then do:**
1. Review database schema with Full Stack Engineer
2. Create PostgreSQL schema (users, integration_tokens, overnight_summaries)
3. Write TypeScript interfaces (src/types/*.ts) — no `any` types
4. Create database migration file
5. Throughout sprint: Review service implementations for data consistency

**Key files to keep open:**
- specs/DATA_MODEL.md
- docs/ARCHITECTURE.md
- [SETUP.md — Database Operations](./SETUP.md#database-operations)

---

### Full Stack Engineer

**Read first (15 min):**
- [QUICK_REF.md](./QUICK_REF.md)
- [SETUP.md](./SETUP.md) — Environment setup
- [specs/API.md](./specs/API.md) — API contracts
- [docs/INTEGRATIONS.md](./docs/INTEGRATIONS.md) — Implementation guide

**Then do:**
1. Set up environment ([SETUP.md](./SETUP.md))
2. Create mock Jira service (see [docs/INTEGRATIONS.md#mock-data-strategy](./docs/INTEGRATIONS.md#mock-data-strategy))
3. Create mock Outlook service (see [docs/INTEGRATIONS.md#mock-data-strategy](./docs/INTEGRATIONS.md#mock-data-strategy))
4. Create API routes that use mock services
5. Implement aggregation logic (with Product Manager's input)
6. Throughout sprint: Wire frontend → backend via mock APIs

**Note:** Real API integration is post-sprint work. Use mock data to move fast.

**Key files to keep open:**
- specs/API.md
- specs/DATA_MODEL.md
- docs/INTEGRATIONS.md

---

### UX Architect

**Read first (10 min):**
- [QUICK_REF.md](./QUICK_REF.md)
- [specs/UI_SPECS.md](./specs/UI_SPECS.md) — Component specs & design system

**Then do:**
1. Set up Tailwind CSS + theme system
2. Create component structure (src/components/)
3. Build OvernightSummaryCard (loading, loaded, error states)
4. Build KPICard component (all status variants)
5. Build KPIGrid (responsive: 1 col mobile → 4 col desktop)
6. Implement theme toggle (light/dark)
7. Throughout sprint: Ensure responsive design, accessibility

**Key files to keep open:**
- specs/UI_SPECS.md
- [SETUP.md — Project Structure](./SETUP.md#project-structure)

---

## ⏰ 90-Minute Timeline

```
0:00-0:15   Spec Review & Architecture Alignment
0:15-0:45   Data Model & API Contracts
0:45-1:15   Core Components & Services
1:15-1:30   Integration & Demo Prep
```

**See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed breakdown.**

---

## ✅ Checklist Before Starting

### Technology & Access
- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL running locally (`psql -U postgres`)
- [ ] **NO real API credentials needed** (using mock data)

### Repository Setup
- [ ] Git repo cloned
- [ ] `.env.local` created from `.env.example` (see [SETUP.md](./SETUP.md#1-environment-variables))
- [ ] `npm install` completed
- [ ] Database created (`createdb morning_command_center_dev`)
- [ ] No TypeScript errors (`npm run type-check`)

### Team Alignment
- [ ] Everyone read [QUICK_REF.md](./QUICK_REF.md)
- [ ] Roles assigned (PM, EA, FSE, UX)
- [ ] [PROJECT_PLAN.md](./PROJECT_PLAN.md) reviewed
- [ ] [CLAUDE.md](./CLAUDE.md) (code standards) acknowledged

---

## 📁 File Map (What Goes Where)

As you build, follow this structure (defined in [SETUP.md](./SETUP.md#project-structure)):

```
src/
├── pages/              # Page components (index.tsx, overnight-summary.tsx)
├── components/         # React components (OvernightSummaryCard, KPICard, etc.)
├── api/               # Backend routes (/api/overnight-summary, etc.)
├── services/          # Business logic (jira-service.ts, outlook-service.ts, aggregation-service.ts)
├── hooks/             # Custom hooks (useOvernightSummary, useDashboard)
├── types/             # TypeScript interfaces (jira.ts, outlook.ts, dashboard.ts)
├── styles/            # CSS + Tailwind theme
└── utils/             # Helpers (timezone.ts, attention-score.ts)
```

---

## 🎯 Definition of Done (MVP)

By the end of 90 minutes, you should have:

- [ ] **OvernightSummaryCard** displays real data from Jira + Outlook
- [ ] **Executive Dashboard** shows 4+ KPI cards with live metrics
- [ ] **Light mode + Dark mode** both working
- [ ] **Responsive design** tested on mobile, tablet, desktop
- [ ] **No TypeScript errors** (strict mode)
- [ ] **No console errors**
- [ ] **Team understands** full data flow (Jira → API → Frontend)

**See [PROJECT_PLAN.md#success-criteria](./PROJECT_PLAN.md#success-criteria) for full list.**

---

## 🔗 Key Decisions Already Made

You don't need to debate these:

| Decision | Rationale |
|----------|-----------|
| Frontend: React + TypeScript | Type safety, component reusability |
| Styling: Tailwind CSS | Enterprise look, consistent theme system |
| Backend: Node.js + Express (or Next.js) | Fast to implement, integrates well with React |
| Database: PostgreSQL | Reliable, JSONB support for extensibility |
| Auth: OAuth 2.0 | Industry standard for Jira + Outlook |
| Caching: Redis (backend) + localStorage (frontend) | Prevents API rate limiting |

---

## ❓ Frequently Asked Questions

**Q: Should we build everything or just MVP?**  
A: Build MVP in 90 minutes. Use [QUICK_REF.md#definition-of-done](./QUICK_REF.md) as your checklist.

**Q: What if we get stuck on Jira/Outlook API?**  
A: Use mock data. Swap real API after sprint. See [docs/INTEGRATIONS.md — Testing](./docs/INTEGRATIONS.md#7-testing-integration).

**Q: Do we need 100% test coverage?**  
A: No. Focus on critical paths (aggregation logic, API endpoints). See [CLAUDE.md](./CLAUDE.md).

**Q: How do we handle design decisions?**  
A: Product Manager or UX Architect decides immediately (< 2 min). No debate. See [PROJECT_PLAN.md — Comm & Escalation](./PROJECT_PLAN.md#comm--escalation).

**Q: What if we finish early?**  
A: Stretch goals: [PROJECT_PLAN.md#stretch-goals](./PROJECT_PLAN.md#stretch-goals).

---

## 🚨 Common Blockers & Solutions

| Blocker | Solution |
|---------|----------|
| Jira API credentials missing | Take 5 min to get them (1 person only) |
| DB connection failing | Verify PostgreSQL running, reset connection |
| Node modules not installing | Try `npm ci`, then `npm install` |
| Port 3000 in use | Kill process: `lsof -ti :3000 \| xargs kill -9` |
| TypeScript compilation errors | Run `npm run type-check` to see all at once |

**See [SETUP.md — Troubleshooting](./SETUP.md#common-issues--solutions) for full list.**

---

## 📞 How to Unblock Quickly

1. **Check the spec** — Most questions answered in specs/ or docs/
2. **Ask the team** — Use a dedicated Slack/Discord channel
3. **Escalate to role owner** — PM/EA/FSE/UX make decisions fast

**No async discussions. Decisions must happen in < 2 minutes.**

---

## 🎬 Ready to Start?

1. ✅ Everyone has access to this repo
2. ✅ Everyone read [QUICK_REF.md](./QUICK_REF.md) (2 min)
3. ✅ Everyone checked [Prerequisites](./GETTING_STARTED.md#-checklist-before-starting)
4. ✅ Roles assigned (PM, EA, FSE, UX)
5. ✅ Timer started (90 min from now)

---

## 📚 Documentation Index

### Quick Reference
- [QUICK_REF.md](./QUICK_REF.md) — One-page sprint guide
- [GETTING_STARTED.md](./GETTING_STARTED.md) — This file

### Planning & Process
- [PROJECT_PLAN.md](./PROJECT_PLAN.md) — 90-minute timeline
- [CLAUDE.md](./CLAUDE.md) — Code standards & team rules
- [SETUP.md](./SETUP.md) — Dev environment setup

### Specifications (The Source of Truth)
- [specs/FEATURES.md](./specs/FEATURES.md) — What to build
- [specs/DATA_MODEL.md](./specs/DATA_MODEL.md) — Database & types
- [specs/API.md](./specs/API.md) — REST endpoints & contracts
- [specs/UI_SPECS.md](./specs/UI_SPECS.md) — Component design

### Implementation Guides
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — System design
- [docs/INTEGRATIONS.md](./docs/INTEGRATIONS.md) — Code samples
- [README.md](./README.md) — Project overview

---

**Last Updated:** July 30, 2025  
**Status:** Ready to sprint  
**Duration:** 90 minutes  

Let's build something great! 🚀
