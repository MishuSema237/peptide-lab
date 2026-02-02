import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Testimonial from '@/models/Testimonial';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        await connectDB();
        const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
        if (!testimonial) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating testimonial' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) return NextResponse.json({ message: 'Not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting testimonial' }, { status: 500 });
    }
}
