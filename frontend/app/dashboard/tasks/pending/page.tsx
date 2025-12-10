'use client';

import {
  NotificationContainer,
  AddTaskComponent,
  PendingTasksList,
} from '@/components';

export default function PendingTasksPage() {
  return (
    <>
      <NotificationContainer />

      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Pending Tasks</h2>
            <p className="text-gray-600 mt-1">Tasks that need to be completed</p>
          </div>
          <AddTaskComponent />
        </div>

        {/* Pending Tasks List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PendingTasksList />
        </div>
      </div>
    </>
  );
}
