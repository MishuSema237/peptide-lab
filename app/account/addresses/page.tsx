'use client';

import Link from 'next/link';

export default function AccountAddressesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-dark mb-8">My Addresses</h1>

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
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Orders
                        </Link>
                        <Link
                            href="/account/addresses"
                            className="block px-4 py-2 bg-primary text-white rounded-md font-medium"
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
                        <p className="text-gray-600 mb-6">
                            The following addresses will be used on the checkout page by default.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-dark">Billing Address</h3>
                                    <button className="text-primary text-sm hover:underline">Edit</button>
                                </div>
                                <div className="text-gray-600 italic">
                                    <p>You have not set up this type of address yet.</p>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-dark">Shipping Address</h3>
                                    <button className="text-primary text-sm hover:underline">Edit</button>
                                </div>
                                <div className="text-gray-600 italic">
                                    <p>You have not set up this type of address yet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
