import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PaymentMethod from '@/models/PaymentMethod';
import { isAdmin } from '@/lib/auth';

export async function GET() {
    try {
        await connectDB();
        const methods = await PaymentMethod.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: methods });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch methods' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        if (!await isAdmin()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.details) {
            return NextResponse.json({ error: 'Name and Details are required' }, { status: 400 });
        }

        const method = await PaymentMethod.create(body);
        return NextResponse.json({ success: true, data: method }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
