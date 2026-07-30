# Claude Code Collaboration Guide

## Project: Morning Command Center

Team: 4-person prototype team (90-minute sprint)

## Code Standards

### Language & Framework
- **Frontend:** TypeScript + React 18+
- **Backend:** TypeScript + Node.js (or preferred runtime)
- **Styling:** Tailwind CSS + custom theme system
- **Database:** PostgreSQL (schema-first approach)
- **Type Safety:** Strict TypeScript, no `any` types

### Code Quality
- **Components:** Functional components with hooks only
- **Testing:** Unit tests for utilities, integration tests for features
- **Naming:** Clear, domain-specific names (no abbreviations except well-known ones)
- **Comments:** Only for *why*, not *what*. Assume readable code.
- **Imports:** Absolute paths from `@/` namespace
- **Files:** One primary export per file

### Git Workflow

```
main → feature branch → PR → review → merge
```

**Commit messages:** Use imperative mood, reference specs
```
feat(overnight-summary): Calculate attention score from Jira activity
fix(calendar): Handle timezone offset in meeting conflicts
refactor(connectors): Extract common auth pattern
```

## Team Collaboration Rules

1. **Spec-First:** Every feature has a spec in `/specs` before coding
2. **Parallel Work:** Use feature branches to avoid conflicts
3. **Code Review:** All PRs reviewed before merge (1 approval minimum)
4. **Documentation:** Update specs when implementation discovers edge cases
5. **Accessibility:** WCAG 2.1 AA for all user-facing features

## Daily Standup Topics

- [ ] What spec am I implementing?
- [ ] Any blockers on data sources (Jira API, Outlook API)?
- [ ] Do I have the latest types/interfaces?
- [ ] Do my changes affect other team members?

## Spec Document Structure

Each feature spec in `/specs` must have:

```markdown
# Feature Name

## Overview
- User story / use case
- Acceptance criteria
- Time estimate

## Data Requirements
- Input sources
- Output shape
- Transformations needed

## UI/UX Requirements
- Wireframe reference
- States (loading, empty, error, success)
- Responsive breakpoints

## API Contract
- Endpoint or integration point
- Request/response shape
- Error handling

## Testing Strategy
- Unit test coverage
- Integration test approach
- Edge cases
```

## Key Integrations

### Jira Integration
- Files: `src/api/jira/` 
- Spec: `specs/JIRA_INTEGRATION.md`
- Types: `src/types/jira.ts`

### Outlook Integration
- Files: `src/api/outlook/`
- Spec: `specs/OUTLOOK_INTEGRATION.md`
- Types: `src/types/outlook.ts`

### Calendar Processing
- Files: `src/api/calendar/`
- Spec: `specs/CALENDAR_PROCESSING.md`
- Types: `src/types/calendar.ts`

## Quick Reference

| Task | Owner | Status |
|------|-------|--------|
| Data model design | Enterprise Architect | [ ] |
| API integration specs | Full Stack Engineer | [ ] |
| Component design system | UX Architect | [ ] |
| Overnight summary algorithm | Product Manager | [ ] |

## Questions?

Ask in the team channel. Document the answer in the spec.
