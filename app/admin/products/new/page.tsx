'use client';

import ProductForm from '@/app/admin/products/components/ProductForm';

export default function NewProductPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-dark mb-8">Add New Product</h1>
            <ProductForm />
        </div>
    );
}
