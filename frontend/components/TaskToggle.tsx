'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { api } from '@/lib/api';
import { showNotification } from './Notification';
import { Task } from './types';

interface TaskToggleProps {
  task: Task;
  onToggle?: (isCompleted: boolean) => void;
  variant?: 'button' | 'switch';
}

export function TaskToggle({ task, onToggle, variant = 'button' }: TaskToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const newStatus = !isCompleted;
      const response = await api.task.updateTask(task.id, {
        completed: newStatus,
      });

      if (response.success) {
        setIsCompleted(newStatus);
        showNotification({
          type: 'success',
          message: newStatus
            ? 'Task marked as complete!'
            : 'Task marked as incomplete!',
        });
        onToggle?.(newStatus);
      } else {
        throw new Error(response.error?.message || 'Failed to update task');
      }
    } catch (error) {
      showNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update task',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'switch') {
    return (
      <motion.button
        onClick={handleToggle}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isCompleted ? 'bg-green-600' : 'bg-gray-300'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <motion.span
          animate={{ x: isCompleted ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="inline-block h-4 w-4 transform rounded-full bg-white"
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors ${
        isCompleted
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-3 h-3 border border-current border-t-transparent rounded-full"
          />
          <span className="text-xs">Updating...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            {isCompleted ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            )}
          </svg>
          {isCompleted ? 'Completed' : 'Mark Complete'}
        </>
      )}
    </motion.button>
  );
}
