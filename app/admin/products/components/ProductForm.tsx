'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { uploadImage } from '@/lib/supabase';
import Image from 'next/image';

const productSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    price: z.number().min(0, 'Price must be positive'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(10, 'Description is required'),
    stock: z.number().int().min(0, 'Stock must be 0 or more'),
    sku: z.string().optional(),
    purity: z.string().optional(),
    sequence: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(initialData?.images?.[0] || '');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: Number(initialData.price), // Ensure number
        } : {
            stock: 0,
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            let imageUrl = initialData?.images?.[0]; // Keep existing if no new one

            // Upload image if selected
            if (imageFile) {
                imageUrl = await uploadImage(imageFile, 'products');
            }

            const payload = {
                ...data,
                images: imageUrl ? [imageUrl] : [],
                slug: data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            };

            const url = isEdit ? `/api/products/${initialData._id}` : '/api/products';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save product');

            router.push('/admin/products');
            router.refresh();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Product Information</h2>

                        <Input
                            label="Product Name"
                            {...register('name')}
                            error={errors.name?.message}
                        />

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-dark mb-2">Description</label>
                            <textarea
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                {...register('description')}
                            ></textarea>
                            {errors.description && <p className="mt-1 text-sm text-error">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Pricing & Inventory</h2>

                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Price ($)"
                                type="number"
                                step="0.01"
                                {...register('price', { valueAsNumber: true })}
                                error={errors.price?.message}
                            />
                            <Input
                                label="Stock Quantity"
                                type="number"
                                {...register('stock', { valueAsNumber: true })}
                                error={errors.stock?.message}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-6">
                            <Input
                                label="SKU"
                                {...register('sku')}
                            />
                            <Input
                                label="Category"
                                {...register('category')}
                                error={errors.category?.message}
                                placeholder="e.g. Recovery"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Specifications</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Purity"
                                placeholder="e.g. ≥99.0%"
                                {...register('purity')}
                            />
                            <Input
                                label="Sequence"
                                placeholder="Amino acid sequence"
                                {...register('sequence')}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Product Image</h2>

                        <div className="mb-4">
                            {previewUrl ? (
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                                    <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                                </div>
                            ) : (
                                <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <span className="text-gray-400">No image selected</span>
                                </div>
                            )}
                        </div>

                        <label className="block">
                            <span className="sr-only">Choose file</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-primary
                  hover:file:bg-blue-100
                "
                            />
                        </label>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Actions</h2>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                className="flex-1"
                            >
                                {isEdit ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
