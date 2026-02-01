import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { items, shippingInfo, paymentMethod, userId, total } = body;

        // Generate Order Number (Simple timestamp + random for now)
        const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

        // Create Order
        const newOrder = await Order.create({
            orderNumber,
            userId, // Optional
            guestEmail: shippingInfo.email,
            items,
            total,
            shippingInfo,
            paymentMethod,
            status: 'Pending Payment',
        });

        // Send Confirmation Email to User
        try {
            await sendEmail({
                to: shippingInfo.email,
                ...emailTemplates.orderConfirmation(orderNumber, items, total),
            });
        } catch (emailError) {
            console.error('Failed to send user confirmation email:', emailError);
        }

        // Send Notification Email to Admin
        try {
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@peptidelab.com';
            await sendEmail({
                to: adminEmail,
                ...emailTemplates.orderNotificationAdmin(orderNumber, shippingInfo.email, items, total),
            });
        } catch (emailError) {
            console.error('Failed to send admin notification email:', emailError);
        }

        return NextResponse.json({
            success: true,
            orderNumber,
            id: newOrder._id
        }, { status: 201 });

    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}
