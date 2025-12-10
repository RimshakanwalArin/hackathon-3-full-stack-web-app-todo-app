# Todo App - Project Constitution

**Version**: 1.0
**Ratified**: 2025-12-08
**Phase**: Phase II - Full-Stack Web Application

---

## Core Principles

### I. Spec-Driven Development
- Specifications in `/specs` are the source of truth
- Always read relevant spec before implementing
- Reference specs with `@specs/category/file.md` when requesting implementation
- Update specs first if requirements change; implementation follows
- Specs are organized by category: features, api, database, ui, overview

### II. Monorepo Architecture
- Frontend and backend are sibling directories
- `/frontend` - Next.js 14 application
- `/backend` - FastAPI application
- Each has its own CLAUDE.md with specific guidelines
- Coordinated development with shared specs

### III. Spec-Driven Implementation Workflow
1. **Read**: Always read the relevant spec before coding
2. **Understand**: Check acceptance criteria and requirements
3. **Implement**: Backend first, then frontend
4. **Reference**: Use `@specs/` prefix when asking Claude Code
5. **Test**: Verify against acceptance criteria
6. **Iterate**: Update spec if requirements change

### IV. Technology Stack (Non-Negotiable)
**Frontend**:
- Next.js 14 with App Router
- TypeScript (strict mode)
- Tailwind CSS for styling
- Server components by default

**Backend**:
- FastAPI (modern Python framework)
- SQLModel (ORM combining Pydantic + SQLAlchemy)
- Neon PostgreSQL (serverless)
- Better Auth for authentication (JWT-based)

**Database**:
- PostgreSQL with Neon
- SQLModel for type-safe operations
- Environment variable: DATABASE_URL

### V. Frontend Code Standards

#### Components
- **Server components** by default
- **Client components** only for interactivity
- Components in `/components`
- Pages and layouts in `/app`

#### Styling
- **Tailwind CSS classes only** - no inline styles
- Follow existing patterns
- Responsive design (mobile-first)

#### API Communication
- **Centralized** in `/lib/api.ts`
- All calls through api client
- Example: `import { api } from '@/lib/api'; const tasks = await api.getTasks()`
- Type-safe with TypeScript

#### Rules
- No direct fetch() calls - use api client
- No style objects - use Tailwind
- Components are composable and reusable

### VI. Backend Code Standards

#### Project Structure
- `main.py` - FastAPI app entry point
- `models.py` - SQLModel database models
- `routes/` - API route handlers organized by feature
- `db.py` - Database connection and session management

#### API Conventions
- **Prefix**: All routes under `/api/`
- **Responses**: JSON only
- **Models**: Pydantic/SQLModel for request/response validation
- **Errors**: HTTPException with appropriate status codes
- **Status Codes**: Follow REST conventions (200, 201, 400, 401, 404, 500)

#### Database Patterns
- SQLModel for all database operations
- Type annotations on all models
- Foreign keys for relationships
- Indexes on frequently queried columns
- Migrations managed through Alembic

#### Authentication
- Better Auth handles user creation and session management
- All protected routes require JWT token in `Authorization: Bearer <token>` header
- user_id comes from authenticated context

### VII. Phases and Features

**Phase 1 - Console** (Foundation)
- Task CRUD operations only
- Core data model and API

**Phase 2 - Web** (Current)
- Task CRUD + Web UI with Next.js
- User authentication with Better Auth
- Task filtering and sorting
- Responsive design

**Phase 3 - Chatbot** (Future)
- AI chatbot assistant
- Natural language task creation
- Task recommendations

### VIII. Development Workflow

#### Requesting Implementation
```
@specs/features/task-crud.md implement create task feature
@specs/api/rest-endpoints.md implement GET /api/tasks endpoint
@specs/database/schema.md add field to tasks table
```

#### Implementation Steps
1. **Read spec** - Understand requirements
2. **Implement backend** - FastAPI route + SQLModel
3. **Implement frontend** - React component + api client call
4. **Test** - Verify against acceptance criteria
5. **Iterate** - Request updates if needed

#### Code Review Checklist
- ✅ Follows spec exactly
- ✅ Spec references in code comments
- ✅ Type annotations present
- ✅ No hardcoded values
- ✅ Error handling implemented
- ✅ Tests written (if applicable)

### IX. Database Design Principles

#### Tables
- Simple, focused schema
- Use integer primary keys for tasks
- String primary keys for users (from Better Auth)
- Foreign keys for relationships
- Timestamps for auditing (created_at, updated_at)

