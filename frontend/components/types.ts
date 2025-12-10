/**
 * Type definitions for Task Management Components
 */

export interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status?: 'pending' | 'completed';
}

export interface NotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface TaskListOptions {
  status?: 'all' | 'pending' | 'completed';
  sort?: 'created' | 'title' | 'completed';
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
