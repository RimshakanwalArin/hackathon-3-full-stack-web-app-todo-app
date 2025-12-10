# Getting Started - Hackathon Todo App

Welcome! This document will help you understand the project structure and start development.

## Project Overview

This is a **full-stack todo application** featuring:
- ✅ Task management (CRUD operations)
- ✅ User authentication (registration, login, JWT)
- ✅ AI chatbot assistant with MCP tools
- ✅ REST API with comprehensive endpoints
- ✅ PostgreSQL database with optimized schema
- ✅ Modern React UI with Tailwind CSS

**Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS, PostgreSQL

## Quick Start

### 1. Understand the Project Structure

The project follows a **Spec-Driven Development (SDD)** approach with three main directories:

```
/specs              → Complete specifications (READ FIRST)
/frontend           → React/Next.js application
/.specify           → SDD framework and templates
```

### 2. Read the Specifications

Start with these documents in this order:

#### Phase 1: Vision & Architecture (15 min)
1. **`specs/overview.md`** - Project vision, scope, and features
2. **`specs/architecture.md`** - System design and data flow

#### Phase 2: Features (20 min)
1. **`specs/features/task-crud.md`** - Task management implementation
2. **`specs/features/authentication.md`** - User auth system
3. **`specs/features/chatbot.md`** - AI chatbot capabilities

#### Phase 3: Implementation Details (20 min)
1. **`specs/api/rest-endpoints.md`** - HTTP API endpoints
2. **`specs/database/schema.md`** - Database structure
3. **`specs/ui/components.md`** - React component library
4. **`specs/ui/pages.md`** - Page layouts and flows

#### Phase 4: Integration (10 min)
1. **`specs/api/mcp-tools.md`** - MCP tool definitions

**Total Time**: ~65 minutes for complete understanding

### 3. Project Layout

```
hackathon-3-full-stack-web-app-todo-app/
├── specs/                    ← START HERE (all specifications)
│   ├── overview.md          (Project vision)
│   ├── architecture.md       (System design)
│   ├── features/            (Feature specifications)
│   ├── api/                 (API specifications)
│   ├── database/            (Database schema)
│   └── ui/                  (UI/UX specifications)
│
├── frontend/                ← Frontend code (to be developed)
│   ├── app/                 (Next.js app router)
│   ├── components/          (React components)
│   └── public/              (Static assets)
│
├── .spec-kit/               ← Spec-Kit configuration
│   └── config.yaml
│
├── .specify/                ← SDD framework
│   ├── memory/constitution.md
│   ├── templates/           (Spec templates)
│   └── scripts/             (Helper scripts)
│
├── CLAUDE.md                ← Development rules
├── package.json             ← Dependencies
└── PROJECT_STRUCTURE.txt    ← Detailed folder guide
```

## Key Files to Read First

### 1. specs/README.md
Overview of all specifications and how to use them.

### 2. specs/overview.md
**What**: Project vision, scope, and success metrics
**Why**: Understand what we're building and why

### 3. specs/architecture.md
**What**: System architecture, layers, and data flow
**Why**: Understand how components interact

### 4. CLAUDE.md
**What**: Development rules and SDD conventions
**Why**: Follow project standards and conventions

## Development Workflow

### For New Features

1. **Read the spec** (`specs/features/*.md`)
   - Understand user stories and acceptance criteria
   - Review error handling and edge cases

2. **Check API spec** (`specs/api/rest-endpoints.md`)
   - See endpoint definitions
   - Understand request/response formats

3. **Review database schema** (`specs/database/schema.md`)
   - Understand data models
   - Check indexes and constraints

4. **Look at UI spec** (`specs/ui/components.md` and `specs/ui/pages.md`)
   - Understand component structure
   - Review page layouts

5. **Implement** (following spec exactly)
   - Create components
   - Build API routes
   - Migrate/seed database

6. **Test** (against acceptance criteria)
   - Unit tests for components
   - Integration tests for API
   - Manual testing on pages

## Development Rules

From `CLAUDE.md`:

✅ **DO**:
- Read specifications before coding
- Cite spec references in code comments
- Follow SDD principles
- Create small, testable changes
- Use precise code references in commits

❌ **DON'T**:
- Invent APIs or data structures
- Hardcode secrets/tokens
- Refactor unrelated code
- Add unnecessary complexity
- Skip specification review

## Important Directories

### specs/ (100KB - 11 files)
Complete specification for every aspect of the application.