#### Indexing
- Index foreign keys (user_id)
- Index frequently filtered columns (status)
- Index sort columns (created_at)

#### Data Integrity
- NOT NULL constraints on required fields
- UNIQUE constraints on unique fields
- DEFAULT values for common fields
- Foreign key constraints with CASCADE delete where appropriate

### X. API Design Principles

#### Endpoints
- RESTful conventions (GET, POST, PUT, DELETE, PATCH)
- Resource-oriented URLs (`/api/tasks`, `/api/users`)
- Clear separation of concerns

#### Request/Response
- Consistent JSON structure
- Type-safe with Pydantic models
- Clear error messages
- Proper HTTP status codes

#### Authentication
- JWT tokens in Authorization header
- Tokens from Better Auth
- Automatic user context injection

### XI. Code Quality Standards

#### Type Safety
- TypeScript (frontend) - strict mode
- Python type hints (backend) - all functions and classes
- Pydantic models for validation

#### Naming Conventions
- **Frontend**: camelCase for variables/functions, PascalCase for components
- **Backend**: snake_case for variables/functions, PascalCase for classes
- **Database**: snake_case for columns and tables

#### Comments
- Comment "why", not "what"
- Reference specs with `See @specs/...`
- Comment complex logic only

#### No Over-Engineering
- YAGNI: You aren't gonna need it
- One responsibility per function/component
- Avoid premature abstractions
- Small, focused files

### XII. Environment Management

#### Required Environment Variables
- **Backend**: DATABASE_URL (PostgreSQL connection string)
- **.env.local files** in frontend and backend
- Never commit .env files
- .env.example files for documentation

#### Secrets
- No hardcoded secrets anywhere
- Use environment variables for all credentials
- Better Auth handles API keys internally

### XIII. Testing Strategy

#### Backend
- Unit tests for models and utilities
- Integration tests for routes
- Test database with test fixtures

#### Frontend
- Component tests (React Testing Library)
- API client tests
- End-to-end tests for critical flows

#### Acceptance Criteria
- Every spec has testable acceptance criteria
- Tests verify acceptance criteria are met
- No implementation without tests

### XIV. Documentation Requirements

#### Specs
- Features documented in `/specs/features/`
- API documented in `/specs/api/`
- Database documented in `/specs/database/`
- UI documented in `/specs/ui/`

#### Code
- CLAUDE.md in root, frontend, and backend
- Comments explain non-obvious logic
- API responses have examples in specs

#### README Files
- `/frontend/README.md` - frontend setup and run instructions
- `/backend/README.md` - backend setup and run instructions
- Root `README.md` - project overview and quick start

### XV. Git and Version Control

#### Commit Messages
- Reference spec: "See @specs/features/task-crud.md"
- Clear description of what changed
- Link to issue/feature if applicable

#### Branches
- Feature branches: `feature/feature-name`
- Bug branches: `fix/bug-name`
- Main branch is always deployable

#### Pull Requests
- Link to specs
- Describe changes clearly
- Reference acceptance criteria

### XVI. Deployment and Running

#### Development
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && uvicorn main:app --reload --port 8000

# Both
docker-compose up
```

#### Production
- Frontend: Deploy to Vercel or similar
- Backend: Deploy FastAPI to Render, Railway, or similar
- Database: Use Neon PostgreSQL
- Environment variables in deployment config

### XVII. Governance

**Constitution Authority**:
- This constitution supersedes all other guidelines
- Changes require team consensus
- Amendments documented with ratification date

**Amendments Process**:
1. Propose change with justification
2. Team discussion and feedback
3. Document in constitution with date
4. Update version number (MAJOR.MINOR)

**Compliance**:
- Code reviews verify compliance
- Specs are the source of truth
- No shortcuts or exceptions

---

## Summary

This constitution establishes:
- **Spec-driven development** as the core principle
- **Clear technology choices** (Next.js 14, FastAPI, PostgreSQL)
- **Organized monorepo** with separate frontend/backend
- **Implementation workflow** that starts with specs
- **Code quality standards** for both languages
- **Documentation requirements** at all levels

Teams follow these principles to:
- ✅ Stay aligned with requirements (specs)
- ✅ Maintain code quality and consistency
- ✅ Enable async collaboration
- ✅ Ship features faster with confidence
- ✅ Onboard new developers quickly

---

**Status**: Active
**Last Updated**: 2025-12-08
**Approval**: Team Lead
