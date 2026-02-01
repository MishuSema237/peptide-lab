'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface PaymentMethod {
    _id: string;
    name: string;
    type: string;
    details: string;
    instructions: string;
    active: boolean;
}

export default function PaymentMethodsPage() {
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // New method form state
    const [formData, setFormData] = useState({
        name: '',
        type: 'bank',
        details: '',
        instructions: '',
    });

    useEffect(() => {
        fetchMethods();
    }, []);

    const fetchMethods = async () => {
        try {
            const res = await fetch('/api/payment-methods');
            const data = await res.json();
            if (data.success) {
                setMethods(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch payment methods', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/payment-methods', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: '', type: 'bank', details: '', instructions: '' });
                setIsCreating(false);
                fetchMethods();
            }
        } catch (error) {
            console.error('Failed to create method', error);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-dark">Payment Methods</h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? 'Cancel' : 'Add Method'}
                </Button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h2 className="text-lg font-bold mb-4">Add New Payment Method</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Method Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="e.g. Bank Transfer"
                            />
                            <div>
                                <label className="block text-sm font-medium text-dark mb-2">Type</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="bank">Bank Transfer</option>
                                    <option value="crypto">Cryptocurrency</option>
                                    <option value="app">Payment App (Zelle/CashApp)</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <Input
                            label="Account Details"
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            required
                            placeholder="e.g. Acme Corp, Account: 123456789"
                        />

                        <div>
                            <label className="block text-sm font-medium text-dark mb-2">Instructions to User</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                value={formData.instructions}
                                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                required
                                placeholder="Please include order number in memo..."
                            />
                        </div>

                        <Button type="submit">Save Method</Button>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {methods.length > 0 ? (
                    methods.map((method) => (
                        <div key={method._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-dark">{method.name}</h3>
                                    <span className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-500 uppercase">{method.type}</span>
                                    {method.active && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{method.details}</p>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                        </div>
                    ))
                ) : (
                    !isLoading && <p className="text-gray-500">No payment methods configured.</p>
                )}
            </div>
        </div>
    );
}
