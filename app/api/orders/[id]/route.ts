import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';
import { isAdmin } from '@/lib/auth';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const isUserAdmin = await isAdmin();
        if (!isUserAdmin) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const order = await Order.findById(id);
        
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const isUserAdmin = await isAdmin();
        if (!isUserAdmin) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();
        const { status, trackingNumber, note } = body;

        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        // Update fields
        if (status) order.status = status;
        if (trackingNumber) order.trackingNumber = trackingNumber;
        if (note) order.notes = note; // Simple append or replace logic could go here

        await order.save();

        // Send email notification based on status
        try {
            if (status && status !== 'Pending Payment') {
                const message = `Your order status has been updated to ${status}.${trackingNumber ? ` Tracking Number: ${trackingNumber}` : ''}`;

                await sendEmail({
                    to: order.guestEmail || order.userId, // fallback if userId is email, simplified
                    ...emailTemplates.orderStatusUpdate(order.orderNumber, status, message)
                });
            }
        } catch (emailError) {
            console.error('Failed to send status update email:', emailError);
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
