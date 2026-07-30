# Setup Guide for Morning Command Center

## Quick Start (5 minutes)

```bash
# Clone repo
git clone <repo-url>
cd morning-command-center

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start dev server
npm run dev

# Open http://localhost:3000
```

---

## Prerequisite Setup

### 1. Environment Variables

Create `.env.local` in project root:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/morning_command_center_dev

# Jira
JIRA_CLIENT_ID=your-client-id-here
JIRA_CLIENT_SECRET=your-client-secret-here
JIRA_INSTANCE_URL=https://company.atlassian.net

# Outlook / Microsoft 365
OUTLOOK_CLIENT_ID=your-client-id-here
OUTLOOK_CLIENT_SECRET=your-client-secret-here
OUTLOOK_TENANT_ID=your-tenant-id-here
OUTLOOK_REDIRECT_URI=http://localhost:3000/api/auth/callback/outlook

# Session
SESSION_SECRET=random-string-at-least-32-chars

# Environment
NODE_ENV=development
LOG_LEVEL=debug
```

**Where to get credentials:**

- **Jira:** 
  1. Go to https://dev.atlassian.com/
  2. Create OAuth app → save Client ID & Secret
  
- **Outlook:**
  1. Go to https://portal.azure.com/
  2. Azure AD → App registrations → New → save credentials

---

### 2. PostgreSQL Database

**macOS/Linux:**
```bash
# Install PostgreSQL (if not already installed)
brew install postgresql@15

# Start service
brew services start postgresql@15

# Create database
createdb morning_command_center_dev

# Verify connection
psql morning_command_center_dev
\q  # exit
```

**Windows:**
```bash
# Install PostgreSQL from https://www.postgresql.org/download/windows/
# Then open PostgreSQL prompt:

psql -U postgres
CREATE DATABASE morning_command_center_dev;
\q
```

---

### 3. Node.js & Dependencies

```bash
# Check Node.js version (need 18+)
node --version

# Install npm dependencies
npm install

# Install dev dependencies
npm install --save-dev @types/node typescript
```

---

### 4. Database Migrations

```bash
# Run migrations
npm run db:migrate

# Verify tables created
npm run db:status
```

---

## Project Structure

```
morning-command-center/
├── src/
│   ├── pages/                  # Next.js pages or React routes
│   │   ├── index.tsx           # Dashboard home
│   │   ├── overnight-summary.tsx
│   │   └── settings.tsx
│   ├── components/             # React components
│   │   ├── OvernightSummaryCard.tsx
│   │   ├── KPICard.tsx
│   │   ├── KPIGrid.tsx
│   │   └── ...
│   ├── api/                    # Backend routes (Next.js) or Express routes
│   │   ├── overnight-summary.ts
│   │   ├── dashboard.ts
│   │   └── ...
│   ├── services/               # Business logic
│   │   ├── jira-service.ts
│   │   ├── outlook-service.ts
│   │   ├── aggregation-service.ts
│   │   └── ...
│   ├── types/                  # TypeScript interfaces
│   │   ├── jira.ts
│   │   ├── outlook.ts
│   │   ├── dashboard.ts
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── useOvernightSummary.ts
│   │   ├── useDashboard.ts
│   │   └── ...
│   ├── styles/                 # CSS/Tailwind
│   │   ├── globals.css
│   │   └── theme.css
│   └── utils/                  # Helper functions
│       ├── timezone.ts
│       ├── attention-score.ts
│       └── ...
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md
│   ├── INTEGRATIONS.md
│   └── ...
├── specs/                      # Specifications
│   ├── FEATURES.md
│   ├── API.md
│   ├── DATA_MODEL.md
│   ├── UI_SPECS.md
│   └── ...
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── ...
├── .env.local                  # Environment variables (not in git)
├── .env.example                # Template for .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
├── CLAUDE.md
├── PROJECT_PLAN.md
└── SETUP.md
```

---

## Running the Application

### Development Mode

```bash
# Start dev server (with hot reload)
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- src/services/jira-service.test.ts

# Check test coverage
npm test -- --coverage
```

### Linting & Type Check

```bash
# Run TypeScript type check
npm run type-check

# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## Database Operations

### View Database

```bash
# Connect to database
psql morning_command_center_dev

# List tables
\dt

# View users table
SELECT * FROM users;

# View overnight summaries
SELECT id, user_id, generated_at FROM overnight_summaries;

# Exit
\q
```

### Reset Database (Development Only)

```bash
# Drop all tables
npm run db:reset

# Re-run migrations
npm run db:migrate
```

