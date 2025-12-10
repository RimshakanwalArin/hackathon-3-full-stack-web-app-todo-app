# MCP Tools Specification

## Overview
MCP (Model Context Protocol) tools expose task management functionality for LLM integration. These tools enable AI assistants and external services to interact with the todo app.

---

## Tool: create_task

### Purpose
Create a new task for a user

### Parameters
- `user_id` (string, required) - User identifier
- `title` (string, required) - Task title
- `description` (string, optional) - Task description

### Returns
- `task_id` (integer) - Unique task identifier
- `status` (string) - Task status ("created")
- `title` (string) - Task title

### Example Input
```json
{
  "user_id": "ziakhan",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Example Output
```json
{
  "task_id": 5,
  "status": "created",
  "title": "Buy groceries"
}
```

### Error Cases
- Missing user_id → 400 Bad Request
- Missing title → 400 Bad Request
- Title too long → 400 Bad Request
- User not found → 404 Not Found

---

## Tool: list_tasks

### Purpose
Retrieve tasks for a user with optional filtering

### Parameters
- `user_id` (string, required) - User identifier
- `status` (string, optional) - Filter by status: "all", "pending", "completed" (default: "all")

### Returns
Array of task objects:
- `id` (integer) - Task identifier
- `title` (string) - Task title
- `description` (string) - Task description
- `completed` (boolean) - Completion status
- `created_at` (string) - ISO timestamp

### Example Input
```json
{
  "user_id": "ziakhan",
  "status": "pending"
}
```

### Example Output
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2025-12-08T10:30:00Z"
  },
  {
    "id": 2,
    "title": "Call mom",
    "description": null,
    "completed": false,
    "created_at": "2025-12-08T11:00:00Z"
  }
]
```

### Error Cases
- Missing user_id → 400 Bad Request
- Invalid status → 400 Bad Request
- User not found → 404 Not Found

---

## Tool: complete_task

### Purpose
Mark a task as complete

### Parameters
- `user_id` (string, required) - User identifier
- `task_id` (integer, required) - Task identifier

### Returns
- `task_id` (integer) - Task identifier
- `status` (string) - Task status ("completed")
- `title` (string) - Task title

### Example Input
```json
{
  "user_id": "ziakhan",
  "task_id": 3
}
```

### Example Output
```json
{
  "task_id": 3,
  "status": "completed",
  "title": "Call mom"
}
```

### Error Cases
- Missing user_id → 400 Bad Request
- Missing task_id → 400 Bad Request
- Task not found → 404 Not Found
- Unauthorized (task belongs to different user) → 403 Forbidden

---

## Tool: delete_task

### Purpose
Remove a task from the list

### Parameters
- `user_id` (string, required) - User identifier
- `task_id` (integer, required) - Task identifier

### Returns
- `task_id` (integer) - Task identifier
- `status` (string) - Deletion status ("deleted")
- `title` (string) - Task title

### Example Input
```json
{
  "user_id": "ziakhan",
  "task_id": 5
}
```

### Example Output
```json
{
  "task_id": 5,
  "status": "deleted",
  "title": "Buy groceries"
}
```

### Error Cases
- Missing user_id → 400 Bad Request
- Missing task_id → 400 Bad Request
- Task not found → 404 Not Found
- Unauthorized (task belongs to different user) → 403 Forbidden

---

## Integration with Backend API

All MCP tools map to REST API endpoints:

| Tool | HTTP Method | Endpoint | Route |
|------|-------------|----------|-------|
| create_task | POST | /api/tasks | @specs/api/rest-endpoints.md |
| list_tasks | GET | /api/tasks | @specs/api/rest-endpoints.md |
| complete_task | PATCH | /api/tasks/{task_id}/complete | (future endpoint) |
| delete_task | DELETE | /api/tasks/{task_id} | (future endpoint) |

---

## Authentication
All tools require user authentication:
- JWT token passed in `Authorization: Bearer <token>` header
- user_id extracted from token claims
- All operations scoped to authenticated user

---

## Rate Limits
- create_task: 20 requests/minute per user
- list_tasks: 30 requests/minute per user
- complete_task: 20 requests/minute per user
- delete_task: 20 requests/minute per user

---

## Implementation Notes

### Frontend (Next.js)
Tools are called through the centralized API client:
```typescript
import { api } from '@/lib/api'

// Create task
const newTask = await api.createTask({
  title: "Buy groceries",
  description: "Milk, eggs, bread"
})

// List tasks
const tasks = await api.listTasks({ status: "pending" })

// Complete task
const completed = await api.completeTask(taskId)

// Delete task
const deleted = await api.deleteTask(taskId)
```

### Backend (FastAPI)
Tools are implemented as FastAPI routes:
```python
from fastapi import APIRouter
from models import Task

router = APIRouter(prefix="/api")

@router.post("/tasks")
async def create_task(user_id: str, title: str, description: str = None):
    # Implementation

@router.get("/tasks")
async def list_tasks(user_id: str, status: str = "all"):
    # Implementation

@router.patch("/tasks/{task_id}/complete")
async def complete_task(user_id: str, task_id: int):
    # Implementation

@router.delete("/tasks/{task_id}")
async def delete_task(user_id: str, task_id: int):
    # Implementation
```

---

**Version**: 1.0
**Last Updated**: 2025-12-08
**Status**: Ready for Implementation
