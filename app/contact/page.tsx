'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', purpose: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Contact Info Sidebar */}
                        <div className="bg-primary p-10 text-white flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-heading font-bold mb-6">Get in Touch</h1>
                                <p className="text-blue-100 mb-8 leading-relaxed">
                                    We'd love to hear from you. Whether you have a question about our products,
                                    shipping, or partnership opportunities, our team is ready to answer all your questions.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <svg className="w-6 h-6 text-accent mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-lg">Email</h3>
                                            <p className="text-blue-100">support@peptidelab.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <svg className="w-6 h-6 text-accent mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11.238L2.002 9.584c-.426-.64-.543-1.442-.315-2.189.227-.746.828-1.282 1.572-1.396l9.648-1.503c1.693-.264 3.033 1.353 2.505 2.973L13.78 12.04c-.334 1.026.046 2.155.932 2.753l1.83 1.22c.96.64 2.186.536 3.033-.26 1.077-1.01 2.872-.733 3.636.561l.93 1.576c.55 1.006.183 2.29-.824 2.853l-1.92.96c-1.334.666-2.924.37-3.951-.74l-.93-1.008c-.73-.79-1.97-.872-2.793-.186l-1.028.857c-1.488 1.24-3.66 1.157-5.064-.19l-1.98-2.146c-1.294-1.402-1.187-3.67.243-4.942l.823-.733c.79-.703.824-1.936.076-2.682l-.96-.96c-.636-.636-1.558-.8-2.342-.416l-2.001.978c-1.096.536-2.428.18-2.964-.916z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-lg">Support Hours</h3>
                                            <p className="text-blue-100">Mon-Fri: 9am - 5pm EST</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <p className="text-sm text-blue-200">
                                    © 2026 PeptideLab. Made for Advanced Research.
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-10">
                            <h2 className="text-2xl font-bold text-dark mb-6">Send a Message</h2>

                            {status === 'success' ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
                                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                                    <p className="text-green-700">
                                        Thank you for reaching out. Our team will get back to you shortly.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-green-700 font-semibold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                    <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    <div>
                                        <label className="block text-sm font-medium text-dark mb-2">
                                            Purpose of Inquiry <span className="text-error">*</span>
                                        </label>
                                        <select
                                            name="purpose"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                            required
                                            value={formData.purpose}
                                            onChange={handleChange}
                                        >
                                            <option value="">- Select -</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Order Status">Order Status</option>
                                            <option value="Product Information">Product Information</option>
                                            <option value="Wholesale/Bulk">Wholesale / Bulk Order</option>
                                            <option value="Technical Support">Technical Support</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dark mb-2">
                                            Message <span className="text-error">*</span>
                                        </label>
                                        <textarea
                                            name="message"
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                            placeholder="How can we help you?"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full"
                                        isLoading={status === 'loading'}
                                    >
                                        Submit Form
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
