# Folder Structure Overview

## Complete Directory Layout

```
hackathon-3-full-stack-web-app-todo-app/
│
├── 📋 SPECIFICATIONS & DOCUMENTATION
│   ├── specs/                          (⭐ START HERE - All project specifications)
│   │   ├── README.md                   (Guide to specifications)
│   │   ├── overview.md                 (Project vision, scope, features)
│   │   ├── architecture.md             (System design, data flow diagram)
│   │   │
│   │   ├── features/                   (Feature specifications)
│   │   │   ├── task-crud.md            (Create, read, update, delete tasks)
│   │   │   ├── authentication.md       (User registration, login, JWT)
│   │   │   └── chatbot.md              (AI assistant, MCP tools)
│   │   │
│   │   ├── api/                        (API specifications)
│   │   │   ├── rest-endpoints.md       (HTTP endpoints, request/response)
│   │   │   └── mcp-tools.md            (LLM integration tools)
│   │   │
│   │   ├── database/                   (Data layer)
│   │   │   └── schema.md               (PostgreSQL tables, indexes, queries)
│   │   │
│   │   └── ui/                         (Frontend specifications)
│   │       ├── components.md           (Reusable React components)
│   │       └── pages.md                (Page layouts, user flows)
│   │
│   ├── CLAUDE.md                       (Development rules & SDD conventions)
│   ├── GETTING_STARTED.md              (Quick start guide)
│   ├── PROJECT_STRUCTURE.txt           (Detailed folder explanation)
│   ├── FOLDER_STRUCTURE.md             (This file)
│   ├── README.md                       (Project README)
│   └── .spec-kit/
│       └── config.yaml                 (Spec-Kit configuration)
│
├── 🎨 FRONTEND APPLICATION
│   ├── frontend/                       (Next.js frontend - to be developed)
│   │   ├── CLAUDE.md                   (Frontend-specific instructions)
│   │   ├── app/                        (Next.js App Router)
│   │   │   ├── layout.tsx              (Root layout)
│   │   │   ├── page.tsx                (Home page)
│   │   │   ├── (auth)/                 (Auth routes: login, register)
│   │   │   ├── (dashboard)/            (Dashboard routes)
│   │   │   └── api/                    (API routes)
│   │   │
│   │   ├── components/                 (React components)
│   │   │   ├── atoms/                  (Basic components: Button, Input)
│   │   │   ├── molecules/              (Compound components: TaskForm)
│   │   │   ├── organisms/              (Feature components: TaskList)
│   │   │   └── layouts/                (Layout components: Header, Sidebar)
│   │   │
│   │   ├── public/                     (Static assets: images, icons)
│   │   ├── styles/                     (CSS and styling)
│   │   ├── hooks/                      (Custom React hooks)
│   │   ├── utils/                      (Utility functions)
│   │   ├── types/                      (TypeScript type definitions)
│   │   ├── services/                   (Business logic services)
│   │   │
│   │   ├── package.json                (Frontend dependencies)
│   │   ├── tsconfig.json               (TypeScript config)
│   │   └── next.config.ts              (Next.js config)
│   │
│   └── app/                            (Original Next.js app - to be refactored)
│       ├── layout.tsx
│       └── page.tsx
│
├── ⚙️ CONFIGURATION & TOOLS
│   ├── .specify/                       (Spec-Driven Development framework)
│   │   ├── memory/
│   │   │   └── constitution.md         (Project principles & standards)
│   │   │
│   │   ├── templates/                  (SDD templates)
│   │   │   ├── spec-template.md        (Specification template)
│   │   │   ├── plan-template.md        (Implementation plan template)
│   │   │   ├── tasks-template.md       (Task list template)
│   │   │   ├── adr-template.md         (Architecture Decision Record)
│   │   │   ├── phr-template.prompt.md  (Prompt History Record)
│   │   │   └── ...
│   │   │
│   │   └── scripts/bash/               (Helper scripts)
│   │       ├── create-phr.sh           (Create PHR)
│   │       ├── create-adr.sh           (Create ADR)
│   │       ├── create-new-feature.sh   (Create feature spec)
│   │       └── ...
│   │
│   ├── .claude/                        (Claude Code configuration)
│   │   └── commands/                   (Custom slash commands)
│   │
│   ├── .git/                           (Git repository)
│   ├── .gitignore                      (Git ignore rules)
│   │
│   ├── package.json                    (Root dependencies)
│   ├── package-lock.json               (Dependency lock file)
│   │
│   ├── tsconfig.json                   (Root TypeScript config)
│   ├── next.config.ts                  (Next.js configuration)
│   ├── eslint.config.mjs               (ESLint configuration)
│   ├── postcss.config.mjs              (PostCSS configuration)
│   ├── tailwind.config.js              (Tailwind CSS configuration)
│   └── .env.example                    (Environment variables template)
│
├── 📚 DEVELOPMENT HISTORY (to be created)
│   └── history/
│       ├── prompts/                    (Prompt History Records)
│       │   ├── constitution/           (Constitution-related PHRs)
│       │   ├── general/                (General/misc PHRs)
│       │   ├── task-crud/              (Task CRUD feature PHRs)
│       │   ├── authentication/         (Auth feature PHRs)
│       │   └── chatbot/                (Chatbot feature PHRs)
│       │
│       └── adr/                        (Architecture Decision Records)
│           ├── 001-framework-choice.md
│           ├── 002-auth-strategy.md
│           └── ...
│
└── 📂 OTHER DIRECTORIES
    ├── public/                         (Static assets)
    ├── node_modules/                   (Installed dependencies)
    └── .next/                          (Next.js build output)
```

