'use client';

import Link from 'next/link';

export default function AccountSettingsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-dark mb-8">Account Details</h1>

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
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Addresses
                        </Link>
                        <Link
                            href="/account/settings"
                            className="block px-4 py-2 bg-primary text-white rounded-md font-medium"
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
                        <h2 className="text-xl font-bold text-dark mb-6">Edit Account Details</h2>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                                    placeholder="John Doe"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    This will be how your name will be displayed in the account section and in reviews
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                                    placeholder="john@example.com"
                                    disabled
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Email address is managed via your login provider
                                </p>
                            </div>

                            <div className="pt-6 border-t">
                                <h3 className="text-lg font-semibold text-dark mb-4">Password Change</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    To change your password, please use the Auth0 password reset flow.
                                </p>
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Request Password Reset
                                </button>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
