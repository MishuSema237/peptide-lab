import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import ContactInquiry from '@/models/ContactInquiry';
import { isAdmin } from '@/lib/auth';
import { sendEmail, emailTemplates } from '@/lib/email/nodemailer';

export async function GET(req: NextRequest) {
    try {
        const isUserAdmin = await isAdmin();
        if (!isUserAdmin) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: inquiries });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Validate request
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
        }

        const inquiry = await ContactInquiry.create(body);

        // Optional: Send auto-response email to user
        // Optional: Send notification to admin

        return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
