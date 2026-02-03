'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const { addItem } = useCartStore();

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                const data = await res.json();
                console.log('Product API Response:', data); // Debug log
                setProduct(data.success ? data.data : null);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder-product.jpg',
            quantity: quantity
        };

        addItem(cartItem);
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Product not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-md">
                        {product.images && product.images.length > 0 ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-full aspect-square max-w-md flex items-center justify-center bg-gray-100 rounded-lg">
                                <span className="text-gray-400">No image available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <span className="text-secondary font-medium tracking-wide text-sm uppercase">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-heading font-bold text-dark mt-2 mb-4">
                        {product.name}
                    </h1>
                    <div className="text-3xl font-bold text-primary mb-6">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between py-3 border-b">
                            <span className="font-semibold text-gray-700">SKU</span>
                            <span className="text-gray-600">{product.sku || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="font-semibold text-gray-700">Purity</span>
                            <span className="text-gray-600">{product.purity || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <div className="w-24">
                            <label className="sr-only">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                min={1}
                                className="w-full px-4 py-3 border rounded-lg text-center"
                            />
                        </div>
                        <Button
                            size="lg"
                            className="flex-1"
                            onClick={handleAddToCart}
                            disabled={!product.stock || product.soldout_status}
                        >
                            {product.stock && !product.soldout_status ? 'Add to Cart' : 'Sold Out'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
