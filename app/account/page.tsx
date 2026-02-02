'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AccountPage() {
    // Guest-focused tracking is now the primary way to view orders
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-heading font-bold mb-6">Order Tracking</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Accounts are no longer required. You can track your research order status and history using our Guest Tracking tool.
            </p>
            <Link href="/track-order">
                <Button variant="primary" size="lg">Track Your Order</Button>
            </Link>
        </div>
    );
}
