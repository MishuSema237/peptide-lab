import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import ContactInquiry from '@/models/ContactInquiry';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const inquiry = await ContactInquiry.findById(id);
        
        if (!inquiry) {
            return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
        }
        
        return NextResponse.json(inquiry);
    } catch (error) {
        console.error('Error fetching inquiry:', error);
        return NextResponse.json({ error: 'Failed to fetch inquiry' }, { status: 500 });
    }
}