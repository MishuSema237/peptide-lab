'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/Card';

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(250);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories')
                ]);
                const prodData = await prodRes.json();
                const catData = await catRes.json();

                setProducts(prodData.data || []);
                setCategories(['All', ...catData.map((c: any) => c.name)]);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter((p: any) =>
        p.price <= maxPrice &&
        (selectedCategory === 'All' || p.category === selectedCategory)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-dark">Shop Peptides</h1>
                    <p className="text-gray-500 mt-1">Found {filteredProducts.length} products</p>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Default Sorting</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-1">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left w-full py-2 px-3 rounded-md transition-colors ${selectedCategory === cat
                                            ? 'bg-primary/10 text-primary font-bold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Price Range</h3>
                                <span className="text-primary font-bold px-2 py-1 bg-primary/5 rounded text-sm">${maxPrice}</span>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-gray-500 font-medium">
                                    <span>$0</span>
                                    <span>$200+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-[400px] bg-gray-100 rounded-2xl"></div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product: any) => (
                                <ProductCard key={product._id} {...product} id={product._id} inStock={!product.soldout_status} image={product.images?.[0] || '/images/placeholder-product.jpg'} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                            <button
                                onClick={() => { setMaxPrice(250); setSelectedCategory('All'); }}
                                className="mt-4 text-primary font-bold underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-12 flex justify-center space-x-2">
                            <button className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-4 py-2 bg-primary text-white rounded">1</button>
                            <button className="px-4 py-2 border rounded hover:bg-gray-50">2</button>
                            <button className="px-4 py-2 border rounded hover:bg-gray-50">next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
