'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import Button from '@/components/ui/Button';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
    const subtotal = getCartTotal();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-heading font-bold mb-6">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Looks like you haven't added any peptides to your cart yet.
                    Browse our shop to find premium research products.
                </p>
                <Link href="/shop">
                    <Button variant="primary" size="lg">Return to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-heading font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-bold text-dark">{item.name}</h3>
                                        {item.category && (
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-400 hover:text-error transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 font-medium text-dark min-w-[2.5rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="font-bold text-primary">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-500 hover:text-error underline"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-dark mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 pb-6 border-b">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-bold text-dark mb-8">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <Link href="/checkout" className="block">
                            <Button size="lg" className="w-full">
                                Proceed to Checkout
                            </Button>
                        </Link>

                        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-sm">Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
