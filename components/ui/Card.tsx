'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    inStock?: boolean;
}

export default function ProductCard({
    id,
    name,
    price,
    image,
    category,
    inStock = true,
}: ProductCardProps) {
    return (
        <Link href={`/products/${id}`}>
            <div className="card p-4 group cursor-pointer h-full flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                    {category && (
                        <p className="text-xs text-secondary font-medium uppercase tracking-wide mb-1">
                            {category}
                        </p>
                    )}
                    <h3 className="font-semibold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {name}
                    </h3>
                    <div className="mt-auto">
                        <p className="text-2xl font-bold text-primary">
                            ${price.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        // TODO: Add to cart functionality
                    }}
                    disabled={!inStock}
                    className="mt-4 w-full bg-accent text-dark font-semibold py-2 px-4 rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </Link>
    );
}
