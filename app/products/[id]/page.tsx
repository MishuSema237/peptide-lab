'use client';

import { useState, useEffect } from 'react';
import ImageCarousel from '@/components/ui/ImageCarousel';
import Button from '@/components/ui/Button';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductCard from '@/components/ui/Card';
import { useCartStore } from '@/lib/store/cart';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const { addItem } = useCartStore();

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                const data = await res.json();
                console.log('Product API Response:', data); // Debug log
                const productData = data.success ? data.data : null;
                setProduct(productData);

                // Fetch related products from same category
                if (productData?.category) {
                    const relatedRes = await fetch('/api/products');
                    const relatedData = await relatedRes.json();
                    const related = (relatedData.data || [])
                        .filter((p: any) =>
                            p.category === productData.category &&
                            p._id !== productData._id
                        )
                        .slice(0, 4); // Limit to 4 products
                    setRelatedProducts(related);
                }
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
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: product.name }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Images Carousel */}
                <ImageCarousel
                    images={product.images && product.images.length > 0 ? product.images : []}
                    alt={product.name}
                />

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

                    {/* Specifications Table */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-dark mb-4 uppercase tracking-wider border-b-2 border-primary pb-2">
                            Product Specifications
                        </h3>
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden border border-gray-200">
                            <table className="w-full">
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide w-1/3 bg-gray-100/50">
                                            Product Code
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-mono font-semibold">
                                            {product.sku || 'N/A'}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                            Purity Level
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                                {product.purity ? `${product.purity}%` : 'N/A'}
                                            </span>
                                        </td>
                                    </tr>
                                    {product.content && (
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                                Content
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {product.content}
                                            </td>
                                        </tr>
                                    )}
                                    {product.size && (
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                                Size
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {product.size}
                                            </td>
                                        </tr>
                                    )}
                                    {product.form && (
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide bg-gray-100/50">
                                                Form
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                {product.form}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-3xl font-heading font-bold text-dark mb-8">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((relatedProduct: any) => (
                            <ProductCard
                                key={relatedProduct._id}
                                id={relatedProduct._id}
                                name={relatedProduct.name}
                                price={relatedProduct.price}
                                image={relatedProduct.images?.[0] || '/images/placeholder-product.jpg'}
                                category={relatedProduct.category}
                                inStock={!relatedProduct.soldout_status}
                                purity={relatedProduct.purity}
                                sku={relatedProduct.sku}
                                content={relatedProduct.content}
                                size={relatedProduct.size}
                                form={relatedProduct.form}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
