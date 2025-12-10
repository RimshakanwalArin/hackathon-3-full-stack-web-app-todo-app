# Feature: AI Chatbot Assistant

## Overview
An AI-powered chatbot that helps users manage tasks through natural language interaction and provides intelligent recommendations.

## User Stories

### US-001: Chat with Chatbot
**As a** user
**I want to** chat with an AI assistant
**So that** I can get help managing my tasks

**Acceptance Criteria:**
- [ ] Chat interface available on dashboard
- [ ] User can type messages and send them
- [ ] Chatbot responds with contextual answers
- [ ] Chat history visible in the conversation
- [ ] Ability to clear chat history

**Technical Details:**
```
POST /api/chatbot/chat
{
  "message": "Create a task for grocery shopping tomorrow",
  "userId": "user-123"
}

Response (200):
{
  "id": "chat-456",
  "response": "I've created a task 'Grocery shopping' for you with a due date of tomorrow.",
  "suggestedActions": [
    {
      "type": "create_task",
      "data": {
        "title": "Grocery shopping",
        "dueDate": "2025-12-09"
      }
    }
  ]
}
```

### US-002: Task Recommendations
**As a** user
**I want to** receive task recommendations
**So that** I can discover tasks I might have forgotten

**Acceptance Criteria:**
- [ ] Chatbot analyzes user's task history
- [ ] Provides recommendations based on patterns
- [ ] Can suggest new tasks based on context
- [ ] Recommendations are actionable (can create with one click)

**Technical Details:**
```
GET /api/chatbot/recommendations
Authorization: Bearer {accessToken}

Response (200):
{
  "recommendations": [
    {
      "id": "rec-1",
      "type": "overdue_task",
      "message": "You have 3 overdue tasks. Would you like me to help you prioritize?",
      "taskIds": ["task-101", "task-102", "task-103"]
    },
    {
      "id": "rec-2",
      "type": "suggested_task",
      "message": "Based on your patterns, you usually check emails on Monday mornings.",
      "suggestedTask": {
        "title": "Check emails",
        "priority": "high"
      }
    }
  ]
}
```

### US-003: Smart Task Creation
**As a** user
**I want to** create tasks using natural language
**So that** task creation is faster and more intuitive

**Acceptance Criteria:**
- [ ] User can describe task in natural language
- [ ] Chatbot extracts: title, due date, priority, category
- [ ] Extracted data is previewed before creation
- [ ] User can confirm or adjust before saving

**Technical Details:**
```
POST /api/chatbot/parse-task
{
  "input": "Buy milk and bread by Friday morning, urgent"
}

Response (200):
{
  "parsedTask": {
    "title": "Buy milk and bread",
    "dueDate": "2025-12-12",
    "dueTime": "09:00",
    "priority": "urgent"
  },
  "confidence": 0.95
}
```

## MCP Tools

The chatbot exposes the following MCP tools for external LLM integration:

### Tool: create-task
Creates a new task
```json
{
  "name": "create-task",
  "description": "Creates a new task for the user",
  "inputSchema": {
    "type": "object",
    "properties": {
      "title": { "type": "string" },
      "description": { "type": "string" },
      "priority": { "enum": ["low", "medium", "high", "urgent"] },
      "dueDate": { "type": "string", "format": "date" },
      "category": { "type": "string" }
    },
    "required": ["title"]
  }
}
```

### Tool: list-tasks
Lists user's tasks with filters
```json
{
  "name": "list-tasks",
  "description": "Lists user's tasks with optional filters",
  "inputSchema": {
    "type": "object",
    "properties": {
      "status": { "enum": ["pending", "in_progress", "completed"] },
      "priority": { "enum": ["low", "medium", "high", "urgent"] },
      "limit": { "type": "integer", "default": 10 }
    }
  }
}
```

### Tool: update-task
Updates an existing task
```json
{
  "name": "update-task",
  "description": "Updates a task's properties",
  "inputSchema": {
    "type": "object",
    "properties": {
      "taskId": { "type": "string" },
      "status": { "enum": ["pending", "in_progress", "completed"] },
      "priority": { "enum": ["low", "medium", "high", "urgent"] },
      "dueDate": { "type": "string", "format": "date" }
    },
    "required": ["taskId"]
  }
}
```

## AI Capabilities

### Context Understanding
- Maintains conversation history
- Understands user intent from natural language
- Learns user patterns and preferences

### Task Intelligence
- Extracts entities (dates, times, priorities) from user input
- Suggests due dates based on natural language ("next Friday", "in 3 days")
- Detects priority from keywords ("urgent", "ASAP", "when you get a chance")

### Recommendations
- Analyzes task completion patterns
- Identifies overdue tasks
- Suggests recurring tasks based on history

## Integration Points

### 1. Chat Endpoint
Accepts user messages and returns chatbot responses with optional suggested actions.

### 2. MCP Integration
Exposes task management tools as MCP resources for external LLM calls.

### 3. Task Service Integration
Chatbot has read/write access to TaskService for task operations.

## Error Handling

| Error | Status | Message |
|-------|--------|---------|
| Empty message | 400 | "Message cannot be empty" |
| Unauthorized | 401 | "You must be logged in to chat" |
| Service unavailable | 503 | "Chatbot service is temporarily unavailable" |
| Invalid extracted data | 422 | "Could not parse task from message" |

---

**Version**: 0.1.0 | **Last Updated**: 2025-12-08
