'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function TrackOrderPage() {
    const [email, setEmail] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?email=${encodeURIComponent(email)}&orderNumber=${encodeURIComponent(orderNumber)}`);
            const data = await res.json();

            if (res.ok) {
                setOrder(data.order);
            } else {
                setError(data.message || 'Order not found. Please check your details.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-4">Track Your Order</h1>
                <p className="text-gray-600 text-lg">Enter your details below to check the current status of your shipment.</p>
            </div>

            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-12">
                    <form onSubmit={handleTrack} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="The email used for the order"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="orderNumber" className="block text-sm font-bold text-gray-700 mb-2">Order Number</label>
                            <input
                                id="orderNumber"
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="e.g. ORD-123456"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full h-12 text-lg font-bold"
                            isLoading={loading}
                        >
                            Track Now
                        </Button>
                    </form>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 text-error rounded-xl text-center font-medium">
                            {error}
                        </div>
                    )}
                </div>

                {order && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-slide-up">
                        <div className="flex items-left md:items-center flex-col md:flex-row justify-between mb-8 border-b border-gray-100 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-dark">Order Status</h2>
                                <p className="text-gray-500 text-sm">Order #{order.orderNumber}</p>
                            </div>
                            <span className={`px-4 py-1 rounded-full text-center mt-2 md:mt-0 text-sm font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 mt-1">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-dark">Latest Update</p>
                                    <p className="text-gray-600 text-sm">{order.notes || 'Your order is being processed and will be shipped soon.'}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(order.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>

                            {order.trackingNumber && (
                                <div className="flex items-start">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-4 mt-1">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-dark">Tracking Number</p>
                                        <p className="text-primary font-mono font-bold tracking-wider">{order.trackingNumber}</p>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="font-bold text-dark mb-4">Order Summary</h3>
                                <div className="space-y-3">
                                    {order.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                            <span className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${order.subtotal ? order.subtotal.toFixed(2) : (order.total - (order.shippingCost || 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>${(order.shippingCost || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-100">
                                        <span className="font-bold text-dark">Total</span>
                                        <span className="font-bold text-primary text-lg">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
