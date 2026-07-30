# Quick Start: Email & Jira Linking Features

**Your dashboard is now interactive!** Click on emails and Jira issues to view full details.

---

## 🚀 How to Use

### Launch the Dashboard

```bash
npm run dev
```

Then open: **http://localhost:3000**

---

## 📧 Email Linking

### Feature: Click Email → View Full Content

**Where to find it:**
- Scroll down to **"Critical Emails"** section
- See 3 sample emails from different senders

**How to use:**
1. **Click any email card** → Detail modal opens
2. **View full email content:**
   - Sender info (name + email)
   - Full subject line
   - Complete message body
   - Attachments indicator
   - Timestamp & status
3. **[Open in Outlook →]** button:
   - Clicks open the email in your Outlook (new tab)
   - Only works if you're signed into Outlook
4. **Close the modal:**
   - Click the **✕** button (top-right)
   - Click the dark **backdrop** outside the modal
   - Press **Escape** key on keyboard

---

## 🔗 Jira Linking

### Feature: Click Jira Issue → View Full Details

**Where to find it:**
- Scroll down to **"Overnight Jira Activity"** section
- See issues grouped by type:
  - 🚫 **Blockers** (top priority)
  - ✨ **New Issues** (recently created)
  - ↔️ **Status Changes** (recently moved)
  - ✅ **Closed** (resolved items)

**How to use:**
1. **Click any Jira card** → Detail modal opens
2. **View full issue details:**
   - Issue key (e.g., DAIS-123)
   - Priority badge (red/orange/yellow/green)
   - Summary (issue title)
   - Change info (what changed, who changed it, when)
   - Status transition (if status changed)
   - Blocker warning (if critical)
3. **[Open in Jira →]** button:
   - Clicks open the issue in Jira (new tab)
   - Only works if you have access to Jira
4. **Close the modal:**
   - Click the **✕** button (top-right)
   - Click the dark **backdrop** outside the modal
   - Press **Escape** key on keyboard

---

## 🌙 Dark Mode

### Feature: Switch Between Light & Dark Themes

**How to use:**
1. Look for the **🌙** icon in the top-right corner (header)
2. Click it to toggle themes:
   - 🌙 (moon) = currently in light mode → switch to dark
   - ☀️ (sun) = currently in dark mode → switch to light
3. Your preference is saved locally:
   - Reload the page → theme stays the same
   - Clear localStorage → reverts to system preference

---

## 🎨 Visual Indicators

### Email Severity Levels

| Color | Meaning | Example |
|-------|---------|---------|
| 🔴 Red | Critical | Q3 Roadmap Approval (flagged) |
| 🟡 Orange | Warning | Design Review (awaiting response) |
| 🟡 Yellow | Action Required | Budget Approval (48+ hours old) |

### Jira Priority Levels

| Color | Meaning | Badge |
|-------|---------|-------|
| 🔴 Red | Blocker/Critical | Highest priority |
| 🟠 Orange | High | Important |
| 🟡 Yellow | Medium | Normal priority |
| 🟢 Green | Low | Nice to have |

### Jira Change Types

| Icon | Type | Meaning |
|------|------|---------|
| ✨ | New | New issue created |
| ↔️ | Status Change | Issue status updated |
| 🚫 | Blocker | Issue is blocking progress |
| ✅ | Closed | Issue resolved/closed |

---

## 💡 Tips & Tricks

### Navigation
- **Tab key** → Move between cards
- **Enter key** → Open card (on focused card)
- **Escape key** → Close any open modal

### Keyboard Shortcuts (Future)
- Coming soon: Keyboard navigation for power users

### Performance
- **Zero loading time** → Using mock data (fast!)
- **Smooth animations** → 200ms transitions
- **Responsive design** → Works on desktop, tablet, mobile

---

## ❓ Common Questions

**Q: Can I reply to emails from the dashboard?**  
A: Not yet. Click [Open in Outlook] to reply. This feature is planned for next sprint.

**Q: Can I change Jira issues from here?**  
A: Not yet. Click [Open in Jira] to make changes. This feature is planned for next sprint.

**Q: Why are the emails/issues not real?**  
A: We're using **mock data** for the sprint. Real API integration happens after the prototype is complete.

**Q: Can I search or filter emails?**  
A: Coming soon! Advanced filtering is a post-sprint feature.

**Q: What if I find a bug?**  
A: Report it to the team! This is a prototype, so feedback is super valuable.

---

## 🔧 Developer Notes

### Component Files

If you're adding features, these are the key files:

```
src/components/
├── EmailItemCard.tsx       ← Individual email cards
├── EmailSection.tsx        ← Email list container
├── EmailDetailModal.tsx    ← Email detail view
├── JiraItemCard.tsx        ← Individual Jira cards
├── JiraSection.tsx         ← Jira list + grouping
├── JiraDetailModal.tsx     ← Jira detail view
└── index.ts               ← Export all components
```

### Mock Data

```
src/services/mockData.ts
├── mockEmails (3 items)
├── mockJiraActivity (3 items)
├── mockCalendarIssues (coming soon)
└── mockDashboard (full dashboard data)
```

### Adding New Mock Data

To add more emails or Jira items:

```typescript
// src/services/mockData.ts
export const mockEmails: OutlookActivityItem[] = [
  // Add new items here
]
```

---

## 📊 Current Status

| Feature | Status | Notes |
|---------|--------|-------|
| Email viewing | ✅ Complete | Linked modal, Outlook link |
| Jira viewing | ✅ Complete | Linked modal, Jira link, grouped |
| Dark mode | ✅ Complete | Full support all sections |
| Calendar linking | ⏳ In Progress | Coming next |
| Settings page | ⏳ Next | Placeholder ready |
| Real APIs | ⏳ Post-Sprint | Mock data now, real later |

---

## 🚀 What's Next?

1. **Calendar Section** — Click to view meeting conflicts
2. **Settings Page** — Configure preferences
3. **Real API Integration** — Connect to actual Jira & Outlook
4. **Advanced Features** — Reply, forward, status updates

---

**Happy exploring! 🎯**

Questions? Check the team documentation:
- [FEATURES_IMPLEMENTED.md](FEATURES_IMPLEMENTED.md) — What's built
- [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) — How to set up
- [UI_REQUIREMENTS.md](specs/UI_REQUIREMENTS.md) — Component specs