**Key files**:
- `overview.md` - Project scope
- `architecture.md` - System design
- `features/` - Feature details
- `api/` - REST and MCP endpoints
- `database/` - Schema definitions
- `ui/` - Component and page designs

### .spec-kit/
Configuration for Spec-Kit tooling.

### .specify/
Spec-Driven Development framework from Anthropic.

**Contains**:
- Constitution template (`memory/constitution.md`)
- Spec templates (`templates/`)
- Helper scripts (`scripts/`)

## Next Steps

### Immediate (Now)
- [ ] Read this file
- [ ] Read `specs/overview.md`
- [ ] Read `specs/architecture.md`

### Short Term (Today)
- [ ] Review all feature specs
- [ ] Review API specifications
- [ ] Understand database schema

### Medium Term (This Week)
- [ ] Set up development environment
- [ ] Create initial API routes
- [ ] Build basic UI components
- [ ] Set up database

### Long Term (Ongoing)
- [ ] Implement features per specification
- [ ] Write tests for each feature
- [ ] Create PHRs and ADRs for decisions
- [ ] Update specs as needed

## Running the Project

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for backend)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
npm run test     # Run tests
```

## Understanding the Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────┐
│  Frontend (Next.js + React)         │  UI, Components, Pages
├─────────────────────────────────────┤
│  API Layer (Next.js Routes)         │  Endpoints, Middleware
├─────────────────────────────────────┤
│  Business Logic (Services)          │  Domain logic, validation
├─────────────────────────────────────┤
│  Database Layer (PostgreSQL)        │  Data persistence
└─────────────────────────────────────┘
```

### Data Flow

1. **User Action** → UI component captures input
2. **API Request** → Sends HTTP request to `/api/*`
3. **Middleware** → Validates and authenticates
4. **Service** → Executes business logic
5. **Database** → Persists or retrieves data
6. **Response** → Returns JSON to client
7. **UI Update** → Component re-renders

## Key Concepts

### MCP Tools
Model Context Protocol tools expose task management functionality for LLM integration. See `specs/api/mcp-tools.md`.

### Authentication
JWT-based authentication with refresh tokens. See `specs/features/authentication.md`.

### Task Management
Full CRUD operations for tasks with filtering and sorting. See `specs/features/task-crud.md`.

### Chatbot
AI-powered assistant that helps create and manage tasks. See `specs/features/chatbot.md`.

## Common Questions

### Q: Where do I find API endpoint definitions?
**A**: `specs/api/rest-endpoints.md` - complete HTTP API specification

### Q: What's the database schema?
**A**: `specs/database/schema.md` - PostgreSQL tables, columns, indexes

### Q: How should I structure React components?
**A**: `specs/ui/components.md` - component hierarchy and design

### Q: What pages need to be built?
**A**: `specs/ui/pages.md` - complete page specifications with layouts

### Q: How do I authenticate users?
**A**: `specs/features/authentication.md` - registration, login, JWT flows

## Learning Resources

### Specifications
- `PROJECT_STRUCTURE.txt` - Detailed folder guide
- `specs/README.md` - Specifications guide
- `CLAUDE.md` - Development rules and conventions

### Technologies
- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## Getting Help

### Check the Specs
Most questions are answered in the specifications. Use the quick links in `PROJECT_STRUCTURE.txt`.

### Understand Spec Structure
- Each spec file has user stories, technical details, error handling
- Use code references (file:line) to navigate quickly
- All acceptance criteria are testable

### Follow Conventions
Review `CLAUDE.md` for development standards and SDD principles.

## Commit and PR Guidelines

### Before Committing
1. ✅ Code follows spec exactly
2. ✅ Tests pass
3. ✅ ESLint passes
4. ✅ Reference spec in commit message

### Commit Message Format
```
feat: Add task creation endpoint (specs/features/task-crud.md:US-001)

- Implement POST /api/tasks endpoint
- Add input validation per spec
- Create task record in database

See specs/features/task-crud.md for details
```

### Before Creating PR
1. ✅ All tests passing
2. ✅ No ESLint errors
3. ✅ Code reviewed against specs
4. ✅ PR description references specs

## Success Metrics

Project is complete when:
- ✅ All feature specs implemented
- ✅ All API endpoints working
- ✅ Database schema created
- ✅ All UI pages built
- ✅ Tests passing
- ✅ MCP tools integrated

---

**Ready to start?** Begin with `specs/overview.md` and work through the reading list above.

**Last Updated**: 2025-12-08
**Version**: 0.1.0
