'use client';

import Link from 'next/link';

export default function AccountOrdersPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-dark mb-8">My Orders</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
                        <Link
                            href="/account"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/account/orders"
                            className="block px-4 py-2 bg-primary text-white rounded-md font-medium"
                        >
                            Orders
                        </Link>
                        <Link
                            href="/account/addresses"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Addresses
                        </Link>
                        <Link
                            href="/account/settings"
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Account Details
                        </Link>
                        <a
                            href="/api/auth/logout"
                            className="block px-4 py-2 text-error hover:bg-red-50 rounded-md transition-colors mt-4 border-t"
                        >
                            Logout
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                            <Link href="/shop" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
