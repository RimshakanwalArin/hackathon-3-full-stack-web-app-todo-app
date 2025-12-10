# Task Management Components

A modern, responsive, and fully-animated task management UI built with React, Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Components Overview

### 1. **NotificationContainer & showNotification**
Global notification system with toast-style alerts.

**Features:**
- Multiple notification types: success, error, info, warning
- Auto-dismiss with customizable duration
- Stack multiple notifications
- Smooth fade/slide animations
- Customizable positioning

**Usage:**
```tsx
'use client';

import { NotificationContainer, showNotification } from '@/components';

export function App() {
  const handleSuccess = () => {
    showNotification({
      type: 'success',
      message: 'Task created successfully!',
      duration: 3000,
    });
  };

  return (
    <>
      <NotificationContainer />
      <button onClick={handleSuccess}>Show Notification</button>
    </>
  );
}
```

### 2. **AddTaskComponent**
Modal-based form for creating new tasks with full validation.

**Features:**
- Modal dialog with smooth open/close animations
- Form validation for title (1-200 chars) and description (max 1000 chars)
- Real-time character counter
- Loading states with spinner animation
- Success/error notifications
- Calls `POST /api/tasks`

**Props:**
```ts
interface AddTaskComponentProps {
  onTaskAdded?: (task: Task) => void;
  onClose?: () => void;
}
```

**Usage:**
```tsx
'use client';

import { AddTaskComponent, NotificationContainer } from '@/components';

export function TaskPage() {
  const handleTaskAdded = (task) => {
    console.log('Task added:', task);
  };

  return (
    <>
      <NotificationContainer />
      <AddTaskComponent onTaskAdded={handleTaskAdded} />
    </>
  );
}
```

### 3. **UpdateTaskComponent**
Inline edit button that opens a pre-filled modal form for updating tasks.

**Features:**
- Pre-fills form with existing task data
- Same validation as AddTaskComponent
- Smooth modal animation
- Updates via `PATCH /api/tasks/:id`
- Shows loading state during update
- Success/error notifications

**Props:**
```ts
interface UpdateTaskComponentProps {
  task: Task;
  onTaskUpdated?: (task: Task) => void;
  onClose?: () => void;
}
```

**Usage:**
```tsx
import { UpdateTaskComponent } from '@/components';

const task = {
  id: 1,
  title: 'Buy groceries',
  description: 'Milk, eggs, and bread',
  completed: false,
  // ... other fields
};

export function TaskItem() {
  return (
    <UpdateTaskComponent
      task={task}
      onTaskUpdated={(updatedTask) => console.log(updatedTask)}
    />
  );
}
```

### 4. **TaskDetailsComponent**
Modal displaying full task information with action buttons.

**Features:**
- Full task details view with title, description
- Status badge (Completed/Pending)
- Created and updated timestamps (formatted)
- Edit button (opens UpdateTaskComponent)
- Delete button with confirmation
- Complete/incomplete toggle
- Loading states for all actions

**Props:**
```ts
interface TaskDetailsComponentProps {
  task: Task;
  onTaskUpdated?: (task: Task) => void;
  onTaskDeleted?: (taskId: number) => void;
}
```

**Usage:**
```tsx
import { TaskDetailsComponent } from '@/components';

export function TaskCard({ task }) {
  const handleDelete = (taskId) => {
    // Remove task from list
  };

  return (
    <TaskDetailsComponent
      task={task}
      onTaskDeleted={handleDelete}
    />
  );
}
```

### 5. **TaskToggle**
Button or switch to mark tasks as complete/incomplete.

**Features:**
- Two variants: 'button' (default) and 'switch'
- Calls `PATCH /api/tasks/:id` to update status
- Real-time status update
- Loading states
- Smooth animations
- Success/error notifications

**Props:**
```ts
interface TaskToggleProps {
  task: Task;
  onToggle?: (isCompleted: boolean) => void;
  variant?: 'button' | 'switch';  // default: 'button'
}
```

**Usage:**
```tsx
import { TaskToggle } from '@/components';

export function TaskItem({ task }) {
  return (
    <div>
      {/* Button variant (default) */}
      <TaskToggle task={task} />

      {/* Switch variant */}
      <TaskToggle
        task={task}
        variant="switch"
        onToggle={(isCompleted) => console.log(isCompleted)}
      />
    </div>
  );
}
```

