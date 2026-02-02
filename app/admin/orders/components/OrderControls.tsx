'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function OrderControls({ order }: { order: any }) {
    const router = useRouter();
    const [status, setStatus] = useState(order.status);
    const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
    const [notes, setNotes] = useState(order.notes || '');
    const [shippingCost, setShippingCost] = useState(order.shippingCost || 0);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [showReplyModal, setShowReplyModal] = useState(false);

    const handleUpdateStatus = async () => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/orders/${order._id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, trackingNumber, notes, shippingCost, sendEmail: true }),
            });
            if (res.ok) {
                toast.success('Order updated and customer notified.');
                router.refresh();
            } else {
                toast.error('Failed to update order.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSendReply = async () => {
        setIsReplying(true);
        try {
            const res = await fetch(`/api/orders/${order._id}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: replyMessage }),
            });
            if (res.ok) {
                toast.success('Reply sent successfully.');
                setShowReplyModal(false);
                setReplyMessage('');
            } else {
                toast.error('Failed to send reply.');
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setIsReplying(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">Manage Order</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Order Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white font-sans"
                        >
                            <option value="Pending Payment">Pending Payment</option>
                            <option value="Payment Confirmed">Payment Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Shipping Cost ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={shippingCost}
                            onChange={(e) => setShippingCost(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-sans"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tracking Number</label>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-sans"
                            placeholder="e.g. USPS 123456789"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Status Message (Sent to Customer)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-24 font-sans"
                            placeholder="e.g. Your payment has been received. Your order is now being prepared for shipment."
                        />
                    </div>
                    <div className="flex gap-4 pt-2">
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={handleUpdateStatus}
                            isLoading={isUpdating}
                        >
                            Update & Notify
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowReplyModal(true)}
                        >
                            Custom Reply
                        </Button>
                    </div>
                </div>
            </div>

            {showReplyModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 animate-scale-in">
                        <h2 className="text-xl font-bold text-dark mb-2">Reply to Order #{order.orderNumber}</h2>
                        <p className="text-sm text-gray-500 mb-6">This message will be sent to {order.guestEmail}</p>
                        <div className="space-y-4">
                            <textarea
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-48 font-sans"
                                placeholder="Write your message here..."
                            />
                            <div className="flex gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowReplyModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleSendReply}
                                    isLoading={isReplying}
                                >
                                    Send Email
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
