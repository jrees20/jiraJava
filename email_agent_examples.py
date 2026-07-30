#!/usr/bin/env python3
"""
Email Reader Agent - Practical Examples
Demonstrates various use cases for the email reading agent
"""

from email_reader_agent import EmailReaderAgent


def example_jennifer_workflow():
    """Example: Track all work items assigned to or mentioning Jennifer"""
    print("\n" + "="*80)
    print("EXAMPLE 1: Jennifer's Workflow - All items mentioning her")
    print("="*80)

    agent = EmailReaderAgent()

    # Get all emails mentioning Jennifer
    jennifer_emails = agent.get_emails_mentioning('@Jennifer')
    print(f"\nTotal emails mentioning @Jennifer: {len(jennifer_emails)}")

    # Separate by type
    jira_with_jennifer = agent.get_jira_with_jennifer()
    print(f"\nJira tickets mentioning @Jennifer: {len(jira_with_jennifer)}")

    for email in jira_with_jennifer:
        ticket_id = email.metadata.get('ticket_id')
        status = email.metadata.get('status')
        priority = email.metadata.get('priority')
        print(f"\n  [{ticket_id}] {email.subject}")
        print(f"    Status: {status} | Priority: {priority}")
        print(f"    Assignee: {email.metadata.get('assignee')}")


def example_jim_meetings():
    """Example: Get all meetings from Jim (the boss)"""
    print("\n" + "="*80)
    print("EXAMPLE 2: Jim's Meeting Requests")
    print("="*80)

    agent = EmailReaderAgent()

    jim_meetings = agent.get_meetings_from_jim()
    print(f"\nTotal meetings from Jim: {len(jim_meetings)}")

    for email in jim_meetings:
        print(f"\n{email.subject}")
        print(f"  Date: {email.metadata.get('meeting_date')}")
        print(f"  Time: {email.metadata.get('meeting_time')}")


def example_learning_topics():
    """Example: List all company-wide learning sessions"""
    print("\n" + "="*80)
    print("EXAMPLE 3: Company-wide Learning Sessions")
    print("="*80)

    agent = EmailReaderAgent()

    learning_meetings = agent.get_learning_meetings()
    print(f"\nTotal learning sessions: {len(learning_meetings)}\n")

    for email in learning_meetings:
        topic = email.metadata.get('topic', 'TBD')
        meeting_date = email.metadata.get('meeting_date')
        print(f"  Topic: {topic}")
        print(f"  Date: {meeting_date}\n")


def example_action_items():
    """Example: Collect all action items from miscellaneous emails"""
    print("\n" + "="*80)
    print("EXAMPLE 4: Action Items from Administrative Emails")
    print("="*80)

    agent = EmailReaderAgent()

    misc_emails = agent.get_misc_emails()
    action_items_found = 0

    for email in misc_emails:
        items = email.metadata.get('action_items', [])
        if items:
            action_items_found += 1
            print(f"\n{email.subject}")
            for item in items:
                print(f"  [ ] {item}")

    print(f"\n\nTotal emails with action items: {action_items_found}")


def example_department_emails():
    """Example: Get emails from each department"""
    print("\n" + "="*80)
    print("EXAMPLE 5: Emails by Department")
    print("="*80)

    agent = EmailReaderAgent()

    departments = ['HR', 'IT Support', 'Admin', 'Finance', 'Operations']

    for dept in departments:
        emails = agent.get_emails_by_sender(dept)
        if emails:
            print(f"\n{dept} ({len(emails)} emails):")
            for email in emails:
                print(f"  - {email.subject}")


