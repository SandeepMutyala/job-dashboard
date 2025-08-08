# Job Dashboard Monorepo

This is a microservices-based job dashboard platform. All services live in this monorepo.

## Structure

- `job-dashboard-client/`: React frontend application (UI for job seekers, companies, and admins)
- `services/auth-service/`: Authentication microservice handling user registration, login, JWT issuance, and role-based access control
- `services/user-service/`: User profile and role management microservice, managing job seeker and company user data
- `services/company-service/`: Company onboarding and management microservice, handling company profiles and organization data
- `services/job-service/`: Job posting and management microservice, managing job listings and company job postings
- `services/application-service/`: Job application tracking microservice, tracking application statuses, notes, and reminders
- `services/notification-service/`: Notification microservice responsible for sending emails like interview reminders, status updates, and weekly summaries
- `services/ai-assistant--service/`: AI-powered microservice providing resume parsing, job description matching, and AI-driven career assistance features

## Running Locally

### Prerequisites

### Starting Services