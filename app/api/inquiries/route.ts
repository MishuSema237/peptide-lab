import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import ContactInquiry from '@/models/ContactInquiry';

export async function GET() {
    try {
        await connectDB();
        const inquiries = await ContactInquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json(inquiries);
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
    }
}