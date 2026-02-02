'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { useCartStore } from '@/lib/store/cart';

const MOCK_PRODUCTS = [
    { id: '1', name: 'BPC-157 10mg', category: 'Recovery' },
    { id: '2', name: 'TB-500 5mg', category: 'Recovery' },
    { id: '3', name: 'Semaglutide 5mg', category: 'Weight Loss' },
    { id: '4', name: 'Ipamorelin 5mg', category: 'Performance' },
    { id: '5', name: 'CJC-1295 5mg', category: 'Performance' },
    { id: '6', name: 'Melanotan II 10mg', category: 'Lifestyle' },
    { id: '7', name: 'Tirzepatide 10mg', category: 'Weight Loss' },
    { id: '8', name: 'Retatrutide 10mg', category: 'Research' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { getItemCount } = useCartStore();
    const cartCount = getItemCount();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ id: string, name: string, category: string }[]>([]);
    const [mounted, setMounted] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        const filtered = MOCK_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
    }, [searchQuery]);

    // Close search on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Do not show Navbar on admin pages
    if (pathname && (pathname.startsWith('/admin') || pathname === '/admin-login')) return null;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-primary text-white py-2">
                <div className="container mx-auto px-4">
                    <p className="text-sm text-center font-sans tracking-wide">
                        Lab-Tested • Research-Backed • Made for Advanced Research
                    </p>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20 relative">

                    {/* LEFT: Nav Links (Desktop Only) */}
                    <div className="hidden lg:flex items-center space-x-8 flex-1">
                        <Link href="/" className="text-dark hover:text-primary transition-colors font-medium font-sans">
                            Home
                        </Link>
                        <Link href="/shop" className="text-dark hover:text-primary transition-colors font-medium font-sans">
                            Products
                        </Link>
                        <Link href="/about" className="text-dark hover:text-primary transition-colors font-medium font-sans">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-dark hover:text-primary transition-colors font-medium font-sans">
                            Contact Us
                        </Link>
                    </div>

                    {/* CENTER: Logo (Desktop Only: Absolute Centered) */}
                    <Link href="/" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center">
                        <div className="text-3xl md:text-4xl font-heading text-primary whitespace-nowrap">
                            PeptideLab
                        </div>
                    </Link>

                    {/* RIGHT: Search, Account, Cart (Desktop) / Mobile Toggle */}
                    <div className="flex items-center justify-end space-x-2 md:space-x-4 flex-1">
                        {/* Icons - Hidden on Mobile, Visible on Desktop */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <div className="relative" ref={searchRef}>
                                <button
                                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${searchOpen ? 'text-primary bg-gray-50' : 'text-dark'}`}
                                    aria-label="Search"
                                    onClick={() => setSearchOpen(!searchOpen)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                {/* FLOATING SEARCH OVERLAY */}
                                {searchOpen && (
                                    <div className="absolute right-0 top-full mt-4 w-96 bg-white shadow-2xl rounded-2xl border border-gray-100 p-6 animate-slide-up overflow-hidden">
                                        <div className="relative mb-4">
                                            <input
                                                type="text"
                                                placeholder="Search research compounds..."
                                                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-dark font-bold placeholder:text-gray-400"
                                                autoFocus
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>

                                        {/* RESULTS AREA */}
                                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                            {searchQuery.trim() !== '' ? (
                                                searchResults.length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {searchResults.map((product) => (
                                                            <Link
                                                                key={product.id}
                                                                href={`/products/${product.id}`}
                                                                onClick={() => setSearchOpen(false)}
                                                                className="p-3 bg-gray-50 hover:bg-primary/5 rounded-xl border border-transparent hover:border-primary/20 transition-all text-sm font-bold text-dark text-center line-clamp-1"
                                                            >
                                                                {product.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="py-8 text-center">
                                                        <p className="text-gray-400 text-sm">No results found for "{searchQuery}"</p>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="py-4">
                                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Popular Searches</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['BPC-157', 'TB-500', 'Semaglutide'].map((tag) => (
                                                            <button
                                                                key={tag}
                                                                onClick={() => setSearchQuery(tag)}
                                                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-bold text-gray-600 transition-colors"
                                                            >
                                                                {tag}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/track-order" className="text-dark hover:text-primary transition-colors font-medium font-sans">
                                Track Order
                            </Link>

                            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Shopping Cart">
                                <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-accent text-dark text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {mounted ? cartCount : 0}
                                </span>
                            </Link>
                        </div>

                        {/* Mobile Menu Button - Visible on Mobile Only */}
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-7 h-7 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-6 border-t border-gray-100 animate-slide-down bg-white shadow-xl rounded-b-2xl mb-4">
                        <div className="flex flex-col space-y-5 px-4">
                            <Link href="/" className="text-xl text-dark hover:text-primary transition-colors font-medium font-sans" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </Link>
                            <Link href="/shop" className="text-xl text-dark hover:text-primary transition-colors font-medium font-sans" onClick={() => setMobileMenuOpen(false)}>
                                Products
                            </Link>
                            <Link href="/about" className="text-xl text-dark hover:text-primary transition-colors font-medium font-sans" onClick={() => setMobileMenuOpen(false)}>
                                About Us
                            </Link>
                            <Link href="/contact" className="text-xl text-dark hover:text-primary transition-colors font-medium font-sans" onClick={() => setMobileMenuOpen(false)}>
                                Contact Us
                            </Link>

                            <hr className="border-gray-100 my-2" />

                            <div className="flex items-center space-x-8 pt-2">
                                <Link href="/cart" className="flex items-center space-x-2 text-dark" onClick={() => setMobileMenuOpen(false)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="font-medium font-sans font-bold">Cart ({mounted ? cartCount : 0})</span>
                                </Link>

                                <Link href="/track-order" className="flex items-center space-x-2 text-dark" onClick={() => setMobileMenuOpen(false)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span className="font-medium font-sans font-bold">Track Order</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
