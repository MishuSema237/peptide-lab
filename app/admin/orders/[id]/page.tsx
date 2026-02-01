import { notFound } from 'next/navigation';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';
import Image from 'next/image';
import Button from '@/components/ui/Button';

async function getOrder(id: string) {
    try {
        await connectDB();
        const order = await Order.findById(id);
        if (!order) return null;
        return JSON.parse(JSON.stringify(order));
    } catch (error) {
        return null;
    }
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) {
        notFound();
    }

    // TODO: Implement client component for status updates and emails
    // For now, this is a read-only view server component

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-dark mb-2">Order #{order.orderNumber}</h1>
                    <p className="text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex gap-4">
                    {/* Placeholder buttons for now */}
                    <Button variant="outline">Email Customer</Button>
                    <Button variant="primary">Update Status</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Order Items</h2>
                        <div className="space-y-4">
                            {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex gap-4 py-4 border-b last:border-0">
                                    <div className="relative w-16 h-16 bg-gray-50 rounded-md">
                                        {item.image && <Image src={item.image} alt={item.name} fill className="object-contain p-1" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-dark">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">SKU: {item.productId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-dark">${item.price.toFixed(2)} x {item.quantity}</p>
                                        <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end text-xl font-bold text-dark">
                            Total: ${order.total.toFixed(2)}
                        </div>
                    </div>

                    {/* Timeline / Notes */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Order Notes</h2>
                        <p className="text-gray-500 italic">{order.notes || 'No notes available.'}</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4">Customer Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <a href={`mailto:${order.guestEmail}`} className="text-primary hover:underline">{order.guestEmail}</a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{order.shippingInfo.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                        <address className="not-italic text-gray-600">
                            {order.shippingInfo.address}<br />
                            {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}<br />
                            {order.shippingInfo.country}
                        </address>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                        <p className="font-medium text-dark capitalize">{order.paymentMethod.replace(/-/g, ' ')}</p>
                        <p className="mt-4 text-sm text-gray-500">
                            Status: <span className="font-semibold text-primary">{order.status}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
