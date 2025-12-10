# Task Management Components - Quick Start Guide

## 🚀 Installation

1. Install Framer Motion (already added to package.json):
```bash
cd frontend
npm install
```

2. Verify components folder:
```bash
ls components/
# Should show: AddTaskComponent.tsx, AllTasksList.tsx, Notification.tsx, etc.
```

## 📋 Components at a Glance

| Component | Purpose | File | Size |
|-----------|---------|------|------|
| **NotificationContainer** | Global toast notifications | Notification.tsx | 4.3 KB |
| **AddTaskComponent** | Create new tasks (modal) | AddTaskComponent.tsx | 12 KB |
| **UpdateTaskComponent** | Edit existing tasks | UpdateTaskComponent.tsx | 12 KB |
| **TaskDetailsComponent** | View full task details | TaskDetailsComponent.tsx | 11 KB |
| **TaskToggle** | Mark complete/incomplete | TaskToggle.tsx | 3.4 KB |
| **PendingTasksList** | Show pending tasks | PendingTasksList.tsx | 9.2 KB |
| **AllTasksList** | Show all tasks (paginated) | AllTasksList.tsx | 15 KB |

## 💻 Minimal Example

```tsx
'use client';

import {
  NotificationContainer,
  AddTaskComponent,
  AllTasksList
} from '@/components';

export default function TasksPage() {
  return (
    <div className="p-8">
      <NotificationContainer />

      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      <div className="mb-6">
        <AddTaskComponent />
      </div>

      <AllTasksList />
    </div>
  );
}
```

## 🎯 Key Features

### AddTaskComponent
```tsx
import { AddTaskComponent } from '@/components';

function MyComponent() {
  return (
    <AddTaskComponent
      onTaskAdded={(task) => console.log('Added:', task)}
      onClose={() => console.log('Closed')}
    />
  );
}
```

**What it does:**
- Shows "Add Task" button
- Opens modal on click
- Validates title (1-200 chars) and description (max 1000 chars)
- Posts to `POST /api/tasks`
- Shows success/error notifications
- Closes modal on success

### UpdateTaskComponent
```tsx
import { UpdateTaskComponent } from '@/components';

function TaskItem({ task }) {
  return (
    <UpdateTaskComponent
      task={task}
      onTaskUpdated={(updated) => console.log('Updated:', updated)}
    />
  );
}
```

**What it does:**
- Shows "Edit" button
- Pre-fills form with task data
- Validates same as AddTaskComponent
- Posts to `PATCH /api/tasks/:id`
- Shows success/error notifications

### TaskDetailsComponent
```tsx
import { TaskDetailsComponent } from '@/components';

function TaskItem({ task }) {
  return (
    <TaskDetailsComponent
      task={task}
      onTaskUpdated={(updated) => console.log('Updated:', updated)}
      onTaskDeleted={(id) => console.log('Deleted:', id)}
    />
  );
}
```

**What it does:**
- Shows "View" button
- Opens modal with full task details
- Shows timestamps (created/updated)
- Shows status badge
- Includes Edit, Delete, Complete buttons
- Delete calls `DELETE /api/tasks/:id`

### TaskToggle
```tsx
import { TaskToggle } from '@/components';

function TaskItem({ task }) {
  return (
    <>
      {/* Button variant */}
      <TaskToggle task={task} />

      {/* Switch variant */}
      <TaskToggle
        task={task}
        variant="switch"
        onToggle={(isCompleted) => console.log(isCompleted)}
      />
    </>
  );
}
```

**What it does:**
- Shows button or switch UI
- Toggles complete/incomplete
- Calls `PATCH /api/tasks/:id`
- Shows loading spinner
- Color-coded (yellow=pending, green=completed)

### PendingTasksList
```tsx
import { PendingTasksList } from '@/components';

function PendingPage() {
  return <PendingTasksList />;
}
```

**What it does:**
- Auto-loads pending tasks
- Has search field
- Sort by created or title
- Refresh button
- Toggle complete inline
- Shows empty state

### AllTasksList
```tsx
import { AllTasksList } from '@/components';

function AllTasksPage() {
  return <AllTasksList />;
}
```

**What it does:**
- Auto-loads all tasks
- Filter by status (All/Pending/Completed)
- Search field
- Sort options
- Pagination (10 per page)
- Task statistics
- Shows empty state

## 🔔 Notifications

