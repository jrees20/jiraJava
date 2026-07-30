#!/usr/bin/env python3
"""
Email Reading Agent - Reads and processes simulated emails
Extracts information, categorizes emails, and provides filtering capabilities
"""

import re
from pathlib import Path
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Email:
    """Represents a parsed email"""
    filename: str
    sender: str
    to: str
    subject: str
    date: str
    content: str
    message_id: str
    email_type: str
    metadata: dict

    def __repr__(self):
        return f"<Email type={self.email_type} subject={self.subject[:50]}...>"


class EmailReaderAgent:
    """Agent for reading and processing emails from the simulated email system"""

    def __init__(self, email_dir="simulated_emails"):
        self.email_dir = Path(email_dir)
        self.emails: List[Email] = []
        self._load_emails()

    def _load_emails(self):
        """Load all email files from the directory"""
        if not self.email_dir.exists():
            print(f"Email directory '{self.email_dir}' not found")
            return

        email_files = sorted(self.email_dir.glob("email_*.txt"))
        print(f"Loading {len(email_files)} emails...")

        for email_file in email_files:
            email = self._parse_email_file(email_file)
            if email:
                self.emails.append(email)

        print(f"[+] Loaded {len(self.emails)} emails\n")

    def _parse_email_file(self, filepath: Path) -> Optional[Email]:
        """Parse a single email file"""
        try:
            with open(filepath, 'r') as f:
                content = f.read()

            # Extract headers
            header_section = content.split('\n\n')[0]
            body_section = '\n\n'.join(content.split('\n\n')[1:])

            headers = {}
            for line in header_section.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    headers[key.strip()] = value.strip()

            # Determine email type and extract metadata
            email_type, metadata = self._categorize_email(headers, body_section)

            email = Email(
                filename=filepath.name,
                sender=headers.get('From', ''),
                to=headers.get('To', ''),
                subject=headers.get('Subject', ''),
                date=headers.get('Date', ''),
                content=body_section,
                message_id=headers.get('Message-ID', ''),
                email_type=email_type,
                metadata=metadata
            )
            return email
        except Exception as e:
            print(f"Error parsing {filepath.name}: {e}")
            return None

    def _categorize_email(self, headers: dict, body: str) -> tuple:
        """Categorize email and extract metadata"""
        subject = headers.get('Subject', '')
        sender = headers.get('From', '')

        metadata = {}

        # Jira ticket
        if '[PROJ-' in subject:
            ticket_match = re.search(r'\[PROJ-(\d+)\]', subject)
            if ticket_match:
                ticket_id = f"PROJ-{ticket_match.group(1)}"
                metadata['ticket_id'] = ticket_id

            # Check for @Jennifer mentions
            has_jennifer = '@Jennifer' in body
            metadata['mentions_jennifer'] = has_jennifer

            # Extract status
            status_match = re.search(r'Status: (\w+)', body)
            if status_match:
                metadata['status'] = status_match.group(1)

            # Extract priority
            priority_match = re.search(r'Priority: (\w+)', body)
            if priority_match:
                metadata['priority'] = priority_match.group(1)

            # Extract assignee
            assignee_match = re.search(r'Assignee: (.+)', body)
            if assignee_match:
                metadata['assignee'] = assignee_match.group(1)

            return 'jira', metadata

        # Meeting request
        elif 'Meeting Request' in subject or 'Meeting Request' in body:
            metadata['from_jim'] = 'jim@company.com' in sender

            # Extract meeting type
            if 'Company-wide Learning' in subject:
                metadata['is_learning'] = True
                topic_match = re.search(r'Company-wide Learning: (.+)', subject)
                if topic_match:
                    metadata['topic'] = topic_match.group(1)
            else:
                metadata['is_learning'] = False
                type_match = re.search(r'Type: (.+)', body)
                if type_match:
                    metadata['meeting_type'] = type_match.group(1)

            # Extract date/time
            date_match = re.search(r'Date: (.+)', body)
            if date_match:
                metadata['meeting_date'] = date_match.group(1)

            time_match = re.search(r'Time: (.+)', body)
            if time_match:
                metadata['meeting_time'] = time_match.group(1)

            return 'meeting', metadata

        # Miscellaneous
        else:
            # Extract sender type
            if 'hr@company.com' in sender:
                metadata['sender_type'] = 'HR'
            elif 'itsupport@company.com' in sender:
                metadata['sender_type'] = 'IT Support'
            elif 'admin@company.com' in sender:
                metadata['sender_type'] = 'Admin'
            elif 'finance@company.com' in sender:
                metadata['sender_type'] = 'Finance'
            elif 'ops@company.com' in sender:
                metadata['sender_type'] = 'Operations'
            else:
                metadata['sender_type'] = 'Other'

            # Extract action items
            action_items = re.findall(r'- (.+)', body)
            if action_items:
                metadata['action_items'] = action_items

            return 'misc', metadata

    def list_all_emails(self):
        """List all emails with basic info"""
        print("=" * 100)
        print(f"{'Type':<10} {'From':<25} {'Subject':<50} {'File':<30}")
        print("=" * 100)
        for email in self.emails:
            print(f"{email.email_type:<10} {email.sender:<25} {email.subject[:47]:<50} {email.filename:<30}")
        print()

    def get_jira_emails(self) -> List[Email]:
        """Get all Jira ticket emails"""
        return [e for e in self.emails if e.email_type == 'jira']

    def get_jira_with_jennifer(self) -> List[Email]:
        """Get Jira tickets mentioning @Jennifer"""
        return [e for e in self.emails if e.email_type == 'jira' and e.metadata.get('mentions_jennifer')]

    def get_jira_without_jennifer(self) -> List[Email]:
        """Get Jira tickets without @Jennifer mentions"""
        return [e for e in self.emails if e.email_type == 'jira' and not e.metadata.get('mentions_jennifer')]

    def get_meeting_emails(self) -> List[Email]:
        """Get all meeting request emails"""
        return [e for e in self.emails if e.email_type == 'meeting']

    def get_meetings_from_jim(self) -> List[Email]:
        """Get meeting requests from Jim"""
        return [e for e in self.emails if e.email_type == 'meeting' and e.metadata.get('from_jim')]

    def get_learning_meetings(self) -> List[Email]:
        """Get company-wide learning meetings"""
        return [e for e in self.emails if e.email_type == 'meeting' and e.metadata.get('is_learning')]

    def get_misc_emails(self) -> List[Email]:
        """Get all miscellaneous emails"""
        return [e for e in self.emails if e.email_type == 'misc']

    def get_emails_by_sender(self, sender_type: str) -> List[Email]:
        """Get emails from a specific sender type (HR, IT, etc.)"""
        return [e for e in self.emails if e.email_type == 'misc' and e.metadata.get('sender_type') == sender_type]

    def search_emails(self, keyword: str) -> List[Email]:
        """Search emails by keyword in subject or content"""
        keyword_lower = keyword.lower()
        return [
            e for e in self.emails
            if keyword_lower in e.subject.lower() or keyword_lower in e.content.lower()
        ]

    def get_emails_mentioning(self, mention: str) -> List[Email]:
        """Get emails mentioning a specific person (e.g., @Jennifer)"""
        return [e for e in self.emails if mention in e.content]

    def print_email_detail(self, email: Email):
        """Print detailed information about an email"""
        print("\n" + "=" * 80)
        print(f"File: {email.filename}")
        print(f"Type: {email.email_type.upper()}")
        print("=" * 80)
        print(f"From: {email.sender}")
        print(f"To: {email.to}")
        print(f"Date: {email.date}")
        print(f"Subject: {email.subject}")
        print(f"Message-ID: {email.message_id}")

        if email.metadata:
            print("\nMetadata:")
            for key, value in email.metadata.items():
                if isinstance(value, list):
                    print(f"  {key}:")
                    for item in value:
                        print(f"    - {item}")
                else:
                    print(f"  {key}: {value}")

        print("\nContent:")
        print("-" * 80)
        print(email.content)
        print("-" * 80 + "\n")

    def print_summary(self):
        """Print a summary of loaded emails"""
        jira_emails = self.get_jira_emails()
        jira_with_jennifer = self.get_jira_with_jennifer()
        meeting_emails = self.get_meeting_emails()
        learning_meetings = self.get_learning_meetings()
        meetings_from_jim = self.get_meetings_from_jim()
        misc_emails = self.get_misc_emails()

        print("\n" + "=" * 60)
        print("EMAIL SUMMARY")
        print("=" * 60)
        print(f"Total Emails: {len(self.emails)}")
        print(f"\nJira Tickets: {len(jira_emails)}")
        print(f"  - With @Jennifer mentions: {len(jira_with_jennifer)}")
        print(f"  - Without @Jennifer mentions: {len(jira_emails) - len(jira_with_jennifer)}")
        print(f"\nMeeting Requests: {len(meeting_emails)}")
        print(f"  - Company-wide Learning: {len(learning_meetings)}")
        print(f"  - From Jim: {len(meetings_from_jim)}")
        print(f"\nMiscellaneous Emails: {len(misc_emails)}")

        sender_types = {}
        for email in misc_emails:
            sender_type = email.metadata.get('sender_type', 'Unknown')
            sender_types[sender_type] = sender_types.get(sender_type, 0) + 1

        if sender_types:
            print("  By Sender Type:")
            for sender_type, count in sorted(sender_types.items()):
                print(f"    - {sender_type}: {count}")
        print("=" * 60 + "\n")


