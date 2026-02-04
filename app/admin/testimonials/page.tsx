'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', rating: 5, message: '', active: true });

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        setTestimonials(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editItem ? `/api/testimonials/${editItem._id}` : '/api/testimonials';
        const method = editItem ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            fetchData();
            setIsModalOpen(false);
            setEditItem(null);
            setFormData({ name: '', rating: 5, message: '', active: true });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        }
    };

    const openEdit = (item: any) => {
        setEditItem(item);
        setFormData({ name: item.name, rating: item.rating, message: item.message, active: item.active });
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-dark">Testimonial Management</h1>
                <Button onClick={() => { setEditItem(null); setFormData({ name: '', rating: 5, message: '', active: true }); setIsModalOpen(true); }}>
                    <span className="hidden sm:inline">Add New Testimonial</span>
                    <span className="sm:hidden">Add Testimonial</span>
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Rating</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : testimonials.length > 0 ? (
                                testimonials.map((item: any) => (
                                    <tr key={item._id}>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-yellow-500 hidden sm:table-cell">
                                            {'★'.repeat(Math.floor(item.rating))}
                                            {item.rating % 1 !== 0 ? '½' : ''}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-500 max-w-[150px] md:max-w-xs truncate">{item.message}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden md:table-cell">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {item.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openEdit(item)} className="text-primary hover:text-primary-600 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="text-error hover:text-red-700">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No testimonials found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 animate-scale-in">
                        <h2 className="text-xl font-bold text-dark mb-6">{editItem ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-sans"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Rating (0-5)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    max="5"
                                    required
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Review Message</label>
                                <textarea
                                    required
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-32 font-sans"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={formData.active}
                                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                                />
                                <label htmlFor="active" className="text-sm font-bold text-gray-700 cursor-pointer">Show on website</label>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">{editItem ? 'Update' : 'Create'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
