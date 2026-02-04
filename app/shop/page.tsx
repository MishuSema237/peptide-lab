'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/Card';

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');

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

                console.log('=== SHOP PAGE DEBUG ===');
                console.log('API Response:', prodData);
                console.log('Total products from API:', prodData.data?.length);
                console.log('All products:', prodData.data);

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

    const priceLimit = maxPrice === '' ? Infinity : parseFloat(maxPrice);
    let filteredProducts = products.filter((p: any) =>
        p.price <= priceLimit &&
        (selectedCategory === 'All' || p.category === selectedCategory)
    );

    // Apply sorting
    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-dark">Shop Peptides</h1>
                <p className="text-gray-500 mt-1">Found {filteredProducts.length} products</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Collapsible Filters */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
                        {/* Filter Header */}
                        <button
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all"
                        >
                            <h3 className="font-bold text-lg text-dark flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters
                            </h3>
                            <svg
                                className={`w-5 h-5 text-gray-600 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Filter Content */}
                        <div className={`transition-all duration-300 ${filtersOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            <div className="p-6 space-y-6">
                                {/* Categories */}
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Categories</h4>
                                    <ul className="space-y-1">
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`text-left w-full py-2 px-3 rounded-md transition-colors text-sm ${selectedCategory === cat
                                                        ? 'bg-primary text-white font-bold shadow-sm'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price Filter */}
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Max Price</h4>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                        <input
                                            type="number"
                                            placeholder="Any price"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Leave empty for no limit</p>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-700 mb-3">Sort By</h4>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                                    >
                                        <option value="default">Default Sorting</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest Arrivals</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                <button
                                    onClick={() => { setMaxPrice(''); setSelectedCategory('All'); setSortBy('default'); }}
                                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm"
                                >
                                    Clear All Filters
                                </button>
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
                                onClick={() => { setMaxPrice(''); setSelectedCategory('All'); }}
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
