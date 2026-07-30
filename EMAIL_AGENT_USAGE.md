# Email Reading Agent - Usage Guide

The Email Reading Agent reads and processes simulated emails from the `simulated_emails/` directory. It automatically categorizes emails and extracts structured data.

## Features

### Email Types Supported
- **Jira Tickets**: Issue tracking with comments, status, priority, assignee
- **Meeting Requests**: Calendar invitations including company-wide learning and meetings from Jim
- **Miscellaneous**: HR, IT, Finance, Operations, and Admin emails

### Automatic Extraction
- Jira ticket metadata (ID, status, priority, assignee, mentions of @Jennifer)
- Meeting details (date, time, attendees, type)
- Miscellaneous email metadata (sender type, action items)

## Usage Examples

### Basic Initialization
```python
from email_reader_agent import EmailReaderAgent

agent = EmailReaderAgent()
```

### List All Emails
```python
agent.list_all_emails()
```

### Get Email Summaries
```python
agent.print_summary()
```

### Jira Tickets
```python
# Get all Jira tickets
all_jira = agent.get_jira_emails()

# Get Jira tickets mentioning @Jennifer
jennifer_tickets = agent.get_jira_with_jennifer()

# Get Jira tickets without @Jennifer mentions
other_tickets = agent.get_jira_without_jennifer()

# Print details of first ticket with Jennifer
for email in jennifer_tickets:
    agent.print_email_detail(email)
    print(f"  Ticket ID: {email.metadata['ticket_id']}")
    print(f"  Assignee: {email.metadata['assignee']}")
    print(f"  Status: {email.metadata['status']}")
```

### Meeting Requests
```python
# Get all meeting requests
all_meetings = agent.get_meeting_emails()

# Get meetings from Jim
jim_meetings = agent.get_meetings_from_jim()
for email in jim_meetings:
    print(f"From Jim: {email.subject}")
    print(f"  Date: {email.metadata.get('meeting_date')}")
    print(f"  Time: {email.metadata.get('meeting_time')}")

# Get company-wide learning meetings
learning_meetings = agent.get_learning_meetings()
for email in learning_meetings:
    print(f"Learning Topic: {email.metadata.get('topic')}")
```

### Miscellaneous Emails
```python
# Get all miscellaneous emails
misc_emails = agent.get_misc_emails()

# Get emails from specific sender type
hr_emails = agent.get_emails_by_sender('HR')
it_emails = agent.get_emails_by_sender('IT Support')
ops_emails = agent.get_emails_by_sender('Operations')

# Show action items from miscellaneous emails
for email in misc_emails:
    if 'action_items' in email.metadata:
        print(f"\n{email.subject}")
        for item in email.metadata['action_items']:
            print(f"  - {item}")
```

### Search and Filter
```python
# Search by keyword
results = agent.search_emails('API')
for email in results:
    print(f"Found: {email.subject}")

# Get emails mentioning @Jennifer
jennifer_mentions = agent.get_emails_mentioning('@Jennifer')
print(f"Total mentions of Jennifer: {len(jennifer_mentions)}")

# Get emails mentioning a specific term
deploy_emails = agent.search_emails('deploy')
```

### Detailed Email Inspection
```python
# Print full details of an email
email = agent.emails[0]
agent.print_email_detail(email)
```

## Email Object Structure

Each email has the following attributes:
- `filename`: Source file name
- `sender`: From email address
- `to`: To email addresses
- `subject`: Email subject
- `date`: Date sent
- `content`: Full email body
- `message_id`: Message-ID header
- `email_type`: 'jira', 'meeting', or 'misc'
- `metadata`: Type-specific extracted data

### Metadata by Type

**Jira Emails:**
- `ticket_id`: PROJ-#### format
- `mentions_jennifer`: Boolean
- `status`: Open, In Progress, Resolved, etc.
- `priority`: Highest, High, Medium, Low
- `assignee`: Assigned team member

**Meeting Emails:**
- `from_jim`: Boolean (true if from Jim)
- `is_learning`: Boolean (true for company-wide learning)
- `topic`: Learning topic (if is_learning=true)
- `meeting_type`: Type of meeting (if not learning)
- `meeting_date`: Scheduled date
- `meeting_time`: Scheduled time

**Miscellaneous Emails:**
- `sender_type`: HR, IT Support, Admin, Finance, Operations
- `action_items`: List of action items in email

## Output Examples

### Summary Report
```
============================================================
EMAIL SUMMARY
============================================================
Total Emails: 19

Jira Tickets: 10
  - With @Jennifer mentions: 5
  - Without @Jennifer mentions: 5

Meeting Requests: 5
  - Company-wide Learning: 3
  - From Jim: 2

Miscellaneous Emails: 4
  By Sender Type:
    - HR: 1
    - Operations: 3
============================================================
```

### Detailed Email View
```
================================================================================
File: email_20260729_195058_004.txt
Type: JIRA
================================================================================
From: jira-notifications@company.com
To: dev-team@company.com
Subject: [PROJ-9313] Update payment processing integration

Metadata:
  ticket_id: PROJ-9313
  mentions_jennifer: True
  status: Closed
  priority: Low
  assignee: Jennifer Wilson

Content:
[Full email body with all comments...]
```

## Running the Agent

### As a standalone script:
```bash
python email_reader_agent.py
```

This will run the demo showing:
1. Email summary
2. All emails list
3. Jira tickets with @Jennifer
4. Meeting requests from Jim
5. Company-wide learning meetings
6. HR emails
7. Detailed view of first Jira ticket with Jennifer

### Programmatically:
```python
from email_reader_agent import EmailReaderAgent

agent = EmailReaderAgent()

# Do whatever you need with the agent
# Access emails via: agent.emails
# Use methods like: agent.get_jira_with_jennifer()
```

## Email Statistics

The agent can help answer questions like:
- How many Jira tickets mention Jennifer?
- Which meetings are from Jim?
- What are all the learning topics?
- Which departments sent miscellaneous emails?
- What action items are pending?
- Are there any urgent issues (based on priority)?

## Extensibility

The agent can be easily extended to:
- Filter by date range
- Track action item completion
- Generate reports by category
- Export data to JSON/CSV
- Track email response status
- Implement assignment tracking