### 6. **PendingTasksList**
Dedicated list view for pending tasks with search and filtering.

**Features:**
- Auto-loads tasks with status = pending
- Search by title or description
- Sort by created date or title
- Filter animations with staggered items
- Refresh button with loading state
- Empty state handling
- Smooth list item entrance/exit animations
- Calls `GET /api/tasks?status=pending`
- Task count display

**Props:**
```ts
interface PendingTasksListProps {
  onTasksLoaded?: (tasks: Task[]) => void;
}
```

**Usage:**
```tsx
'use client';

import { PendingTasksList, NotificationContainer } from '@/components';

export function PendingPage() {
  return (
    <>
      <NotificationContainer />
      <PendingTasksList />
    </>
  );
}
```

### 7. **AllTasksList**
Comprehensive paginated list of all tasks with advanced filtering.

**Features:**
- Fetches all tasks via `GET /api/tasks`
- Filter by status: All, Pending, Completed
- Search by title or description
- Sort by: Created date, Title, or Status
- Pagination (10 items per page)
- Page navigation with numbered buttons
- Task count summary (total, pending, completed)
- Color-coded task states
- Smooth animations for all list operations
- Empty state handling
- Refresh button with loading state
- Task statistics display

**Props:**
```ts
interface AllTasksListProps {
  onTasksLoaded?: (tasks: Task[]) => void;
}
```

**Usage:**
```tsx
'use client';

import { AllTasksList, NotificationContainer } from '@/components';

export function AllTasksPage() {
  return (
    <>
      <NotificationContainer />
      <AllTasksList />
    </>
  );
}
```

## Complete Example: Task Management Page

```tsx
'use client';

import {
  AddTaskComponent,
  AllTasksList,
  NotificationContainer,
  PendingTasksList
} from '@/components';
import { useState } from 'react';

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <NotificationContainer />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
          <AddTaskComponent />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'pending'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'all' && <AllTasksList />}
          {activeTab === 'pending' && <PendingTasksList />}
        </div>
      </div>
    </div>
  );
}
```

## Type Definitions

All components use TypeScript types from `./types.ts`:

```ts
interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskFormData {
  title: string;
  description?: string;
  status?: 'pending' | 'completed';
}

interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;  // default: 4000ms
}

interface TaskListOptions {
  status?: 'all' | 'pending' | 'completed';
  sort?: 'created' | 'title' | 'completed';
  page?: number;
  limit?: number;
  search?: string;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
```

## Styling

All components use:
- **Tailwind CSS** for styling
- **Responsive design** (mobile-first approach)
- **Dark borders/shadows** for depth
- **Smooth transitions** and hover effects
- **Color coding** for task statuses:
  - Yellow: Pending
  - Green: Completed
  - Blue: Interactive elements

## Animations

Components use **Framer Motion** for smooth, performant animations:
- Modal entrance/exit (scale + fade)
- Form field stagger animations
- List item animations with layout transitions
- Button hover/tap effects
- Loading spinners
- Smooth status transitions

## API Integration

All components integrate with the backend API through `/lib/api.ts`:

**Endpoints used:**
- `POST /api/tasks` - Create task
- `GET /api/tasks` - List all tasks
- `GET /api/tasks?status=pending` - List pending tasks
- `PATCH /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/complete` - Mark as complete
- `DELETE /api/tasks/:id` - Delete task

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- **Lazy animations** - Only animate visible elements
- **Optimized re-renders** - Proper state management
- **Pagination** - Handles large task lists efficiently
- **Search debounce** - Prevents excessive filtering
- **Memoization** - Components only re-render when necessary

## Dependencies

- `react` ^18.2.0
- `next` 14.0.4
- `typescript` ^5.3.3
- `framer-motion` ^10.16.16
- `tailwindcss` ^3.4.1

## Installation

```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` and import components to use them.

## Notes

1. All components are client components (`'use client'`) as they require interactivity
2. The `NotificationContainer` should be placed at the app root for global notifications
3. Search and filter are client-side only (filter happens after fetching from API)
4. Pagination is client-side with 10 items per page
5. All API calls include authentication token from localStorage
6. Loading states prevent double submissions

## Contributing

When adding new components:
1. Add types to `types.ts`
2. Use Framer Motion for animations
3. Include loading states
4. Show notifications for success/error
5. Follow existing naming conventions
6. Export from `index.ts`
