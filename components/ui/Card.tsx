'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
    purity?: string;
    sku?: string;
}

export default function ProductCard({ id, name, price, image, category, inStock, purity, sku }: ProductCardProps) {

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                    src={image || '/images/placeholder-product.jpg'}
                    alt={name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                {!inStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-error text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">OUT OF STOCK</span>
                    </div>
                )}
                {category && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-primary/20">
                            {category}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-lg font-heading font-bold text-dark line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                        {purity && (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{purity} Purity</span>
                        )}
                        {sku && (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SKU: {sku}</span>
                        )}
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
{inStock ? (
                        <Link href={`/products/${id}`}>
                            <Button
                                size="sm"
                                className="bg-secondary hover:bg-secondary-600 text-dark font-bold px-4 transition-all active:scale-95"
                            >
                                Details
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            size="sm"
                            className="bg-gray-200 cursor-not-allowed text-gray-500 font-bold px-4"
                            disabled
                        >
                            Sold Out
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
