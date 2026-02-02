import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Category from '@/models/Category';

export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find({}).sort({ name: 1 });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, description } = await request.json();
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        await connectDB();
        const category = await Category.create({ name, slug, description });
        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
    }
}
