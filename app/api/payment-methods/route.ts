import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import PaymentMethod from '@/models/PaymentMethod';
import { isAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        // Public can request active methods
        const { searchParams } = new URL(req.url);
        const activeOnly = searchParams.get('active') === 'true';

        const query = activeOnly ? { active: true } : {};
        const methods = await PaymentMethod.find(query);

        return NextResponse.json({ success: true, data: methods });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const isUserAdmin = await isAdmin();
        if (!isUserAdmin) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();
        const method = await PaymentMethod.create(body);

        return NextResponse.json({ success: true, data: method }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
