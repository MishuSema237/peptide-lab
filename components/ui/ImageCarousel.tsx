'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, images.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    // Fallback if no images
    if (!images || images.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-md flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-gray-400">No image available</span>
                </div>
            </div>
        );
    }

    // Single image - no carousel controls
    if (images.length === 1) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-md">
                    <Image
                        src={images[0]}
                        alt={alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        );
    }

    // Multiple images - full carousel
    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                    <Image
                        src={images[currentIndex]}
                        alt={`${alt} - Image ${currentIndex + 1}`}
                        fill
                        className="object-contain transition-opacity duration-300"
                        priority={currentIndex === 0}
                    />

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-dark p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                        aria-label="Previous image"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-dark p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                        aria-label="Next image"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToIndex(idx)}
                        className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex
                                ? 'border-primary ring-2 ring-primary/20 scale-105'
                                : 'border-gray-200 hover:border-gray-400'
                            }`}
                        aria-label={`View image ${idx + 1}`}
                    >
                        <Image
                            src={img}
                            alt={`${alt} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
