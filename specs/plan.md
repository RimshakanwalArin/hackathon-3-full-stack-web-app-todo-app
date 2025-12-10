# Implementation Plan: Todo App Phase II

**Feature**: Task Management with Authentication
**Phase**: Phase II - Full-Stack Web Application
**Target**: Hackathon II
**Start Date**: 2025-12-08
**Branch**: main

---

## Executive Summary

Phase II builds upon the core data model to deliver a complete full-stack web application with user authentication and task management. This plan details the technical approach, architecture decisions, and implementation strategy to ship a production-ready MVP within 1-2 weeks.

**Key Success Metrics**:
- ✅ Users can register, login, and access their tasks securely
- ✅ Full CRUD operations on tasks with filtering and sorting
- ✅ Responsive UI on desktop, tablet, and mobile
- ✅ API fully documented with MCP tool integration
- ✅ Deployed to production with CI/CD pipeline
- ✅ Zero hardcoded secrets or sensitive data

---

## 1. Technical Context

### Tech Stack (Finalized)

**Frontend**:
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + Hooks
- **HTTP Client**: Centralized API client in `/lib/api.ts`
- **UI Components**: Reusable atomic components (atoms, molecules, organisms)

**Backend**:
- **Framework**: FastAPI (async Python)
- **ORM**: SQLModel (combines Pydantic + SQLAlchemy)
- **Database**: Neon PostgreSQL (serverless)
- **Authentication**: Better Auth with JWT tokens
- **Validation**: Pydantic models for all requests/responses
- **Migrations**: Alembic for database schema versioning

**Infrastructure**:
- **Local Development**: Docker Compose (PostgreSQL + FastAPI + Next.js)
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render or Railway
- **Database**: Neon PostgreSQL cloud
- **CI/CD**: GitHub Actions

### Project Structure

