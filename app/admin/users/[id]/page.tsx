import { notFound } from 'next/navigation';
import connectDB from '@/lib/db/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import Link from 'next/link';

async function getUser(id: string) {
    try {
        await connectDB();
        const user = await User.findById(id);
        if (!user) return null;

        // Fetch user orders too
        const orders = await Order.find({ userId: user.auth0Id || user._id }).sort({ createdAt: -1 });

        return {
            user: JSON.parse(JSON.stringify(user)),
            orders: JSON.parse(JSON.stringify(orders))
        };
    } catch (error) {
        return null;
    }
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getUser(id);

    if (!data) {
        notFound();
    }

    const { user, orders } = data;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-dark mb-8">User Details</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-500">Full Name</label>
                        <p className="font-medium text-dark">{user.name || 'N/A'}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Email Address</label>
                        <p className="font-medium text-dark">{user.email}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Role</label>
                        <p className="font-medium capitalize">{user.role}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Joined Date</label>
                        <p className="font-medium text-dark">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Auth0 ID</label>
                        <p className="font-medium text-gray-400 text-sm truncate">{user.auth0Id}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold mb-6">Order History ({orders.length})</h2>
                {orders.length > 0 ? (
                    <div className="overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order: any) => (
                                    <tr key={order._id}>
                                        <td className="px-4 py-3 text-sm font-medium text-primary">
                                            <Link href={`/admin/orders/${order._id}`}>#{order.orderNumber}</Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {order.status}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right font-medium">
                                            ${order.total.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No orders found for this user.</p>
                )}
            </div>
        </div>
    );
}
