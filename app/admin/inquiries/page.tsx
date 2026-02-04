'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const res = await fetch('/api/inquiries');
                const data = await res.json();
                setInquiries(data);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInquiries();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-dark mb-6">Contact Inquiries</h1>
                <div className="text-center py-8">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-dark mb-6">Contact Inquiries</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                                <th className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inquiries.length > 0 ? (
                                inquiries.map((inquiry: any) => (
                                    <tr key={inquiry._id}>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-none">{inquiry.name}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">{inquiry.email}</div>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 text-sm text-gray-900">
                                            <div className="truncate max-w-[100px] md:max-w-none">{inquiry.purpose}</div>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden md:table-cell">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                       ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                                    inquiry.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                {inquiry.status}
                                            </span>
                                        </td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/admin/inquiries/${inquiry._id}`} className="text-primary hover:text-primary-600">View</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No inquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
