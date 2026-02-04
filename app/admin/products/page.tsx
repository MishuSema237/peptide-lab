'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data.success ? data.data : []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-dark">Products</h1>
                    <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Add New Product
                    </Link>
                </div>
                <div className="text-center py-8">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-dark">Products</h1>
                <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                    <span className="hidden sm:inline">Add New Product</span>
                    <span className="sm:hidden">Add Product</span>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.length > 0 ? (
                                products.map((product: any) => (
                                    <tr key={product._id}>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 relative bg-gray-100 rounded-md">
                                                    {product.images && product.images[0] ? (
                                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover rounded-md" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div className="ml-2 md:ml-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[120px] md:max-w-none">{product.name}</div>
                                                    <div className="text-xs text-gray-500">ID: {product._id.toString().slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                            {product.category}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${product.price ? product.price.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {product.stock}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/admin/products/${product._id}`} className="text-primary hover:text-primary-600">Edit</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No products found. Add your first product!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
