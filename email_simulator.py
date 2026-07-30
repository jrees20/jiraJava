#!/usr/bin/env python3
"""
Simulated email system that generates text files over a 24-hour period.
Useful for testing email-reading agents.
"""

import os
import random
from datetime import datetime, timedelta
from pathlib import Path


class EmailSimulator:
    def __init__(self, output_dir="simulated_emails"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)

        self.jira_statuses = ["Open", "In Progress", "In Review", "Resolved", "Closed"]

        self.jira_summaries = [
            "Fix inventory sync issue with warehouse API",
            "Update dashboard filtering logic",
            "Implement user authentication module",
            "Optimize database query performance",
            "Add export functionality to reports",
            "Fix mobile responsiveness on inventory page",
            "Implement caching for API responses",
            "Update payment processing integration",
            "Add multi-language support",
            "Fix bug in order calculation",
            "Improve error handling in API",
            "Add automated testing suite",
            "Refactor authentication system",
            "Add real-time notifications",
            "Update API documentation",
        ]

        self.team_members = [
            "John Smith",
            "Jennifer Wilson",
            "Mike Chen",
            "Sarah Johnson",
            "David Lee",
            "Emma Brown",
        ]

        self.meeting_types = [
            "Team Standup",
            "1-on-1 Check-in",
            "Project Planning",
            "Code Review",
            "Sprint Retrospective",
            "Client Sync",
            "Architecture Discussion",
        ]

        self.learning_topics = [
            "Kubernetes Best Practices",
            "Microservices Architecture",
            "Python Performance Optimization",
            "Cloud Security Fundamentals",
            "API Design Patterns",
            "Testing Strategies for Large Codebases",
            "Database Optimization",
            "DevOps and CI/CD Pipelines",
        ]

        self.misc_subjects = [
            "Action Required: Update Your PTO Calendar",
            "Office Supplies Reorder - Please Submit Requests",
            "Q{quarter} Compensation Review Completed",
            "New Onboarding Process Updates",
            "System Downtime Maintenance Window - {date}",
            "Company Event: Team Building Activity on {date}",
            "Password Reset Required - Security Update",
            "Project {project} Repository Access Granted",
            "Code of Conduct Acknowledgment Required",
            "Benefits Enrollment Period Opens {date}",
            "New Tool Available: {tool}",
            "Performance Review Cycle Information",
            "Documentation Update: {doc_type}",
            "Approved: {request_type} Request",
            "Team Lunch Signup - Next Friday",
        ]

        self.misc_senders = [
            ("HR", "hr@company.com"),
            ("IT Support", "itsupport@company.com"),
            ("Admin", "admin@company.com"),
            ("Finance", "finance@company.com"),
            ("Operations", "ops@company.com"),
            ("Engineering Manager", f"{random.choice(self.team_members).lower().replace(' ', '.')}@company.com"),
        ]

    def generate_emails(self, num_jira_with_jennifer=5, num_jira_other=5, num_meeting_learning=3, num_meeting_from_jim=2, num_miscellaneous=4, spread_hours=24):
        """
        Generate simulated emails distributed over a time period.

        Args:
            num_jira_with_jennifer: Number of Jira tickets mentioning @Jennifer
            num_jira_other: Number of Jira tickets without @Jennifer mentions
            num_meeting_learning: Number of company-wide learning meeting requests
            num_meeting_from_jim: Number of meeting requests from boss Jim
            num_miscellaneous: Number of miscellaneous emails
            spread_hours: Hours to distribute emails across (default 24)
        """
        now = datetime.now()
        start_time = now - timedelta(hours=spread_hours)
        total_emails = num_jira_with_jennifer + num_jira_other + num_meeting_learning + num_meeting_from_jim + num_miscellaneous
        file_index = 0

        # Generate Jira tickets with @Jennifer mentions
        for i in range(num_jira_with_jennifer):
            random_offset = random.uniform(0, spread_hours * 3600)
            email_time = start_time + timedelta(seconds=random_offset)

            email_content = self._generate_jira_email(email_time, mentions_jennifer=True)
            filename = self._create_filename(email_time, file_index)
            filepath = self.output_dir / filename

            with open(filepath, 'w') as f:
                f.write(email_content)

            print(f"Generated: {filename} (Jira with @Jennifer)")
            file_index += 1

        # Generate Jira tickets without @Jennifer mentions
        for i in range(num_jira_other):
            random_offset = random.uniform(0, spread_hours * 3600)
            email_time = start_time + timedelta(seconds=random_offset)

            email_content = self._generate_jira_email(email_time, mentions_jennifer=False)
            filename = self._create_filename(email_time, file_index)
            filepath = self.output_dir / filename

            with open(filepath, 'w') as f:
                f.write(email_content)

            print(f"Generated: {filename} (Jira without @Jennifer)")
            file_index += 1

        # Generate company-wide learning meeting requests
        for i in range(num_meeting_learning):
            random_offset = random.uniform(0, spread_hours * 3600)
            email_time = start_time + timedelta(seconds=random_offset)

            email_content = self._generate_meeting_email(email_time, from_jim=False, is_learning=True)
            filename = self._create_filename(email_time, file_index)
            filepath = self.output_dir / filename

            with open(filepath, 'w') as f:
                f.write(email_content)

            print(f"Generated: {filename} (Company-wide Learning Meeting)")
            file_index += 1

        # Generate meeting requests from Jim
        for i in range(num_meeting_from_jim):
            random_offset = random.uniform(0, spread_hours * 3600)
            email_time = start_time + timedelta(seconds=random_offset)

            email_content = self._generate_meeting_email(email_time, from_jim=True, is_learning=False)
            filename = self._create_filename(email_time, file_index)
            filepath = self.output_dir / filename

            with open(filepath, 'w') as f:
                f.write(email_content)

            print(f"Generated: {filename} (Meeting Request from Jim)")
            file_index += 1

        # Generate miscellaneous emails
        for i in range(num_miscellaneous):
            random_offset = random.uniform(0, spread_hours * 3600)
            email_time = start_time + timedelta(seconds=random_offset)

            email_content = self._generate_misc_email(email_time)
            filename = self._create_filename(email_time, file_index)
            filepath = self.output_dir / filename

            with open(filepath, 'w') as f:
                f.write(email_content)

            print(f"Generated: {filename} (Miscellaneous)")
            file_index += 1

        print(f"\n[+] Generated {total_emails} emails in '{self.output_dir}'")

    def _generate_jira_email(self, timestamp, mentions_jennifer=False):
        """Generate a Jira ticket email notification."""
        ticket_id = f"PROJ-{random.randint(1000, 9999)}"
        summary = random.choice(self.jira_summaries)
        status = random.choice(self.jira_statuses)
        priority = random.choice(["Highest", "High", "Medium", "Low"])
        assignee = random.choice(self.team_members)
        reporter = random.choice([tm for tm in self.team_members if tm != assignee])

        # Generate comments
        num_comments = random.randint(2, 5)
        comments = []

        for i in range(num_comments):
            comment_time = timestamp + timedelta(hours=random.randint(1, 48))
            comment_author = random.choice(self.team_members)

            comment_text = random.choice([
                "I've started working on this. Should have an update by EOD.",
                "This is related to the previous ticket we discussed.",
                "Can someone review the changes I pushed?",
                "The fix is ready for testing in staging.",
                "I found the root cause - it's in the API layer.",
                "This needs to be prioritized higher.",
                "Great catch! Let me investigate further.",
                "The customer is waiting on this fix.",
                "I've updated the documentation accordingly.",
            ])

            if mentions_jennifer and random.random() < 0.6:
                comment_text = f"@Jennifer {comment_text}"
            elif mentions_jennifer and i == num_comments - 1:
                comment_text += " @Jennifer - can you review this?"

            comments.append({
                "author": comment_author,
                "time": comment_time.strftime("%a, %d %b %Y %H:%M:%S"),
                "text": comment_text,
            })

        # Format comments section
        comments_section = ""
        for comment in comments:
            comments_section += f"\n--- Comment by {comment['author']} at {comment['time']} ---\n{comment['text']}\n"

        description = random.choice([
            "User reported an issue with the current workflow.",
            "Performance improvement needed for this component.",
            "Documentation update required for API changes.",
            "Integration test failing in CI/CD pipeline.",
            "Customer requested this feature for their workflow.",
        ])

        email = f"""From: jira-notifications@company.com
To: dev-team@company.com
Date: {timestamp.strftime("%a, %d %b %Y %H:%M:%S %z")}
Subject: [{ticket_id}] {summary}
Message-ID: <{ticket_id.replace('-', '')}@jira.company.com>

Jira Ticket Notification
========================

Ticket ID: {ticket_id}
Summary: {summary}
Status: {status}
Priority: {priority}
Assignee: {assignee}
Reporter: {reporter}

Description:
{description}
{comments_section}
---
This is an automated notification from Jira. Do not reply to this email.
Visit: https://jira.company.com/browse/{ticket_id}
"""
        return email

    def _generate_meeting_email(self, timestamp, from_jim=False, is_learning=False):
        """Generate a meeting request email."""
        if from_jim:
            sender = "jim@company.com"
            sender_name = "Jim (Manager)"
        else:
            sender = f"{random.choice(self.team_members).lower().replace(' ', '.')}@company.com"
            sender_name = random.choice(self.team_members)

        if is_learning:
            meeting_title = f"Company-wide Learning: {random.choice(self.learning_topics)}"
            meeting_type = "Company-wide Learning Session"
            description = "Join us for an educational session where we'll dive deep into industry best practices and technical knowledge sharing."
            attendees = "all-staff@company.com"
        else:
            meeting_type = random.choice(self.meeting_types)
            meeting_title = f"{meeting_type} - {random.choice(self.team_members)}"
            description = f"Let's sync up and discuss progress on our current projects and upcoming initiatives."
            attendees = ", ".join([random.choice(self.team_members) for _ in range(random.randint(2, 4))])

        # Meeting time in the future
        meeting_time = timestamp + timedelta(days=random.randint(1, 5))
        meeting_hour = random.choice([9, 10, 14, 15, 16])
        meeting_datetime = meeting_time.replace(hour=meeting_hour, minute=0, second=0)

        duration_minutes = random.choice([30, 45, 60])
        meeting_end = meeting_datetime + timedelta(minutes=duration_minutes)

        email = f"""From: {sender}
To: {attendees}
Date: {timestamp.strftime("%a, %d %b %Y %H:%M:%S %z")}
Subject: Meeting Request: {meeting_title}
Message-ID: <mtg_{int(timestamp.timestamp())}@calendar.company.com>

Meeting Request
===============

Organizer: {sender_name}
Title: {meeting_title}
Type: {meeting_type}

Date: {meeting_datetime.strftime("%A, %B %d, %Y")}
Time: {meeting_datetime.strftime("%I:%M %p")} - {meeting_end.strftime("%I:%M %p")}
Duration: {duration_minutes} minutes

Description:
{description}

Attendees:
{attendees}

Calendar Details:
Location: Virtual (Zoom link will be sent separately)
Meeting Link: https://zoom.company.com/meeting/{random.randint(10000, 99999)}

---
This is a calendar invitation. Please reply to accept or decline.
Company Calendar System
"""
        return email

    def _generate_misc_email(self, timestamp):
        """Generate a miscellaneous work email."""
        sender_name, sender_email = random.choice(self.misc_senders)
        subject_template = random.choice(self.misc_subjects)

        # Fill in template variables
        subject = subject_template.format(
            quarter=random.randint(1, 4),
            date=timestamp.strftime("%B %d, %Y"),
            project=f"Project-{random.randint(100, 999)}",
            tool=random.choice(["Slack Integration", "GitHub Actions", "Monitoring Dashboard", "API Client"]),
            doc_type=random.choice(["API Documentation", "Setup Guide", "Best Practices", "Release Notes"]),
            request_type=random.choice(["vacation", "equipment", "training", "budget"]),
        )

        body_templates = [
            """Hi Team,

Please take a moment to review and complete the requested action by {deadline}.

Details are available at {link}

Thank you,
{sender}""",

            """Hello,

We're reaching out regarding {topic}.

Action Items:
- {item1}
- {item2}
- {item3}

Please respond by {deadline} if applicable.

Best regards,
{sender}""",

            """Team,

{announcement}

More information will follow. If you have questions, please reach out.

Thanks,
{sender}""",

            """Dear {recipient},

Thank you for your submission. We wanted to confirm receipt and provide the following information:

Status: {status}
Reference: {reference}
Next Steps: {next_steps}

Please reach out if you have any questions.

Best,
{sender}""",
        ]

        body_template = random.choice(body_templates)
        deadline = timestamp + timedelta(days=random.randint(1, 7))

        body = body_template.format(
            deadline=deadline.strftime("%A, %B %d"),
            link=f"https://company.sharepoint.com/doc{random.randint(1000, 9999)}",
            sender=sender_name,
            topic=random.choice(["upcoming changes", "important information", "policy updates", "system changes"]),
            item1=random.choice(["Review the guidelines", "Submit your information", "Acknowledge receipt", "Complete training"]),
            item2=random.choice(["Update your profile", "Schedule your session", "Provide feedback", "Confirm attendance"]),
            item3=random.choice(["Reach out with questions", "Share any concerns", "Request support if needed", "Follow up as needed"]),
            announcement=random.choice([
                "We have an important update regarding our processes.",
                "New tools and resources are now available to the team.",
                "An upcoming event has been scheduled for next week.",
                "System maintenance will occur this weekend.",
            ]),
            recipient=random.choice(self.team_members),
            status=random.choice(["Approved", "Received", "In Review", "Pending"]),
            reference=f"REF-{random.randint(100000, 999999)}",
            next_steps=random.choice(["You'll receive further details soon", "Awaiting your confirmation", "Processing underway", "Ready for implementation"]),
        )

        email = f"""From: {sender_email}
To: dev-team@company.com
Date: {timestamp.strftime("%a, %d %b %Y %H:%M:%S %z")}
Subject: {subject}
Message-ID: <misc_{int(timestamp.timestamp())}@company.com>

{body}

---
This is an automated or administrative message.
Company Communications
"""
        return email

    def _create_filename(self, timestamp, index):
        """Create a filename with timestamp."""
        time_str = timestamp.strftime("%Y%m%d_%H%M%S")
        return f"email_{time_str}_{index:03d}.txt"

    def clear_emails(self):
        """Remove all generated emails."""
        if self.output_dir.exists():
            for file in self.output_dir.glob("email_*.txt"):
                file.unlink()
            print(f"[+] Cleared all emails from '{self.output_dir}'")


if __name__ == "__main__":
    simulator = EmailSimulator()

    # Generate emails distributed over 24 hours:
    # - Jira tickets with @Jennifer mentions
    # - Jira tickets without @Jennifer mentions
    # - Company-wide learning meeting requests
    # - Meeting requests from Jim
    # - Miscellaneous work emails
    simulator.generate_emails(
        num_jira_with_jennifer=5,
        num_jira_other=5,
        num_meeting_learning=3,
        num_meeting_from_jim=2,
        num_miscellaneous=4,
        spread_hours=24
    )

    # To clear generated emails, uncomment:
    # simulator.clear_emails()
