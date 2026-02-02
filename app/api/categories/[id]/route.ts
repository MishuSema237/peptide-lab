import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Category from '@/models/Category';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name, description } = await request.json();
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        await connectDB();
        const category = await Category.findByIdAndUpdate(
            params.id,
            { name, slug, description },
            { new: true }
        );

        if (!category) return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating category' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const category = await Category.findByIdAndDelete(params.id);
        if (!category) return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        return NextResponse.json({ message: 'Category deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
    }
}
