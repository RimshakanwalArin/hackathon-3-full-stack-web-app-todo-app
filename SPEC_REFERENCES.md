# Referencing Specs in Claude Code

Use `@specs/` prefix to reference specifications when asking Claude Code to implement features.

## Pattern

```
@specs/{category}/{file}.md [action]
```

## Examples

### Feature Implementation
```
@specs/features/task-crud.md implement the create task feature
```
Claude will:
1. Read the task-crud spec
2. Check user stories and acceptance criteria
3. Implement backend and frontend code
4. Follow the defined requirements

### API Endpoint Implementation
```
@specs/api/rest-endpoints.md implement the GET /api/tasks endpoint
```
Claude will:
1. Find the endpoint definition
2. Check query parameters and response format
3. Implement the FastAPI route
4. Return proper JSON responses

### Database Schema Changes
```
@specs/database/schema.md add due_date field to tasks
```
Claude will:
1. Update the schema definition
2. Create database migration
3. Update SQLModel
4. Update API responses

### Full Stack Feature
```
@specs/features/authentication.md implement Better Auth login
```
Claude will:
1. Read the authentication spec
2. Implement backend authentication with Better Auth
3. Create frontend login form
4. Handle JWT tokens
5. Secure API endpoints

## Spec Categories

- `@specs/features/` - Feature requirements and user stories
- `@specs/api/` - REST API endpoint definitions
- `@specs/database/` - Database schema and models
- `@specs/ui/` - UI components and page layouts
- `@specs/overview.md` - Project overview and tech stack

## Quick Reference

| What You Need | Reference |
|---------------|-----------|
| Feature requirements | `@specs/features/task-crud.md` |
| API endpoint details | `@specs/api/rest-endpoints.md` |
| Database structure | `@specs/database/schema.md` |
| UI/Component specs | `@specs/ui/components.md` or `@specs/ui/pages.md` |
| Project overview | `@specs/overview.md` |

## Benefits

✅ Specs are the source of truth
✅ Claude stays focused on requirements
✅ Implementation follows defined standards
✅ Easy to request specific changes
✅ Clear communication across team

## For Team Members

When asking Claude Code to implement:
1. Always reference the relevant spec with `@specs/`
2. Be specific about what you want (feature, endpoint, schema)
3. Claude will follow the spec exactly
4. If requirements change, update the spec first, then re-reference

Example:
```
User: @specs/features/task-crud.md I need to add priority field to Create Task

Claude will:
- Read the feature spec
- Check if priority is mentioned
- Update the spec if needed
- Implement with the new field
```
