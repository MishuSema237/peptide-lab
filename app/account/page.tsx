'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AccountPage() {
    const { user, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-dark mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
                        <Link
                            href="/account"
                            className="block px-4 py-2 bg-primary text-white rounded-md font-medium"
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
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-center space-x-4 mb-6">
                            {user.picture ? (
                                <Image
                                    src={user.picture}
                                    alt={user.name || 'User'}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {(user.name || 'U').charAt(0)}
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl font-bold text-dark">Hello, {user.name}</h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            From your account dashboard you can view your recent orders, manage your shipping limits for orders, and edit your password and account details.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/account/orders" className="p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-center group">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-dark">Orders</h3>
                            </Link>

                            <Link href="/account/addresses" className="p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-center group">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-dark">Addresses</h3>
                            </Link>

                            <Link href="/account/settings" className="p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-center group">
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-dark">Account Details</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
