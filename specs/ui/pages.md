# Page Specifications

## Page Layout Architecture

```
┌─────────────────────────────────────────────┐
│              Header / Navigation             │
├─────────────────────────────────────────────┤
│       │                                      │
│ Sidebar │  Main Content Area                │
│       │                                      │
│       └──────────────────────────────────────┤
│                                               │
└───────────────────────────────────────────────┘
```

## Page Routes

### 1. Login Page (`/login`)

**URL**: `/login`
**Auth Required**: No
**Components**:
- AuthForm (login mode)
- Logo
- "Sign up" link

**Layout**:
```
┌──────────────────────────────────────────┐
│                                            │
│                                            │
│              ┌────────────────┐           │
│              │   Todo App     │           │
│              │                │           │
│              │  Email: [___]  │           │
│              │  Pass:  [___]  │           │
│              │                │           │
│              │   [Login]      │           │
│              │                │           │
│              │ Sign up?       │           │
│              └────────────────┘           │
│                                            │
│                                            │
└──────────────────────────────────────────┘
```

**User Interactions**:
- Enter email and password
- Click "Login" button
- On success → redirect to Dashboard
- On error → show error message
- Click "Sign up" link → go to Register page

**States**:
- Default
- Loading (submit button disabled, spinner)
- Error (red border, error message)
- Success (redirect)

---

### 2. Register Page (`/register`)

**URL**: `/register`
**Auth Required**: No
**Components**:
- AuthForm (register mode)
- Logo
- "Login" link

**Layout**: Similar to Login page

**User Interactions**:
- Enter email and password
- Confirm password
- Click "Register" button
- On success → redirect to Login with success message
- On error → show validation errors
- Click "Login" link → go to Login page

**Validations**:
- Email format validation
- Password length (≥8 chars)
- Password match
- Email uniqueness (server-side)

---

### 3. Dashboard Page (`/`)

**URL**: `/`
**Auth Required**: Yes
**Components**:
- Header with user info
- Sidebar with navigation
- TaskStats (overview cards)
- TaskList (recent tasks)
- Chatbot sidebar

**Layout**:
```
┌──────────────────────────────────────────────────┐
│  Todo App        John Doe    [Settings] [Logout] │
├─────────────────┬────────────────────────────────┤
│                 │                                  │
│  Sidebar:       │   Task Statistics               │
│  • Dashboard    │   ┌──────┬──────┬──────────┐   │
│  • Tasks        │   │Total │Pend. │Completed │   │
│  • Categories   │   │ 25   │ 12   │    10    │   │
│  • Settings     │   └──────┴──────┴──────────┘   │
│                 │                                  │
│                 │   Recent Tasks                  │
│                 │   ┌──────────────────────────┐ │
│                 │   │ Buy groceries       [✓]  │ │
│                 │   │ Complete report     [...]│ │
│                 │   │ Call dentist        [✓]  │ │
│                 │   └──────────────────────────┘ │
│                 │                                  │
│                 │   Chatbot Sidebar             │
│                 │   ┌──────────────────────────┐ │
│                 │   │  Hi! How can I help?     │ │
│                 │   │  [Message input...]      │ │
│                 │   └──────────────────────────┘ │
│                 │                                  │
└─────────────────┴────────────────────────────────┘
```

**Sections**:

#### Task Statistics
- **Total Tasks**: Count of all tasks
- **Pending**: Count of pending tasks
- **Completed**: Count of completed tasks
- **Overdue**: Count of tasks past due date

#### Recent Tasks
- List of last 5 tasks
- Each shows: title, status badge, due date
- Quick actions: complete, edit, delete

#### Chatbot Widget
- Chat message history (last 5 messages)
- Input field for new messages
- "Clear" button

**User Interactions**:
- Click task → open task detail modal
- Click "Complete" → mark task done
- Click "Edit" → open task edit form
- Click "Delete" → confirm and delete
- Type in chat → send message to chatbot
- Click navigation items → navigate to that page

**Responsive**:
- **Mobile**: Single column, sidebar collapses to hamburger
- **Tablet**: Two columns (sidebar + main content)
- **Desktop**: Three column layout with chatbot sidebar

---

### 4. Tasks Page (`/tasks`)

**URL**: `/tasks`
**Auth Required**: Yes
**Components**:
- Header with "New Task" button
- Filters (status, priority, category, date range)
- Sort controls
- TaskList with pagination
- Task detail modal

**Layout**:
```
┌──────────────────────────────────────────────────┐
│  Todo App        John Doe    [Settings] [Logout] │
├─────────────────┬────────────────────────────────┤
│                 │                                  │
│                 │   My Tasks        [+ New Task] │
│ Sidebar         │                                  │
│                 │   Filters:                      │
│                 │   Status: [All ▼]               │
│                 │   Priority: [All ▼]             │
│                 │   Category: [All ▼]             │
│                 │   Due Date: [From] [To]         │
│                 │   Sort by: [Due Date ▼]         │
│                 │                                  │
│                 │   ┌──────────────────────────┐ │
│                 │   │ Task Title          [✓] │ │
│                 │   │ Due: 2025-12-12    [Edit]│ │
│                 │   │ Priority: High      [Del]│ │
│                 │   │                          │ │
│                 │   │ Another Task       [✓] │ │
│                 │   └──────────────────────────┘ │
│                 │                                  │
│                 │   Page 1 of 3  [< > ]         │
│                 │                                  │
└─────────────────┴────────────────────────────────┘
```

