'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your tasks efficiently</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/dashboard/tasks"
              className="px-1 py-4 text-blue-600 border-b-2 border-blue-600 font-medium"
            >
              📋 All Tasks
            </Link>
            <Link
              href="/dashboard/tasks/pending"
              className="px-1 py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
            >
              ⏳ Pending
            </Link>
            <Link
              href="/dashboard/tasks/completed"
              className="px-1 py-4 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300"
            >
              ✅ Completed
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