```tsx
'use client';

import { NotificationContainer, showNotification } from '@/components';

export function MyComponent() {
  const handleClick = () => {
    showNotification({
      type: 'success',  // or 'error', 'info', 'warning'
      message: 'Task created!',
      duration: 3000,   // optional, default 4000ms
    });
  };

  return (
    <>
      <NotificationContainer />
      <button onClick={handleClick}>Show Notification</button>
    </>
  );
}
```

## 🎨 Styling & Customization

### Tailwind Integration
All components use Tailwind CSS classes. Customize by:

1. **Colors** - Update `tailwind.config.ts`
2. **Spacing** - Uses standard Tailwind scale (p-4, gap-2, etc.)
3. **Responsive** - Mobile-first with sm:, md:, lg: prefixes

### Framer Motion Animations
Animations are built-in. To adjust:

1. **Modal entrance**: See `contentVariants` in components
2. **List animations**: See `itemVariants` in list components
3. **Button effects**: `whileHover`, `whileTap` props

## 📱 Responsive Behavior

All components are fully responsive:
- Mobile: Single column, stacked layout
- Tablet: Side-by-side controls
- Desktop: Full width with sidebar space

## 🔗 API Integration

Components automatically integrate with:
```
POST   /api/tasks              → Create
GET    /api/tasks              → List all
GET    /api/tasks?status=...   → List filtered
PATCH  /api/tasks/:id          → Update
DELETE /api/tasks/:id          → Delete
```

Auth token comes from `localStorage.auth_token` (set by login)

## ⚡ Performance Tips

1. **Use PendingTasksList** for "pending" view (faster than filtering)
2. **Pagination** limits DOM nodes (AllTasksList uses 10 per page)
3. **Search** is client-side (filter after fetch)
4. **Memoization** - Components handle their own optimization

## 🐛 Debugging

Enable in browser console:
```js
// Log all notifications
window.addEventListener('showNotification', (e) => {
  console.log('Notification:', e.detail);
});
```

Check network requests in DevTools Network tab to verify API calls

## 📚 Full Documentation

See `components/README.md` for:
- Complete API reference
- All type definitions
- Component props interface
- Usage examples
- Performance notes

## 🎭 Demo Page

See `components/DEMO.tsx` for a complete working example with:
- All components in action
- Statistics page
- API endpoint reference
- Feature list

To use demo:
```tsx
import { TaskManagementDemo } from '@/components/DEMO';

export default function Page() {
  return <TaskManagementDemo />;
}
```

## ✅ Checklist Before Using

- [ ] Installed Framer Motion: `npm install`
- [ ] Added NotificationContainer at app root
- [ ] Backend API running on port 8000
- [ ] Database has tasks table
- [ ] Auth token stored in localStorage
- [ ] Tailwind CSS configured
- [ ] TypeScript strict mode enabled (optional)

## 🚀 Next Steps

1. **Copy minimal example above** to a page
2. **Run frontend**: `npm run dev`
3. **Test components** at http://localhost:3000
4. **Check backend logs** for API calls
5. **Verify database** has new tasks created
6. **Customize styling** as needed

## 💡 Common Tasks

### Show only pending tasks
```tsx
<PendingTasksList />
```

### Show all tasks with search
```tsx
<AllTasksList />
```

### Create new task button
```tsx
<AddTaskComponent onTaskAdded={handleAdd} />
```

### Edit single task
```tsx
<UpdateTaskComponent task={task} />
```

### Mark task complete/incomplete
```tsx
<TaskToggle task={task} variant="switch" />
```

### View task details
```tsx
<TaskDetailsComponent task={task} />
```

## 🆘 Troubleshooting

**Notifications not showing?**
- Make sure `<NotificationContainer />` is at page root
- Check browser console for errors

**API calls failing?**
- Verify backend running: `python -m uvicorn main:app --reload --port 8000`
- Check localStorage has `auth_token` (login first)
- Check Network tab for request/response

**Components not animating?**
- Verify Framer Motion installed: `npm list framer-motion`
- Check no CSS conflicts in tailwind.config.ts

**TypeScript errors?**
- Run `npm run type-check` to see all errors
- Check component imports match export names
- Verify tsconfig.json has correct paths

## 📞 Support

Check these files:
- `components/README.md` - Full API docs
- `components/DEMO.tsx` - Working example
- `components/types.ts` - Type definitions
- `lib/api.ts` - API client code
