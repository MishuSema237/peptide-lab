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
import toast from 'react-hot-toast';

const productSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    price: z.number().min(0, 'Price must be positive'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(10, 'Description is required'),
    stock: z.number().int().min(0, 'Stock must be 0 or more'),
    sku: z.string().optional(),
    purity: z.string().optional(),
    content: z.string().optional(),
    size: z.string().optional(),
    form: z.string().optional(),
    soldout_status: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>(initialData?.images || []);
    const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: Number(initialData.price),
            soldout_status: initialData.soldout_status || false,
        } : {
            stock: 0,
            soldout_status: false,
        },
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImageFiles([...imageFiles, ...filesArray]);

            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls([...previewUrls, ...newPreviews]);
        }
    };

    const removePreviewImage = (index: number) => {
        const urlToRemove = previewUrls[index];

        // If it's an existing image (URL string), mark for removal
        if (initialData?.images?.includes(urlToRemove)) {
            setImagesToRemove([...imagesToRemove, urlToRemove]);
        }

        // Remove from preview
        const newPreviews = previewUrls.filter((_, i) => i !== index);
        setPreviewUrls(newPreviews);

        // Remove from new files if it's a new upload
        const newFileIndex = index - (initialData?.images?.length || 0) + imagesToRemove.length;
        if (newFileIndex >= 0 && newFileIndex < imageFiles.length) {
            const newFiles = imageFiles.filter((_, i) => i !== newFileIndex);
            setImageFiles(newFiles);
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            // Upload all new images
            const uploadedUrls: string[] = [];

            if (imageFiles.length > 0) {
                toast.loading(`Uploading ${imageFiles.length} image(s)...`, { id: 'upload' });

                for (const file of imageFiles) {
                    const uploadFormData = new FormData();
                    uploadFormData.append('file', file);

                    const uploadRes = await fetch('/api/upload', {
                        method: 'POST',
                        body: uploadFormData,
                    });

                    if (!uploadRes.ok) {
                        const errorData = await uploadRes.json();
                        throw new Error(errorData.error || 'Image upload failed');
                    }

                    const uploadData = await uploadRes.json();
                    uploadedUrls.push(uploadData.url);
                }

                toast.dismiss('upload');
            }

            // Combine existing images (not marked for removal) with new uploads
            const existingImages = initialData?.images?.filter(
                (img: string) => !imagesToRemove.includes(img)
            ) || [];

            const finalImages = [...existingImages, ...uploadedUrls];

            // Generate slug - keep existing slug when editing, create new one for new products
            const baseSlug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const slug = isEdit && initialData?.slug ? initialData.slug : `${baseSlug}-${Date.now()}`;

            const payload = {
                ...data,
                images: finalImages,
                slug,
            };

            const url = isEdit ? `/api/products/${initialData._id}` : '/api/products';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save product');

            toast.success(isEdit ? 'Product updated successfully' : 'Product created successfully');
            router.push('/admin/products');
            router.refresh();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Failed to save product. Please try again.');
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
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium text-dark mb-2">Category</label>
                                <select
                                    {...register('category')}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="mt-1 text-sm text-error">{errors.category.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Specifications & Status</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <Input
                                label="Purity"
                                placeholder="e.g. ≥99.0"
                                {...register('purity')}
                            />
                            <Input
                                label="Content"
                                placeholder="e.g. 10mg, 5 vials"
                                {...register('content')}
                            />
                            <Input
                                label="Size"
                                placeholder="e.g. 2ml, 5mg/vial"
                                {...register('size')}
                            />
                            <Input
                                label="Form"
                                placeholder="e.g. Lyophilized powder"
                                {...register('form')}
                            />
                        </div>
                        <div className="flex flex-col justify-center mt-6">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('soldout_status')}
                                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-sm font-bold text-gray-700">Mark as Sold Out</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6">Product Images</h2>

                        {/* Image Previews Grid */}
                        {previewUrls.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border group">
                                        <Image src={url} alt={`Preview ${index + 1}`} fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removePreviewImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            aria-label="Remove image"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
                                <span className="text-gray-400">No images selected</span>
                            </div>
                        )}

                        <label className="block">
                            <span className="sr-only">Choose files</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
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
                        <p className="text-xs text-gray-500 mt-2">You can select multiple images. The first image will be the main product image.</p>
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
