# hephaestus_network_backend

# 🔥 Hephaestus Network – Backend (MVP)

The backend for **Hephaestus Network** powers authentication, job management, skilled worker onboarding, impact tracking, and admin operations.

Built with scalability, security, and African market realities in mind.

---

## 🌍 Overview

Hephaestus Network is a digital marketplace connecting clients with **verified skilled professionals across Africa**, inspired by Hephaestus — the Greek god of craftsmanship and builders.

The backend provides:
- Secure APIs
- Worker verification flows
- Job lifecycle management
- Impact & SDG tracking

---

## 🛠 Tech Stack

- **Language:** TypeScript
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM / Prisma
- **Authentication:** JWT + OTP
- **Caching:** Redis (optional)
- **Hosting:** DigitalOcean / Render / Railway

---


---

## 🔐 Authentication
- Phone or Email registration
- OTP verification
- JWT-based session handling
- Role-based access (USER | WORKER | ADMIN)

---

## 🔌 Core API Modules

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/verify-otp`

### Users & Jobs
- `POST /jobs`
- `GET /jobs/my-jobs`
- `POST /jobs/{id}/hire/{workerId}`

### Workers
- `POST /workers/onboard`
- `GET /workers/jobs`
- `POST /workers/jobs/{id}/accept`
- `POST /workers/jobs/{id}/complete`

### Impact (SDGs)
- `GET /impact/summary`

### Admin
- `GET /admin/workers/pending`
- `POST /admin/workers/{id}/approve`

---

## 🗄 Database Tables (MVP)

- users
- workers
- skills
- worker_skills
- jobs
- job_workers
- reviews
- impact_metrics

---

## 🌍 SDG & Impact Tracking

The backend tracks impact metrics aligned with:
- SDG 1 – No Poverty
- SDG 8 – Decent Work & Economic Growth
- SDG 10 – Reduced Inequalities

Metrics include:
- Total workers onboarded
- Jobs completed
- Income generated
- Locations served

---

