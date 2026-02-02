import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Order from '@/models/Order';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const { status, trackingNumber, notes, shippingCost, sendEmail: shouldNotify } = await request.json();

        await connectDB();

        // Calculate new total if shipping cost is provided
        const updateData: any = { status, trackingNumber, notes };
        if (shippingCost !== undefined) {
            const existingOrder = await Order.findById(id);
            if (existingOrder) {
                const newTotal = existingOrder.subtotal + (parseFloat(shippingCost) || 0);
                updateData.shippingCost = parseFloat(shippingCost) || 0;
                updateData.total = newTotal;
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedOrder) return NextResponse.json({ message: 'Order not found' }, { status: 404 });

        if (shouldNotify) {
            try {
                await sendEmail({
                    to: updatedOrder.guestEmail,
                    ...emailTemplates.orderStatusUpdate(updatedOrder.orderNumber, status, notes || 'Your order status has changed.'),
                });
            } catch (emailError) {
                console.error('Failed to notify customer:', emailError);
            }
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
    }
}
