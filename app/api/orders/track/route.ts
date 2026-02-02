import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const orderNumber = searchParams.get('orderNumber');

        if (!email || !orderNumber) {
            return NextResponse.json({ message: 'Missing email or order number' }, { status: 400 });
        }

        // Normalize inputs
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedOrderNumber = orderNumber.trim().replace(/^#/, ''); // Remove # prefix if present

        await connectDB();

        // Debug: Log the search parameters
        console.log('Searching for order:', { normalizedOrderNumber, normalizedEmail });

        const order = await Order.findOne({
            orderNumber: normalizedOrderNumber,
            $or: [
                { 'shippingInfo.email': normalizedEmail },
                { guestEmail: normalizedEmail }
            ]
        });

        // Debug: Log what we found
        console.log('Found order:', order ? order.orderNumber : 'Not found');
        if (!order) {
            // Log all orders with this order number for debugging
            const allOrdersWithNumber = await Order.find({ orderNumber: normalizedOrderNumber });
            console.log('All orders with this number:', allOrdersWithNumber.length);
            if (allOrdersWithNumber.length > 0) {
                console.log('Emails stored:', allOrdersWithNumber.map(o => ({ guestEmail: o.guestEmail, shippingEmail: o.shippingInfo?.email })));
            }
        }

        if (!order) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error('Track order error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
