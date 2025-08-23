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

## Logging

This project uses **Winston** as a structured JSON logger for all services.  
The logger standardizes log output across different levels (`info`, `warn`, `error`, `debug`) and makes it easy to parse logs in tools like **Promtail + Loki + Grafana**.  

## Docker

All microservices in this monorepo are designed to be containerized using Docker.

- Each microservice runs independently inside its own Docker container.
- Dependencies like PostgreSQL and Redis are also containerized.
- Docker Compose orchestrates multiple containers during development, enabling seamless communication between services.
- Containerization ensures reproducible environments across development, testing, and production.
- Services can be scaled individually and deployed in cloud environments with minimal configuration changes.

---

## Running Locally

To run the platform locally:

1. Set up environment variables for each service (database(PostGres), Redis, Loki, API keys) using sample `.env` files.
2. Build and start each microservice container along with dependent services like the database and Redis.
3. Once containers are running, all APIs, frontend, and microservices communicate as if they were in a production environment.
4. Logging is automatically captured in structured JSON format and can be forwarded to observability tools Loki+Grafana for debugging or monitoring.
