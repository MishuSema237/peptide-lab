import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PaymentMethod from '@/models/PaymentMethod';
import { isAdmin } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        if (!await isAdmin()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();
        const body = await req.json();

        const method = await PaymentMethod.findByIdAndUpdate(id, body, { new: true });

        if (!method) {
            return NextResponse.json({ error: 'Method not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: method });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        if (!await isAdmin()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const method = await PaymentMethod.findByIdAndDelete(id);

        if (!method) {
            return NextResponse.json({ error: 'Method not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
