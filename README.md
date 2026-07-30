# Morning Command Center

A production-quality web application that tells Scrum Team members exactly what they need to focus on when they start their day.

## Project Overview

**Purpose:** Answer one question: *"What changed overnight that requires my attention today?"*

**Target Users:** Product Managers, Product Owners, Solution Architects, Scrum Masters, Development Leads, Engineering Managers

**Time to Insight:** <30 seconds

## Quick Start

```bash
# Setup
npm install
npm run dev

# View application
# Open http://localhost:3000
```

## Key Features

1. **What Changed Overnight** — AI-generated summary of overnight activity
2. **Executive Dashboard** — KPI cards with attention metrics
3. **Jira Activity** — Issues changed outside business hours
4. **Email Intelligence** — Critical and aging emails
5. **Calendar Conflicts** — Meeting conflicts and unaccepted invites
6. **Connectors** — Jira Cloud, Jira Data Center, Outlook, Microsoft 365, Teams

## Design Requirements

- Modern SaaS styling (Atlassian/Microsoft/Linear aesthetic)
- Light Mode + Dark Mode
- Responsive Layout (Desktop First)
- WCAG 2.1 AA Accessibility
- Enterprise-grade UX

## Repository Structure

```
/specs              # Specification documents
/src
  /api             # Backend services and integrations
  /components      # React components
  /pages           # Page-level components
  /hooks           # Custom React hooks
  /styles          # Global styles and theme
  /types           # TypeScript type definitions
  /utils           # Utility functions
/tests             # Test suites
/docs              # Architecture and design documentation
```

## Documentation

- **[SPECS.md](./docs/SPECS.md)** — Feature specifications and requirements
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — System design and data flow
- **[API.md](./specs/API.md)** — REST API specifications
- **[DATA_MODEL.md](./specs/DATA_MODEL.md)** — Data structures and schemas
- **[UI_SPECS.md](./specs/UI_SPECS.md)** — Component specifications and design system

## Team Roles

| Role | Responsibility |
|------|-----------------|
| Principal Product Manager | Vision, requirements, user priorities |
| UX Architect | Component design, interaction patterns |
| Enterprise Architect | System design, integrations, scalability |
| Full Stack Engineer | Implementation, code quality, testing |

## Development Workflow

1. **Spec Phase** — Define requirements in `/specs` documents
2. **Design Phase** — Create component specs and wireframes
3. **Implementation Phase** — Build features with TDD approach
4. **Integration Phase** — Connect data sources and APIs
5. **Testing Phase** — Comprehensive testing and accessibility checks

## Next Steps

See [CLAUDE.md](./CLAUDE.md) for coding conventions and team collaboration guidelines.
