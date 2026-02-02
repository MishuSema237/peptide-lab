'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Do not show Footer on admin pages
    if (pathname && (pathname.startsWith('/admin') || pathname === '/admin-login')) return null;

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribeStatus('loading');

        // TODO: Implement newsletter subscription API
        setTimeout(() => {
            setSubscribeStatus('success');
            setEmail('');
            setTimeout(() => setSubscribeStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-heading mb-4">PeptideLab</h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Clinically tested, GMP manufactured, batch-specific COAs — delivering
                            premium peptides for clinics, athletes, and health innovators.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-heading text-lg mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/shop?category=performance" className="text-gray-300 hover:text-accent transition-colors">
                                    Performance
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=recovery" className="text-gray-300 hover:text-accent transition-colors">
                                    Recovery
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=weight-loss" className="text-gray-300 hover:text-accent transition-colors">
                                    Weight Loss
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-heading text-lg mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-accent transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="text-gray-300 hover:text-accent transition-colors">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin-login" className="text-gray-300 hover:text-accent transition-colors">
                                    Admin Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-heading text-lg mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund-policy" className="text-gray-300 hover:text-accent transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-gray-300 hover:text-accent transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-300 hover:text-accent transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-primary-400">
                    <div className="max-w-md">
                        <h4 className="font-semibold text-lg mb-2">Newsletter</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            Be the first to know about new collections, exclusive offers, and the latest in peptide science.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex md:flex-row flex-col gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-2 rounded-lg bg-white text-dark focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-accent text-dark font-semibold rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                        {subscribeStatus === 'success' && (
                            <p className="text-accent text-sm mt-2">✓ Successfully subscribed!</p>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-primary-400 text-center text-gray-300 text-sm">
                    <p>© {new Date().getFullYear()} PeptideLab | All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