def example_jira_status_report():
    """Example: Generate a Jira status report"""
    print("\n" + "="*80)
    print("EXAMPLE 6: Jira Ticket Status Report")
    print("="*80)

    agent = EmailReaderAgent()

    jira_emails = agent.get_jira_emails()
    print(f"\nTotal Jira Tickets: {len(jira_emails)}")

    # Group by status
    statuses = {}
    for email in jira_emails:
        status = email.metadata.get('status', 'Unknown')
        if status not in statuses:
            statuses[status] = []
        statuses[status].append(email)

    print("\nTickets by Status:")
    for status, tickets in sorted(statuses.items()):
        print(f"\n  {status}: {len(tickets)} tickets")
        for email in tickets:
            ticket_id = email.metadata.get('ticket_id')
            priority = email.metadata.get('priority')
            assignee = email.metadata.get('assignee')
            print(f"    - [{ticket_id}] {assignee} (Priority: {priority})")


def example_priority_analysis():
    """Example: Analyze tickets by priority"""
    print("\n" + "="*80)
    print("EXAMPLE 7: Ticket Priority Analysis")
    print("="*80)

    agent = EmailReaderAgent()

    jira_emails = agent.get_jira_emails()

    # Group by priority
    priorities = {}
    for email in jira_emails:
        priority = email.metadata.get('priority', 'Unknown')
        if priority not in priorities:
            priorities[priority] = []
        priorities[priority].append(email)

    print("\nTickets by Priority:")
    for priority in ['Highest', 'High', 'Medium', 'Low']:
        tickets = priorities.get(priority, [])
        print(f"\n  {priority}: {len(tickets)} tickets")
        for email in tickets[:3]:  # Show first 3
            ticket_id = email.metadata.get('ticket_id')
            assignee = email.metadata.get('assignee')
            print(f"    - [{ticket_id}] {assignee}")


def example_search_and_filter():
    """Example: Search and filter emails"""
    print("\n" + "="*80)
    print("EXAMPLE 8: Search and Filter Examples")
    print("="*80)

    agent = EmailReaderAgent()

    # Search for API-related issues
    api_emails = agent.search_emails('API')
    print(f"\nEmails mentioning 'API': {len(api_emails)}")
    for email in api_emails:
        print(f"  - {email.subject}")

    # Search for performance
    perf_emails = agent.search_emails('performance')
    print(f"\nEmails mentioning 'performance': {len(perf_emails)}")

    # Find all high-priority items
    high_priority = [e for e in agent.get_jira_emails() if e.metadata.get('priority') == 'High']
    print(f"\nHigh priority Jira tickets: {len(high_priority)}")


def example_email_statistics():
    """Example: Generate email statistics"""
    print("\n" + "="*80)
    print("EXAMPLE 9: Email Statistics")
    print("="*80)

    agent = EmailReaderAgent()

    print(f"\nTotal emails loaded: {len(agent.emails)}")
    print(f"Jira tickets: {len(agent.get_jira_emails())}")
    print(f"Meeting requests: {len(agent.get_meeting_emails())}")
    print(f"Miscellaneous: {len(agent.get_misc_emails())}")

    print(f"\nJira breakdown:")
    print(f"  With @Jennifer: {len(agent.get_jira_with_jennifer())}")
    print(f"  Without @Jennifer: {len(agent.get_jira_without_jennifer())}")

    print(f"\nMeeting breakdown:")
    print(f"  From Jim: {len(agent.get_meetings_from_jim())}")
    print(f"  Learning sessions: {len(agent.get_learning_meetings())}")
    print(f"  Other: {len(agent.get_meeting_emails()) - len(agent.get_meetings_from_jim()) - len(agent.get_learning_meetings())}")


def run_all_examples():
    """Run all examples"""
    print("\n" + "="*80)
    print("EMAIL READER AGENT - PRACTICAL EXAMPLES")
    print("="*80)

    example_jennifer_workflow()
    example_jim_meetings()
    example_learning_topics()
    example_action_items()
    example_department_emails()
    example_jira_status_report()
    example_priority_analysis()
    example_search_and_filter()
    example_email_statistics()

    print("\n" + "="*80)
    print("Examples completed!")
    print("="*80 + "\n")


if __name__ == "__main__":
    run_all_examples()
