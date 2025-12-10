# Specification: Task Management Tools

## Overview

This specification defines the behavior, parameters, inputs, and outputs for a simple Task Management system consisting of the following tools:

* `create_task`
* `list_tasks`
* `complete_task`
* `delete_task`
* `update_task`

Each tool enables users to manage tasks through defined parameters and returns structured JSON responses.

---

## 1. create_task

**Purpose:** Create a new task.

### Parameters

* **user_id** (string, required) - Unique identifier for the user
* **title** (string, required) - Task title (1-200 characters)
* **description** (string, optional) - Task description (max 1000 characters)

### Returns

* **task_id** (integer) - Unique task identifier
* **status** (string: "created") - Indicates successful creation
* **title** (string) - The task title

### Example Input

```json
{"user_id": "ziakhan", "title": "Buy groceries", "description": "Milk, eggs, bread"}
```

### Example Output

```json
{"task_id": 5, "status": "created", "title": "Buy groceries"}
```

### Error Cases

- Missing user_id → 400 Bad Request
- Missing title → 400 Bad Request
- Title too long → 400 Bad Request
- User not found → 404 Not Found

---

## 2. list_tasks

**Purpose:** Retrieve tasks from the list.

### Parameters

* **user_id** (string, required) - Unique identifier for the user
* **status** (string, optional) - Filter by status: "all" (default), "pending", "completed"

### Returns

* **Array of task objects** with the following fields:
  * **id** (integer) - Task identifier
  * **title** (string) - Task title
  * **description** (string, nullable) - Task description
  * **completed** (boolean) - Completion status
  * **created_at** (string) - ISO 8601 timestamp

### Example Input

```json
{"user_id": "ziakhan", "status": "pending"}
```

### Example Output

```json
[
  {"id": 1, "title": "Buy groceries", "description": "Milk, eggs, bread", "completed": false, "created_at": "2025-12-08T10:30:00Z"},
  {"id": 2, "title": "Call dentist", "description": null, "completed": false, "created_at": "2025-12-08T11:00:00Z"}
]
```

### Error Cases

- Missing user_id → 400 Bad Request
- Invalid status → 400 Bad Request
- User not found → 404 Not Found

---

## 3. complete_task

**Purpose:** Mark a task as complete.

### Parameters

* **user_id** (string, required) - Unique identifier for the user
* **task_id** (integer, required) - Task identifier to mark complete

### Returns

* **task_id** (integer) - Task identifier
* **status** (string: "completed") - Indicates successful completion
* **title** (string) - Task title

### Example Input

```json
{"user_id": "ziakhan", "task_id": 3}
```

### Example Output

```json
{"task_id": 3, "status": "completed", "title": "Call mom"}
```

### Error Cases

- Missing user_id → 400 Bad Request
- Missing task_id → 400 Bad Request
- Task not found → 404 Not Found
- Unauthorized (task belongs to different user) → 403 Forbidden

---

## 4. delete_task

**Purpose:** Remove a task from the list.

### Parameters

* **user_id** (string, required) - Unique identifier for the user
* **task_id** (integer, required) - Task identifier to delete

### Returns

* **task_id** (integer) - Task identifier
* **status** (string: "deleted") - Indicates successful deletion
* **title** (string) - Task title

### Example Input

```json
{"user_id": "ziakhan", "task_id": 2}
```

### Example Output

```json
{"task_id": 2, "status": "deleted", "title": "Email John"}
```

### Error Cases

- Missing user_id → 400 Bad Request
- Missing task_id → 400 Bad Request
- Task not found → 404 Not Found
- Unauthorized (task belongs to different user) → 403 Forbidden

---

## 5. update_task

**Purpose:** Update an existing task.

### Parameters

* **user_id** (string, required) - Unique identifier for the user
* **task_id** (integer, required) - Task identifier to update
* **title** (string, optional) - Updated task title (1-200 characters)
* **description** (string, optional) - Updated task description (max 1000 characters)
* **completed** (boolean, optional) - Update completion status

### Returns

* **task_id** (integer) - Task identifier
* **status** (string: "updated") - Indicates successful update
* **title** (string) - Updated task title
* **completed** (boolean) - Updated completion status

### Example Input

```json
{
  "user_id": "ziakhan",
  "task_id": 5,
  "title": "Buy groceries and cook dinner",
  "description": "Milk, eggs, bread, and vegetables",
  "completed": false
}
```

### Example Output

```json
{
  "task_id": 5,
  "status": "updated",
  "title": "Buy groceries and cook dinner",
  "completed": false
}
```

