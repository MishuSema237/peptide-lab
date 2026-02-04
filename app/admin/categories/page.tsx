'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null);
    const [formData, setFormData] = useState({ name: '', description: '' });

    const fetchCategories = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            if (!silent) toast.error('Failed to load categories');
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const url = editCategory ? `/api/categories/${editCategory._id}` : '/api/categories';
        const method = editCategory ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed');

            toast.success(editCategory ? 'Category updated!' : 'Category created!');
            await fetchCategories(true);
            setIsModalOpen(false);
            setEditCategory(null);
            setFormData({ name: '', description: '' });
        } catch (error) {
            toast.error('Failed to save category');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed');

            toast.success('Category deleted');
            await fetchCategories(true);
        } catch (error) {
            toast.error('Failed to delete category');
        } finally {
            setDeletingId(null);
        }
    };

    const openEdit = (cat: any) => {
        setEditCategory(cat);
        setFormData({ name: cat.name, description: cat.description || '' });
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <h1 className="text-2xl font-bold text-dark">Category Management</h1>
                <Button onClick={() => { setEditCategory(null); setFormData({ name: '', description: '' }); setIsModalOpen(true); }}>
                    <span className="hidden sm:inline">Add New Category</span>
                    <span className="sm:hidden">Add Category</span>
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Description</th>
                                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : categories.length > 0 ? (
                                categories.map((cat: any) => (
                                    <tr key={cat._id}>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{cat.slug}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-500 max-w-xs truncate hidden lg:table-cell">{cat.description}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openEdit(cat)} className="text-primary hover:text-primary-600 mr-4">Edit</button>
                                            <button
                                                onClick={() => handleDelete(cat._id)}
                                                disabled={deletingId === cat._id}
                                                className="text-error hover:text-red-700 disabled:opacity-50"
                                            >
                                                {deletingId === cat._id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No categories found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 animate-scale-in">
                        <h2 className="text-xl font-bold text-dark mb-6">{editCategory ? 'Edit Category' : 'Add New Category'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" isLoading={isSaving} className="flex-1">{editCategory ? 'Update' : 'Create'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
