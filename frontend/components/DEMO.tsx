/**
 * Demo Component - Shows all task management components in action
 *
 * This is a complete example of how to use all task management components
 * together in a real application page.
 *
 * Copy this structure and adapt it for your needs.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AddTaskComponent,
  AllTasksList,
  PendingTasksList,
  NotificationContainer,
  showNotification,
} from './index';

type TabType = 'all' | 'pending' | 'stats';

export function TaskManagementDemo() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NotificationContainer />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600 text-sm mt-1">
                Modern React component library for task management
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AddTaskComponent />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {(['all', 'pending', 'stats'] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ color: '#1f2937' }}
                whileTap={{ scale: 0.95 }}
                className={`px-1 py-4 border-b-2 font-medium text-sm capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab === 'all' && '📋 All Tasks'}
                {tab === 'pending' && '⏳ Pending'}
                {tab === 'stats' && '📊 Statistics'}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'all' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <AllTasksList />
          </motion.div>
        )}

        {activeTab === 'pending' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <PendingTasksList />
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Component Library',
                  description: 'Complete task management UI with 7 components',
                  icon: '🎨',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  title: 'Framer Motion',
                  description: 'Smooth, performant animations throughout',
                  icon: '✨',
                  color: 'from-purple-500 to-purple-600',
                },
                {
                  title: 'Tailwind CSS',
                  description: 'Modern, responsive design with utility classes',
                  icon: '🎯',
                  color: 'from-cyan-500 to-blue-500',
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <h3 className="text-lg font-bold">{stat.title}</h3>
                  <p className="text-sm opacity-90 mt-2">{stat.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '✅ Create tasks with validation',
                  '✏️ Edit tasks inline',
                  '👁️ View full task details',
                  '✔️ Mark complete/incomplete',
                  '🗑️ Delete tasks with confirmation',
                  '🔍 Search and filter tasks',
                  '📊 Paginated task lists',
                  '📱 Fully responsive design',
                  '🎭 Smooth animations',
                  '🔔 Toast notifications',
                  '⌨️ TypeScript support',
                  '🚀 Performance optimized',
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="text-xl">{feature.split(' ')[0]}</span>
                    <span>{feature.slice(3)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* API Endpoints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
              <div className="space-y-3 font-mono text-sm">
                {[
                  { method: 'POST', path: '/api/tasks', desc: 'Create task' },
                  { method: 'GET', path: '/api/tasks', desc: 'List all tasks' },
                  { method: 'GET', path: '/api/tasks?status=pending', desc: 'List pending' },
                  { method: 'PATCH', path: '/api/tasks/:id', desc: 'Update task' },
                  { method: 'PATCH', path: '/api/tasks/:id/complete', desc: 'Mark complete' },
                  { method: 'DELETE', path: '/api/tasks/:id', desc: 'Delete task' },
                ].map((endpoint, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded"
                  >
                    <span
                      className={`px-3 py-1 rounded text-white font-bold text-xs whitespace-nowrap ${
                        endpoint.method === 'POST'
                          ? 'bg-green-500'
                          : endpoint.method === 'GET'
                          ? 'bg-blue-500'
                          : endpoint.method === 'PATCH'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <span className="text-gray-600 flex-1">{endpoint.path}</span>
                    <span className="text-gray-500 text-xs">{endpoint.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  📖 Check the <code className="bg-gray-100 px-2 py-1 rounded">README.md</code> for complete documentation
                </p>
                <p className="text-gray-700">
                  🔍 Review <code className="bg-gray-100 px-2 py-1 rounded">types.ts</code> for all type definitions
                </p>
                <p className="text-gray-700">
                  📝 Import components from <code className="bg-gray-100 px-2 py-1 rounded">@/components</code>
                </p>
                <p className="text-gray-700">
                  🚀 Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code> to install Framer Motion
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>
            Built with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
          <p className="text-sm mt-2">
            Complete task management UI component library
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * Usage in your app:
 *
 * import { TaskManagementDemo } from '@/components/DEMO';
 *
 * export default function Page() {
 *   return <TaskManagementDemo />;
 * }
 */
