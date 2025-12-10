'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { api } from '@/lib/api';
import { showNotification } from './Notification';
import { Task } from './types';
import { UpdateTaskComponent } from './UpdateTaskComponent';
import { TaskToggle } from './TaskToggle';

interface TaskDetailsComponentProps {
  task: Task;
  onTaskUpdated?: (task: Task) => void;
  onTaskDeleted?: (taskId: number) => void;
}

export function TaskDetailsComponent({ task, onTaskUpdated, onTaskDeleted }: TaskDetailsComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localTask, setLocalTask] = useState(task);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setIsDeleting(true);
    try {
      const response = await api.task.deleteTask(localTask.id);

      if (response.success) {
        showNotification({
          type: 'success',
          message: 'Task deleted successfully!',
        });
        setIsOpen(false);
        onTaskDeleted?.(localTask.id);
      } else {
        throw new Error(response.error?.message || 'Failed to delete task');
      }
    } catch (error) {
      showNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete task',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setLocalTask(updatedTask);
    onTaskUpdated?.(updatedTask);
  };

  const handleCompleteToggle = (isCompleted: boolean) => {
    setLocalTask({ ...localTask, completed: isCompleted });
    onTaskUpdated?.({ ...localTask, completed: isCompleted });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const contentVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 10 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { scale: 0.95, opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* View Details Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Modal Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                variants={contentVariants}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-gray-900 break-words">{localTask.title}</h2>
                    <motion.div variants={sectionVariants} className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          localTask.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          {localTask.completed ? (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          )}
                        </svg>
                        {localTask.completed ? 'Completed' : 'Pending'}
                      </span>
                    </motion.div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="ml-4 flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  {localTask.description && (
                    <motion.div variants={sectionVariants} className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        Description
                      </h3>
                      <p className="text-gray-600 whitespace-pre-wrap">{localTask.description}</p>
                    </motion.div>
                  )}

                  {/* Dates */}
                  <motion.div variants={sectionVariants} className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Created</p>
                        <p className="text-sm text-gray-900 font-medium mt-1">
                          {formatDate(localTask.created_at)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Last Updated</p>
                        <p className="text-sm text-gray-900 font-medium mt-1">
                          {formatDate(localTask.updated_at)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    variants={sectionVariants}
                    className="flex flex-wrap gap-3 pt-4 border-t border-gray-200"
                  >
                    <TaskToggle
                      task={localTask}
                      onToggle={handleCompleteToggle}
                    />
                    <UpdateTaskComponent
                      task={localTask}
                      onTaskUpdated={handleTaskUpdated}
                      onClose={() => {}}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isDeleting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-3 h-3 border border-red-700 border-t-transparent rounded-full"
                          />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
