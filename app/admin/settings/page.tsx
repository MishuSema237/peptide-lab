'use client';

import Link from 'next/link';

export default function AdminSettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-dark mb-8">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/settings/payment-methods" className="block group">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition-colors">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-dark mb-2">Payment Methods</h3>
                        <p className="text-gray-500 text-sm">Configure manual payment options, instructions, and account details.</p>
                    </div>
                </Link>

                {/* Placeholder for other settings */}
                <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    More settings coming soon
                </div>
            </div>
        </div>
    );
}
