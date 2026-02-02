import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET() {
    try {
        await connectDB();
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching testimonials' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectDB();
        const testimonial = await Testimonial.create(body);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating testimonial' }, { status: 500 });
    }
}
