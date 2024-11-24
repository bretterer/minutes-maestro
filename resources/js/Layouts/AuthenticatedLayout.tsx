import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const user = usePage().props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-blue-400" />
              </Link>
            </div>

            <div className="hidden sm:ms-6 sm:flex sm:items-center">
              <Link
                method="post"
                href={route('logout')}
                as="button"
                className="text-gray-300 hover:text-red-400"
              >
                Log Out
              </Link>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown((previousState) => !previousState)
                }
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={showingNavigationDropdown ? 'hidden' : 'inline-flex'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={showingNavigationDropdown ? 'block sm:hidden' : 'hidden sm:hidden'}>
          <div className="border-t border-gray-700 pb-1 pt-4">
            <div className="px-4">
              <div className="text-base font-medium text-gray-300">{user.name}</div>
              <div className="text-sm font-medium text-gray-400">{user.email}</div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                method="post"
                href={route('logout')}
                as="button"
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">{children}</main>
    </div>
  );
}