### Error Cases

- Missing user_id → 400 Bad Request
- Missing task_id → 400 Bad Request
- Task not found → 404 Not Found
- Unauthorized (task belongs to different user) → 403 Forbidden
- Title too long → 400 Bad Request

---

## Tool Integration

### Authentication

All tools require user authentication:
- JWT token passed in `Authorization: Bearer <token>` header
- user_id extracted from authenticated context
- All operations scoped to authenticated user
- Cross-user access prevented with 403 Forbidden

### Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": { /* tool-specific response data */ },
  "timestamp": "2025-12-08T10:30:00Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  },
  "timestamp": "2025-12-08T10:30:00Z"
}
```

### Rate Limiting

- create_task: 20 requests/minute per user
- list_tasks: 30 requests/minute per user
- complete_task: 20 requests/minute per user
- delete_task: 20 requests/minute per user
- update_task: 20 requests/minute per user

Response headers:
- `X-RateLimit-Limit: 20`
- `X-RateLimit-Remaining: 15`
- `X-RateLimit-Reset: 1700000000`

---

## Data Model

### Task Object

```typescript
interface Task {
  id: integer
  user_id: string
  title: string
  description: string | null
  completed: boolean
  created_at: string (ISO 8601)
  updated_at: string (ISO 8601)
}
```

### Request Validation Rules

1. **user_id**: Non-empty string, max 255 characters
2. **title**: Required for create/update, 1-200 characters
3. **description**: Optional, max 1000 characters
4. **task_id**: Positive integer
5. **completed**: Boolean value only

### Response Status Values

- `"created"` - Task successfully created
- `"completed"` - Task marked as complete
- `"deleted"` - Task successfully deleted
- `"updated"` - Task successfully updated
- `"pending"` - Task is not yet completed
- `"error"` - Operation failed

---

## Implementation Notes

### Backend (FastAPI)

All tools are implemented as FastAPI endpoints:

```python
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer
from models import Task

router = APIRouter(prefix="/api")

@router.post("/tasks")
async def create_task(user_id: str, title: str, description: str = None):
    """Create a new task"""
    # Implementation

@router.get("/tasks")
async def list_tasks(user_id: str, status: str = "all"):
    """List tasks with optional filtering"""
    # Implementation

@router.patch("/tasks/{task_id}/complete")
async def complete_task(user_id: str, task_id: int):
    """Mark task as complete"""
    # Implementation

@router.delete("/tasks/{task_id}")
async def delete_task(user_id: str, task_id: int):
    """Delete a task"""
    # Implementation

@router.put("/tasks/{task_id}")
async def update_task(user_id: str, task_id: int, **updates):
    """Update a task"""
    # Implementation
```

### Frontend (TypeScript)

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

// Update task
const updated = await api.updateTask(taskId, {
  title: "New title",
  description: "New description"
})
```

---

## Acceptance Criteria

- ✅ All 5 tools are implemented and functional
- ✅ Authentication and authorization enforced on all operations
- ✅ User isolation: users can only see/modify their own tasks
- ✅ Input validation on all parameters
- ✅ Proper HTTP status codes returned
- ✅ Rate limiting implemented per tool
- ✅ Consistent error messages across all tools
- ✅ Timestamps in ISO 8601 format
- ✅ Database properly indexes user_id and task id
- ✅ Tools integrate with REST API endpoints

---

## Test Scenarios

### Scenario 1: Create and List Tasks
1. User creates task "Buy groceries"
2. User lists all tasks → Should see created task
3. User creates task "Call dentist"
4. User lists pending tasks → Should see both tasks
5. User marks task 1 as complete
6. User lists pending tasks → Should see only task 2
7. User lists all tasks → Should see both tasks

### Scenario 2: Update Task
1. User creates task with title "Shopping"
2. User updates title to "Grocery Shopping"
3. User lists tasks → Should see updated title
4. User updates completed to true
5. User lists pending tasks → Task should not appear

### Scenario 3: Delete Task
1. User creates task "Temporary task"
2. User deletes the task
3. User lists all tasks → Task should not appear
4. Attempt to delete non-existent task → 404 Not Found

### Scenario 4: Authorization
1. User A creates task
2. User B attempts to complete User A's task → 403 Forbidden
3. User B attempts to delete User A's task → 403 Forbidden

---

**Version**: 1.0
**Last Updated**: 2025-12-08
**Status**: Ready for Implementation
**Implementation Target**: @specs/tasks.md (T033-T056)
