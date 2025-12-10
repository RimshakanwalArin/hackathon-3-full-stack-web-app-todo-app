'use client';

import {
  NotificationContainer,
  AddTaskComponent,
  AllTasksList,
} from '@/components';

export default function TasksPage() {
  return (
    <>
      <NotificationContainer />

      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">All Tasks</h2>
            <p className="text-gray-600 mt-1">View and manage all your tasks</p>
          </div>
          <AddTaskComponent />
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AllTasksList />
        </div>
      </div>
    </>
  );
}
