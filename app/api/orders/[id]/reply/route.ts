import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { message } = await request.json();

        await connectDB();
        const order = await Order.findById(id);
        if (!order) return NextResponse.json({ message: 'Order not found' }, { status: 404 });

        await sendEmail({
            to: order.guestEmail,
            ...emailTemplates.customReply(order.orderNumber, message),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Error sending reply' }, { status: 500 });
    }
}