## File Counts by Directory

| Directory | Files | Size | Purpose |
|-----------|-------|------|---------|
| specs/ | 11 | 100KB | **All specifications** |
| .specify/ | 15+ | - | SDD framework & templates |
| frontend/ | TBD | - | React/Next.js app (to be developed) |
| app/ | 2 | - | Original Next.js files |
| .spec-kit/ | 1 | 1KB | Spec-Kit config |
| Root | 10+ | - | Config, docs, package files |

## Specification Files (11 files, 100KB)

### Core Specifications (3 files)
- `overview.md` - Project vision and scope
- `architecture.md` - System design and data flow
- `README.md` - Specifications guide

### Feature Specifications (3 files)
- `features/task-crud.md` - Task management
- `features/authentication.md` - User auth
- `features/chatbot.md` - AI assistant

### Implementation Specifications (5 files)
- `api/rest-endpoints.md` - HTTP API
- `api/mcp-tools.md` - LLM integration
- `database/schema.md` - Database design
- `ui/components.md` - React components
- `ui/pages.md` - Page layouts

## Quick Reference

### Documentation Files
```
CLAUDE.md              ← Development rules and conventions
GETTING_STARTED.md     ← Quick start guide (START HERE)
PROJECT_STRUCTURE.txt  ← Detailed folder explanation
FOLDER_STRUCTURE.md    ← This file
README.md              ← Project README
```

### Specification Files
```
specs/overview.md              ← Read first: Project overview
specs/architecture.md          ← Read second: System architecture

specs/features/task-crud.md    ← Task management features
specs/features/authentication.md ← User authentication
specs/features/chatbot.md      ← AI chatbot assistant

specs/api/rest-endpoints.md    ← REST API specification
specs/api/mcp-tools.md         ← MCP tools for LLMs

specs/database/schema.md       ← PostgreSQL schema
specs/ui/components.md         ← React components
specs/ui/pages.md              ← Page layouts
```

### Configuration Files
```
.spec-kit/config.yaml          ← Spec-Kit configuration
package.json                   ← Node.js dependencies
tsconfig.json                  ← TypeScript configuration
next.config.ts                 ← Next.js configuration
.env.example                   ← Environment variables template
```

## How to Navigate

### If you want to...

**Understand the project**
→ Read specs/overview.md and specs/architecture.md

**Implement a feature**
→ Read specs/features/{feature}.md

**Build API endpoints**
→ Check specs/api/rest-endpoints.md

**Design database**
→ Review specs/database/schema.md

**Build UI components**
→ Follow specs/ui/components.md

**Create pages**
→ Use specs/ui/pages.md as guide

**Integrate LLMs**
→ See specs/api/mcp-tools.md

**Get started quickly**
→ Read GETTING_STARTED.md

**Follow development standards**
→ Check CLAUDE.md

## Directory Size Estimates

| Directory | Estimated Size |
|-----------|-----------------|
| specs/ | 100 KB |
| .specify/ | 50 KB |
| frontend/ | TBD (to be developed) |
| node_modules/ | 500+ MB |
| .next/ | 200+ MB (build output) |
| Total (with deps) | 700+ MB |

## Next Steps

1. **Read** GETTING_STARTED.md for quick start
2. **Review** specs/overview.md for project vision
3. **Study** specs/architecture.md for system design
4. **Check** appropriate feature spec for implementation
5. **Follow** CLAUDE.md for development rules

---

**Version**: 0.1.0
**Last Updated**: 2025-12-08
