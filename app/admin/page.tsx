import { redirect } from 'next/navigation';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { cookies } from 'next/headers';

async function getStats() {
    await connectDB();

    const totalOrders = await Order.countDocuments();
    const pendingOrdersCount = await Order.countDocuments({ status: 'Pending Payment' });
    const totalProducts = await Product.countDocuments();
    const totalRevenueResult = await Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    return {
        totalOrders,
        pendingOrdersCount,
        totalProducts,
        totalRevenue,
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
    };
}

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'true') {
        redirect('/admin-login');
    }

    const stats = await getStats();

    return (
        <div>
            <h1 className="text-2xl font-bold text-dark mb-8">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Revenue</h3>
                        <span className="p-2 bg-green-100 text-green-600 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-dark">${stats.totalRevenue.toFixed(2)}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Orders</h3>
                        <span className="p-2 bg-blue-100 text-blue-600 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{stats.totalOrders}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Pending Payments</h3>
                        <span className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{stats.pendingOrdersCount}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Products</h3>
                        <span className="p-2 bg-purple-100 text-purple-600 rounded-full">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-3xl font-bold text-dark">{stats.totalProducts}</p>
                </div>
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-bold text-dark mb-6">Recent Orders</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order: any) => (
                                    <tr key={order._id}>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-primary">
                                            #{order.orderNumber}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-900">
                                            <div className="truncate max-w-[120px] md:max-w-none">
                                                {order.guestEmail || order.userId || 'Guest'}
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${order.total.toFixed(2)}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'Payment Confirmed' ? 'bg-indigo-100 text-indigo-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-3 md:px-6 py-4 text-center text-sm text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
