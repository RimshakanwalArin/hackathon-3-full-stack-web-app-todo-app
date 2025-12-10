# UI Components Specification

## Component Architecture

### Reusable Components (Atomic Design)

#### Atoms
Basic building blocks without business logic

**Button**
```tsx
<Button
  variant="primary|secondary|danger"
  size="sm|md|lg"
  disabled={boolean}
  onClick={handler}
>
  Click me
</Button>
```

**Input**
```tsx
<Input
  type="text|email|password"
  placeholder="Enter text..."
  value={value}
  onChange={handler}
  error={errorMessage}
  disabled={boolean}
/>
```

**Badge**
```tsx
<Badge variant="primary|success|warning|danger" size="sm|md">
  Label
</Badge>
```

**Card**
```tsx
<Card className="custom-class">
  <Card.Header title="Title" />
  <Card.Body>Content here</Card.Body>
  <Card.Footer>Footer content</Card.Footer>
</Card>
```

**Modal**
```tsx
<Modal isOpen={boolean} onClose={handler} title="Title">
  Modal content
</Modal>
```

#### Molecules
Components combining atoms

**TaskForm**
```tsx
<TaskForm
  onSubmit={handleSubmit}
  initialValues={task}
  isLoading={boolean}
/>
```
- Contains: Input (title), TextArea (description), Select (priority), DateInput (due_date), Input (category)
- Validates required fields
- Shows loading state

**TaskCard**
```tsx
<TaskCard
  task={taskObject}
  onEdit={handler}
  onDelete={handler}
  onComplete={handler}
/>
```
- Displays: title, status badge, priority, due date
- Shows quick action buttons
- Responsive layout

**ChatMessage**
```tsx
<ChatMessage
  message={messageObject}
  isUser={boolean}
  isLoading={boolean}
/>
```
- Message text with timestamp
- User avatar vs bot indicator
- Loading spinner for pending messages

#### Organisms
Feature-complete sections

**TaskList**
```tsx
<TaskList
  tasks={taskArray}
  filters={filterObject}
  onFilterChange={handler}
  onTaskAction={handler}
  isLoading={boolean}
/>
```
- Filter bar (status, priority, category)
- Sort options (createdAt, dueDate, priority)
- Pagination controls
- Task cards rendered via map

**Chatbot**
```tsx
<Chatbot
  onSendMessage={handler}
  isLoading={boolean}
  messages={messagesArray}
/>
```
- Chat message list (scrollable)
- Input field with send button
- Loading indicator
- Clear history button

**AuthForm**
```tsx
<AuthForm
  mode="login|register"
  onSubmit={handler}
  isLoading={boolean}
  error={errorMessage}
/>
```
- Email input
- Password input (with show/hide toggle)
- Submit button
- Link to toggle between login/register

## Page Components

### Dashboard Page (`/`)
```tsx
export default function DashboardPage() {
  return (
    <Layout>
      <Header />
      <div className="grid grid-cols-3 gap-4">
        <TaskStats />
        <TaskList />
        <Chatbot />
      </div>
    </Layout>
  )
}
```
- Displays user's task overview
- Quick stats (total, pending, completed)
- Main task list
- Chatbot sidebar

### Login Page (`/login`)
```tsx
export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  )
}
```
- Centered login form
- "Sign up" link
- Logo

### Tasks Page (`/tasks`)
```tsx
export default function TasksPage() {
  return (
    <Layout>
      <Header title="My Tasks" />
      <TaskList />
    </Layout>
  )
}
```
- Dedicated task management page
- Filters and sorting
- Pagination

### Settings Page (`/settings`)
```tsx
export default function SettingsPage() {
  return (
    <Layout>
      <Header title="Settings" />
      <SettingsForm />
    </Layout>
  )
}
```
- User preferences
- Account settings
- Theme toggle

## Styling Strategy

### Tailwind CSS Classes

**Spacing**
- `p-4` (padding), `m-4` (margin), `gap-4` (gap)
- Responsive: `p-2 md:p-4 lg:p-6`

**Colors**
- Primary: `bg-blue-600`, `text-blue-600`
- Danger: `bg-red-600`, `text-red-600`
- Success: `bg-green-600`, `text-green-600`

**Responsive**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Layout adapts to screen size */}
</div>
```

**Dark Mode**
```tsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  {/* Automatically adapts to dark mode */}
</div>
```

## Component States

### Loading
- Spinner overlay or skeleton
- Disabled buttons
- Greyed out text

### Error
- Red border on inputs
- Error message below field
- Error toast notification

### Empty
- Empty state illustration
- "No tasks yet" message
- CTA to create first task

### Success
- Green checkmark
- Success toast notification
- Brief success message

## Accessibility

- **Semantic HTML**: Use `<button>`, `<input>`, `<label>`
- **ARIA Labels**: `aria-label`, `aria-describedby` for complex components
- **Keyboard Navigation**: Tab, Enter, Escape support
- **Color Contrast**: WCAG AA standard (4.5:1 for text)
- **Focus Indicators**: Visible focus rings

## Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Example:
```tsx
<div className="
  w-full         /* Mobile: full width */
  md:w-2/3       /* Tablet: 66% width */
  lg:w-1/2       /* Desktop: 50% width */
">
  Content
</div>
```

## Component File Structure

```
frontend/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   ├── molecules/
│   │   ├── TaskForm.tsx
│   │   ├── TaskCard.tsx
│   │   ├── ChatMessage.tsx
│   │   └── ...
│   ├── organisms/
│   │   ├── TaskList.tsx
│   │   ├── Chatbot.tsx
│   │   ├── AuthForm.tsx
│   │   └── ...
│   └── layouts/
│       ├── Layout.tsx
│       ├── Header.tsx
│       └── Sidebar.tsx
├── pages/
│   ├── dashboard.tsx
│   ├── login.tsx
│   ├── tasks.tsx
│   └── settings.tsx
└── styles/
    └── globals.css
```

---

**Version**: 0.1.0 | **Last Updated**: 2025-12-08
