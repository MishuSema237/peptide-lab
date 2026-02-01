'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Suspense } from 'react';

function OrderCompleteContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order');

    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-heading font-bold text-dark mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-2">
                    Thank you for your purchase. Your order number is:
                </p>
                <div className="text-2xl font-bold text-primary mb-8">#{orderNumber || '000000'}</div>

                <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
                    <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        What happens next?
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
                        <li>Check your email for the order confirmation.</li>
                        <li>You will receive a <strong>separate email with payment instructions</strong> shortly.</li>
                        <li>Follow the instructions to complete your payment.</li>
                        <li>Once payment is confirmed, we will ship your order immediately.</li>
                    </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/account/orders">
                        <Button variant="outline">View Order</Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant="primary">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderCompletePage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading order details...</div>}>
            <OrderCompleteContent />
        </Suspense>
    );
}