```
hackathon-3-full-stack-web-app-todo-app/
├── frontend/                    # Next.js 14 application
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth layout group
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── (dashboard)/        # Authenticated layout group
│   │       └── tasks/
│   ├── components/             # Reusable components
│   │   ├── atoms/             # Basic components
│   │   ├── molecules/         # Compound components
│   │   └── organisms/         # Feature components
│   ├── lib/
│   │   ├── api.ts            # Centralized API client
│   │   └── auth.ts           # Auth utilities
│   └── middleware.ts          # Route protection
│
├── backend/                     # FastAPI application
│   ├── main.py                # App entry point
│   ├── db.py                  # Database connection
│   ├── models.py              # SQLModel definitions
│   ├── schemas.py             # Pydantic request/response models
│   ├── routes/
│   │   ├── auth.py            # Authentication endpoints
│   │   └── tasks.py           # Task CRUD endpoints
│   ├── services/
│   │   └── task_service.py    # Business logic
│   ├── middleware/
│   │   └── auth.py            # JWT validation
│   ├── alembic/               # Database migrations
│   └── tests/
│       ├── test_tasks.py      # Task endpoint tests
│       └── test_auth.py       # Auth endpoint tests
│
├── specs/                       # Specification documents
│   ├── overview.md            # Project overview
│   ├── specification.md       # Tool specifications
│   ├── features/
│   │   └── task-crud.md      # Task CRUD requirements
│   ├── api/
│   │   ├── rest-endpoints.md # REST API spec
│   │   └── mcp-tools.md      # MCP tool definitions
│   ├── database/
│   │   └── schema.md         # Database schema
│   ├── ui/
│   │   ├── components.md     # Component library
│   │   └── pages.md          # Page specifications
│   ├── tasks.md              # Implementation tasks
│   └── plan.md               # This file
│
├── .spec-kit/
│   └── config.yaml           # Spec-Kit configuration
│
└── docker-compose.yml         # Local dev environment
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Browser / Client                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │   Frontend (Next.js 14 + React + TypeScript)    │   │
│  │  ┌───────────────────────────────────────────┐  │   │
│  │  │ Pages: Login, Register, Dashboard, Tasks │  │   │
│  │  ├───────────────────────────────────────────┤  │   │
│  │  │ Components: Forms, Lists, Cards, Filters │  │   │
│  │  ├───────────────────────────────────────────┤  │   │
│  │  │ State: React Hooks + Context              │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                           ↓                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Centralized API Client (/lib/api.ts)           │   │
│  │  - Authentication header injection              │   │
│  │  - Error handling                               │   │
│  │  - Request/response transformation              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
               HTTP/REST API (JWT-authenticated)
                      ↓
┌─────────────────────────────────────────────────────────┐
│            Backend (FastAPI + Python)                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Routes: /api/auth, /api/tasks                   │   │
│  │ - POST /api/auth/register                       │   │
│  │ - POST /api/auth/login                          │   │
│  │ - POST /api/tasks                               │   │
│  │ - GET /api/tasks (with filters)                 │   │
│  │ - PATCH /api/tasks/{id}                         │   │
│  │ - DELETE /api/tasks/{id}                        │   │
│  └──────────────────────────────────────────────────┘   │
│                           ↓                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Middleware                                       │   │
│  │ - JWT validation                                │   │
│  │ - CORS                                          │   │
│  │ - Error handling                                │   │
│  └──────────────────────────────────────────────────┘   │
│                           ↓                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Services                                         │   │
│  │ - AuthService (registration, login)             │   │
│  │ - TaskService (CRUD, filtering)                 │   │
│  └──────────────────────────────────────────────────┘   │
│                           ↓                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Database Models (SQLModel)                      │   │
│  │ - User (id, email, password_hash, created_at)  │   │
│  │ - Task (id, user_id, title, description, ...)  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│        Database (Neon PostgreSQL)                       │
│                                                           │
│ - users table (managed by Better Auth)                 │
│ - tasks table (with indexes on user_id, completed)    │
│ - All timestamps in UTC ISO 8601 format               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Constitution Check

**Project Constitution**: `.specify/memory/constitution.md` v1.0

### Compliance Verification

✅ **I. Spec-Driven Development**
- Specifications are source of truth in `/specs`
- All implementation tasks reference specs
- Plan follows `/specs/overview.md` and `/specs/specification.md`

✅ **II. Monorepo Architecture**
- Frontend in `/frontend` (Next.js 14)
- Backend in `/backend` (FastAPI)
- Shared specs in `/specs`
- Each has own CLAUDE.md with guidelines

✅ **III. Spec-Driven Implementation Workflow**
- Tasks in `/specs/tasks.md` follow: Read → Understand → Implement → Reference → Test
- Backend implemented first, then frontend
- Use `@specs/` prefix for implementation requests

✅ **IV. Technology Stack (Non-Negotiable)**
- Frontend: Next.js 14, TypeScript, Tailwind CSS ✓
- Backend: FastAPI, SQLModel, Neon PostgreSQL ✓
- Auth: Better Auth with JWT ✓

✅ **V-VI. Frontend & Backend Code Standards**
- Frontend: Server components by default, Tailwind only, centralized API client
- Backend: FastAPI with SQLModel, routes under `/api/`, Pydantic validation

✅ **VII-XVII. All Remaining Principles**
- Testing strategy defined in `/specs/tasks.md`
- Environment management with `.env` files
- Git conventions with spec references
- Deployment to Vercel/Render
- Governance by constitution

**Status**: ✅ COMPLIANT - All principles addressed in this plan

---

## 3. Data Model

### Entities

#### User (Managed by Better Auth)
```
id: string (UUID)
email: string (unique)
name: string (optional)
password_hash: string (bcrypt)
created_at: timestamp (ISO 8601)
updated_at: timestamp (ISO 8601)
```

#### Task
```
id: integer (auto-increment)
user_id: string (FK → User.id)
title: string (1-200 chars, not null)
description: string (optional, max 1000 chars)
completed: boolean (default false)
created_at: timestamp (ISO 8601)
updated_at: timestamp (ISO 8601)
deleted_at: timestamp (nullable, soft delete)
```

### Relationships

- **User → Task**: One-to-many (1:N)
  - User creates and owns many tasks
  - ON DELETE CASCADE (when user deleted, tasks deleted)
  - Index on `tasks.user_id` for filtering

### Validation Rules

**User Model**:
- email: Valid email format, unique
- name: Max 255 characters
- password_hash: Min 8 characters, requires uppercase + lowercase + number + special char

**Task Model**:
- title: Required, 1-200 characters
- description: Optional, max 1000 characters
- completed: Boolean only
- user_id: Must correspond to existing user (foreign key constraint)

---

## 4. API Design (REST)

### Authentication Endpoints

#### POST /api/auth/register
Create a new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "user_id": "uuid-123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error** (409 Conflict):
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email already in use"
  }
}
```

