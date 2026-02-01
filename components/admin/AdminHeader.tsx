'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function AdminHeader() {
    const { user } = useUser();

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center">
                {/* Placeholder for breadcrumb or page title */}
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full block"></span>
                </button>

                <div className="flex items-center space-x-3 border-l pl-4 ml-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-dark">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary font-bold">
                        {(user?.name || 'A').charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