---

## Testing the API

### Using cURL

```bash
# Get overnight summary
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/overnight-summary

# Get dashboard
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/executive-dashboard
```

### Using REST Client Extension (VS Code)

Create `requests.http`:

```
@host = http://localhost:3000
@token = your-jwt-token-here

### Get Overnight Summary
GET {{host}}/api/overnight-summary
Authorization: Bearer {{token}}

### Get Dashboard
GET {{host}}/api/executive-dashboard
Authorization: Bearer {{token}}

### Get Jira Items
GET {{host}}/api/jira-items?days=1
Authorization: Bearer {{token}}
```

---

## Debugging

### Chrome DevTools

```bash
# Frontend debugging
# Press F12 in Chrome → go to Network/Console/Sources tabs
```

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "program": "${workspaceFolder}/src/server.ts",
      "restart": true,
      "runtimeArgs": ["--loader", "ts-node/esm"]
    }
  ]
}
```

### Enable Debug Logs

```bash
# Set debug level
DEBUG=app:* npm run dev

# View logs
tail -f logs/app.log
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED` when connecting to DB | Verify PostgreSQL is running: `psql -U postgres` |
| `ENOENT .env.local` | Create `.env.local` with required variables |
| Port 3000 already in use | Kill process: `lsof -ti :3000 \| xargs kill -9` |
| Jira API 401 Unauthorized | Check token expiration, refresh in integration_tokens table |
| Slow API response (>5s) | Check external API response times (Jira/Outlook) |
| TypeScript errors | Run `npm run type-check` to see all errors |
| Tests failing | Clear test cache: `npm test -- --clearCache` |

---

## Code Style & Conventions

### TypeScript

```typescript
// ✅ Good
interface OvernightSummary {
  id: string;
  userId: string;
  metrics: SummaryMetrics;
}

function calculateAttentionScore(summary: OvernightSummary): number {
  // Implementation
}

// ❌ Avoid
const summary: any = {...};  // Don't use 'any'
const AttentionScore = (s) => {...};  // Function names in camelCase
```

### React Components

```typescript
// ✅ Good
interface OvernightSummaryCardProps {
  summary: OvernightSummary;
  onRefresh: () => void;
}

export const OvernightSummaryCard: React.FC<OvernightSummaryCardProps> = ({
  summary,
  onRefresh
}) => {
  return <div>...</div>;
};

// ❌ Avoid
export default function OvernightSummaryCard(props) {...}  // Use named exports
```

### CSS/Tailwind

```css
/* ✅ Use Tailwind classes */
<div className="flex items-center justify-between bg-white dark:bg-neutral-900 rounded-lg shadow">

/* ❌ Avoid raw CSS when Tailwind provides utility */
<div style={{display: 'flex', backgroundColor: '#ffffff'}}>
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feat/overnight-summary

# Make changes, test locally
# Commit with meaningful message
git commit -m "feat(overnight-summary): Calculate attention score"

# Push to remote
git push origin feat/overnight-summary

# Create PR on GitHub
# Get review, merge when approved
git checkout main
git pull origin main
```

---

## Deployment

### Staging

```bash
# Deploy to staging environment
npm run deploy:staging

# View logs
npm run logs:staging
```

### Production

```bash
# Build & deploy to production
npm run deploy:production

# Monitor health
npm run monitor:production
```

---

## Performance Tips

1. **Enable Caching**
   ```typescript
   // Cache API responses for 5 minutes
   const cache = new Map();
   ```

2. **Code Splitting**
   ```typescript
   // Lazy load non-critical components
   const OvernightSummary = lazy(() => import('./OvernightSummary'));
   ```

3. **Database Indexing**
   ```sql
   CREATE INDEX idx_overnight_summaries_user_date 
     ON overnight_summaries(user_id, generated_from_date DESC);
   ```

4. **API Optimization**
   - Use pagination for large datasets
   - Filter server-side, not client-side
   - Batch requests when possible

---

## Resources

- **TypeScript:** https://www.typescriptlang.org/docs/
- **React:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Next.js:** https://nextjs.org/docs (if using Next.js)
- **PostgreSQL:** https://www.postgresql.org/docs/
- **Jira API:** https://developer.atlassian.com/cloud/jira/
- **Microsoft Graph:** https://learn.microsoft.com/en-us/graph/

---

## Getting Help

1. Check documentation in `/docs` folder
2. Review specs in `/specs` folder
3. Look at examples in existing components
4. Ask team in Slack/Discord
5. Check GitHub Issues for known problems