#### POST /api/auth/login
Authenticate user and return JWT tokens.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc...",
    "expires_in": 3600,
    "user": {
      "user_id": "uuid-123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

### Task Endpoints

#### POST /api/tasks
Create a new task.

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request**:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": 5,
    "user_id": "uuid-123",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2025-12-08T10:30:00Z",
    "updated_at": "2025-12-08T10:30:00Z"
  }
}
```

#### GET /api/tasks
List tasks with optional filtering.

**Query Parameters**:
- `status`: "all" (default), "pending", "completed"
- `sort`: "created" (default), "title", "completed"
- `order`: "asc", "desc"

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": "uuid-123",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "created_at": "2025-12-08T10:30:00Z",
      "updated_at": "2025-12-08T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "per_page": 20,
    "total_pages": 1
  }
}
```

#### PATCH /api/tasks/{id}
Update a task.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "updated_at": "2025-12-08T11:00:00Z"
  }
}
```

#### DELETE /api/tasks/{id}
Delete a task (soft delete).

**Response** (204 No Content)

---

## 5. Implementation Strategy

### Phases

**Phase 1: Setup** (T001-T012)
- Create project directories and structure
- Install dependencies
- Configure Docker Compose for local development

**Phase 2: Foundational** (T013-T024)
- Set up database connection and SQLModel
- Create User and Task models
- Implement authentication infrastructure
- Create centralized API client

**Phase 3: Authentication** (T025-T032)
- Build login/register pages
- Implement JWT token handling
- Create route protection middleware
- Add error handling

**Phase 4: Task CRUD** (T033-T056)
- Implement TaskService with business logic
- Create REST API endpoints (POST, GET, PATCH, DELETE)
- Build React components (TaskForm, TaskList, TaskCard)
- Implement filtering and sorting
- Add notifications and confirmations

**Phase 5: Polish** (T057-T074)
- Write unit and integration tests
- Create documentation (README, API docs)
- Set up CI/CD with GitHub Actions
- Deploy to production
- Optimize performance and security

### MVP Definition

**Minimum Viable Product** (Phases 1-2 + Auth + Core CRUD):

Core Features:
- User registration and login
- Create task with title and description
- View all tasks
- Update task (title, description, completion status)
- Delete task
- Filter by status (pending/completed)
- Mark task as complete

Timeline: 3-5 days

### Parallel Execution Opportunities

**Phase 1 (Setup)**:
- T003-T006: Config files (parallel)
- T009-T011: Frontend configs (parallel)

**Phase 2 (Foundational)**:
- T017-T020: Auth setup (parallel with DB setup T013-T016)
- T022-T023: Schemas and error handling (parallel)

**Phase 3 (Auth)**:
- T025-T027: Frontend forms (parallel)
- T029-T031: Auth logic (parallel with forms)

**Phase 4 (Task CRUD)**:
- Backend services T035-T038 (all parallel)
- Backend endpoints T041-T043 (all parallel)
- Frontend components T047-T048 (parallel)
- Frontend state management T050, T054-T055 (parallel)

**Phase 5 (Polish)**:
- Testing T059-T060 (parallel)
- Documentation T064-T065 (parallel)
- Deployment T067-T068 (parallel)

---

## 6. Acceptance Criteria

### Feature Completeness

✅ **Authentication**:
- Users can register with email and password
- Users can login and receive JWT tokens
- Protected routes redirect to login
- Tokens automatically included in API requests
- Password validation (strength requirements)
- Error messages for invalid credentials

✅ **Task CRUD**:
- Create tasks with title (required) and description (optional)
- List all tasks for authenticated user
- Update task fields (title, description, completion status)
- Delete tasks (soft delete)
- Mark tasks as complete with one click
- View task list with details

✅ **Filtering & Sorting**:
- Filter by status (pending/completed/all)
- Sort by created date, title
- UI controls for filtering and sorting
- URL parameters reflect current filters

✅ **UI/UX**:
- Responsive design (mobile, tablet, desktop)
- Loading states and error messages
- Confirmation dialogs for destructive actions
- Success notifications after operations
- Accessible component hierarchy

✅ **API**:
- All endpoints under `/api/`
- Consistent JSON response format
- Proper HTTP status codes
- Error responses with descriptive messages
- Rate limiting implementation
- API documentation

✅ **Database**:
- PostgreSQL with proper schema
- Indexes on frequently queried columns
- Foreign key constraints
- Soft deletes for audit trail
- Timestamps in ISO 8601 format

✅ **Security**:
- No hardcoded secrets
- JWT tokens with expiration
- HTTPS in production
- CORS properly configured
- Input validation on all fields
- SQL injection prevention (SQLModel)
- XSS prevention (React)

✅ **Testing**:
- Unit tests for business logic
- Integration tests for API endpoints
- Component tests for UI
- Test coverage > 80%

✅ **Documentation**:
- README files with setup instructions
- API documentation with examples
- Inline code comments for complex logic
- Git commit messages reference specs

✅ **Deployment**:
- CI/CD pipeline with GitHub Actions
- Automated testing on PR
- Production environment configuration
- Database migrations handled
- No downtime deployment

---

## 7. Risk Analysis

### Top Risks & Mitigations

**Risk 1: Database Connection Issues**
- **Probability**: Medium | **Impact**: High
- **Mitigation**: Use connection pooling, test Neon PostgreSQL connection early (Phase 2)

**Risk 2: Authentication Token Leaks**
- **Probability**: Low | **Impact**: Critical
- **Mitigation**: Use httpOnly cookies, implement token rotation, HTTPS only

**Risk 3: Performance Bottlenecks**
- **Probability**: Medium | **Impact**: Medium
- **Mitigation**: Add database indexes early (Phase 2), optimize queries, implement pagination

**Risk 4: Frontend-Backend Misalignment**
- **Probability**: Medium | **Impact**: Medium
- **Mitigation**: Keep API contracts in `/contracts/`, share specs, test integration early

**Risk 5: Scope Creep**
- **Probability**: High | **Impact**: Medium
- **Mitigation**: Focus on MVP (Phases 1-3), defer features like real-time sync, advanced filtering

---

## 8. Success Metrics

- ✅ All 74 tasks completed and marked [X]
- ✅ MVP features working end-to-end
- ✅ Zero critical security issues
- ✅ API response time < 200ms (p95)
- ✅ Frontend lighthouse score > 80
- ✅ Test coverage > 80%
- ✅ Zero hardcoded secrets
- ✅ Deployed to production
- ✅ All specs synchronized with implementation
- ✅ Documentation complete and accurate

---

## 9. Timeline & Resource Plan

### Estimated Timeline

- **Phase 1 (Setup)**: 2-4 hours
- **Phase 2 (Foundational)**: 4-6 hours
- **Phase 3 (Auth)**: 4-6 hours
- **Phase 4 (Task CRUD)**: 8-12 hours
- **Phase 5 (Polish)**: 6-8 hours

**Total**: 24-36 hours (3-5 days intensive, or 1-2 weeks part-time)

### Resource Requirements

- 1-2 developers (full-stack)
- No dedicated DevOps (self-service with Render/Vercel)
- No dedicated QA (automated tests)
- No dedicated designer (reuse component patterns)

---

## 10. Next Steps

1. ✅ Review this plan and `.specify/memory/constitution.md`
2. ✅ Start Phase 1 (Setup) - `@specs/tasks.md T001`
3. Complete phases sequentially
4. Mark tasks [X] as completed in `/specs/tasks.md`
5. Deploy to production after Phase 5

---

**Version**: 1.0
**Created**: 2025-12-08
**Status**: Ready for Implementation
**Next Milestone**: Phase 1 Complete (T001-T012)