**Filter Controls**:
- Status: Pending, In Progress, Completed, Cancelled
- Priority: Low, Medium, High, Urgent
- Category: [dropdown of user's categories]
- Date Range: From date, To date (calendar pickers)

**Sort Controls**:
- Sort by: Created Date, Due Date, Priority, Title
- Order: Ascending, Descending

**User Interactions**:
- Click "New Task" → open TaskForm modal
- Filter tasks → list updates immediately
- Click task → open detail modal
- Click "Complete" checkbox → toggle status
- Click "Edit" → open TaskForm modal with data
- Click "Delete" → confirm and delete

---

### 5. Task Detail Modal

**Triggered By**: Clicking a task in TaskList

**Components**:
- Task information (read-only or edit mode)
- Edit button
- Delete button
- Close button

**Layout**:
```
┌─────────────────────────────────────────┐
│  Task Details              [Edit] [X]    │
├─────────────────────────────────────────┤
│                                           │
│  Buy groceries                    [✓]   │
│                                           │
│  Status:     Pending                    │
│  Priority:   Medium                     │
│  Due Date:   2025-12-12                 │
│  Category:   Shopping                   │
│  Tags:       urgent, personal           │
│                                           │
│  Description:                           │
│  Milk, bread, eggs from Whole Foods     │
│                                           │
│  Created: 2025-12-08 10:30 AM          │
│  Updated: 2025-12-08 10:30 AM          │
│                                           │
│           [Delete] [Close]              │
│                                           │
└─────────────────────────────────────────┘
```

**User Interactions**:
- Click "Edit" → switch to edit mode
- Click "Delete" → confirm and delete
- Click "X" or "Close" → close modal

---

### 6. Task Form Modal

**Triggered By**: "New Task" button or "Edit" action

**Components**:
- TaskForm (atoms: Input, TextArea, Select, DateInput)
- Submit button
- Cancel button

**Layout**:
```
┌────────────────────────────────────────┐
│  New Task                          [X] │
├────────────────────────────────────────┤
│                                         │
│  Title: [________________________]    │
│  (required)                            │
│                                         │
│  Description: [_________________]    │
│             [_________________]    │
│                                         │
│  Priority: [Medium            ▼]    │
│                                         │
│  Due Date: [2025-12-12        🗓]    │
│                                         │
│  Category: [Shopping           ▼]    │
│                                         │
│  Tags: [______________]                │
│        (press Enter to add)             │
│                                         │
│  [Submit]  [Cancel]                   │
│                                         │
└────────────────────────────────────────┘
```

**Validations**:
- Title: Required, max 255 chars
- Due Date: Valid date, optional
- Priority: One of predefined options
- Category: Alphanumeric, optional

**User Interactions**:
- Fill form fields
- Click "Submit" → create/update task
- Click "Cancel" → close modal
- Type tags → add with Enter key

---

### 7. Settings Page (`/settings`)

**URL**: `/settings`
**Auth Required**: Yes
**Components**:
- SettingsForm
- Theme toggle
- Preferences section

**Layout**:
```
┌──────────────────────────────────────────────────┐
│  Todo App        John Doe    [Settings] [Logout] │
├─────────────────┬────────────────────────────────┤
│                 │                                  │
│ Sidebar         │   Settings                     │
│                 │                                  │
│                 │   Account                      │
│                 │   Email: user@example.com      │
│                 │   [Change Password]            │
│                 │                                  │
│                 │   Preferences                  │
│                 │   Theme: [Light ▼]             │
│                 │   Notifications: [Toggle]      │
│                 │   Email Reminders: [Toggle]    │
│                 │                                  │
│                 │   Categories                   │
│                 │   + Add Category               │
│                 │   • Work                       │
│                 │   • Personal                   │
│                 │   • Shopping                   │
│                 │                                  │
│                 │   [Save Changes] [Logout]     │
│                 │                                  │
└─────────────────┴────────────────────────────────┘
```

**Settings Sections**:
- Account (email, password)
- Theme (light/dark mode)
- Notifications (email reminders)
- Categories (manage task categories)

**User Interactions**:
- Change theme → apply immediately
- Toggle notifications → save preference
- Add/remove categories → update list
- Click "Save Changes" → persist settings
- Click "Logout" → end session

---

## Responsive Design

### Mobile (< 768px)
- Full-width layout
- Sidebar collapses (hamburger menu)
- Single column task list
- Chatbot in separate view or tab

### Tablet (768px - 1024px)
- Two column layout (sidebar + main)
- Task list with compact cards
- Chatbot collapsed by default

### Desktop (> 1024px)
- Three column layout (sidebar + main + chatbot)
- Full task details visible
- Chatbot always visible

---

**Version**: 0.1.0 | **Last Updated**: 2025-12-08