def main():
    """Main entry point for the email reading agent"""
    agent = EmailReaderAgent()

    # Print summary
    agent.print_summary()

    # Example: List all emails
    print("\nAll Emails:")
    agent.list_all_emails()

    # Example: Show Jira tickets with @Jennifer
    print("\nJira Tickets Mentioning @Jennifer:")
    for email in agent.get_jira_with_jennifer():
        print(f"  - [{email.metadata['ticket_id']}] {email.subject}")

    # Example: Show meetings from Jim
    print("\nMeeting Requests from Jim:")
    for email in agent.get_meetings_from_jim():
        print(f"  - {email.subject}")

    # Example: Show learning meetings
    print("\nCompany-wide Learning Meetings:")
    for email in agent.get_learning_meetings():
        topic = email.metadata.get('topic', 'N/A')
        print(f"  - {topic}")

    # Example: Show HR emails
    print("\nHR Emails:")
    for email in agent.get_emails_by_sender('HR'):
        print(f"  - {email.subject}")

    # Example: Detail view of first Jira ticket with Jennifer
    jira_with_jennifer = agent.get_jira_with_jennifer()
    if jira_with_jennifer:
        print("\n\nDetail View - First Jira Ticket with @Jennifer:")
        agent.print_email_detail(jira_with_jennifer[0])


if __name__ == "__main__":
    main()
