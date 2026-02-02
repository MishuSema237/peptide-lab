'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Image from 'next/image';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getCartTotal, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [isLoadingMethods, setIsLoadingMethods] = useState(true);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const res = await fetch('/api/payment-methods');
                const data = await res.json();
                if (data.success) {
                    setPaymentMethods(data.data.filter((m: any) => m.active));
                }
            } catch (error) {
                console.error('Failed to fetch payment methods', error);
            } finally {
                setIsLoadingMethods(false);
            }
        };
        fetchMethods();
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Canada', // Default
        paymentMethod: ''
    });

    const subtotal = getCartTotal();
    const shippingCost = 0.00; // No shipping cost
    const total = subtotal;

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            router.push('/cart');
        }
    }, [items, router]);

    if (items.length === 0) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                total,
                shippingInfo: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                paymentMethod: formData.paymentMethod,
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to place order');
            }

            // Success
            clearCart();
            router.push(`/order-complete?order=${data.orderNumber}`);
        } catch (error: any) {
            console.error('Order failed:', error);
            alert(error.message || 'Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-heading font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Shipping Information */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-dark mb-6">Shipping Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <Input
                                    label="Street Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="State / Province"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="ZIP / Postal Code"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-dark mb-2">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="Canada">Canada</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-dark mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method._id}
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === method.name
                                            ? 'border-primary bg-blue-50 ring-1 ring-primary'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.name}
                                            checked={formData.paymentMethod === method.name}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                            required
                                        />
                                        <div className="ml-3">
                                            <span className="block font-medium text-dark">{method.name}</span>
                                            {formData.paymentMethod === method.name && (
                                                <p className="text-sm text-gray-500 mt-1">{method.instructions}</p>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-500">
                                Payment details will be sent to your email address after the order is placed.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-dark mb-6">Your Order</h2>

                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 py-2 border-b last:border-0 border-gray-50">
                                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-md">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-dark line-clamp-2">{item.name}</h4>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-gray-500">Qty: {item.quantity}</span>
                                            <span className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6 pt-4 border-t">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>will be emailed to you</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-xl font-bold text-dark mb-8 pt-4 border-t">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            size="lg"
                            className="w-full"
                            isLoading={isSubmitting}
                        >
                            Place Order
                        </Button>

                        <div className="mt-6 text-center text-xs text-gray-500">
                            By placing your order, you agree to our <a href="/terms" className="underline">Terms & Conditions</a> and <a href="/privacy-policy" className="underline">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
