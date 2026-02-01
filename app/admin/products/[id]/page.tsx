import { notFound } from 'next/navigation';
import connectDB from '@/lib/db/mongodb';
import Product from '@/models/Product';
import ProductForm from '@/app/admin/products/components/ProductForm';

async function getProduct(id: string) {
    try {
        await connectDB();
        const product = await Product.findById(id);
        if (!product) return null;
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        return null;
    }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-dark mb-8">Edit Product</h1>
            <ProductForm initialData={product} isEdit={true} />
        </div>
    );
}
