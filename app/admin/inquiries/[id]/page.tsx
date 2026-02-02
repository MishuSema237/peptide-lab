'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function InquiryDetailPage() {
    const [inquiry, setInquiry] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchInquiry = async () => {
            try {
                const res = await fetch(`/api/inquiries/${params.id}`);
                const data = await res.json();
                setInquiry(data);
            } catch (error) {
                console.error('Error fetching inquiry:', error);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) {
            fetchInquiry();
        }
    }, [params.id]);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!inquiry) {
        return <div className="text-center py-8">Inquiry not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-dark mb-2">Inquiry from {inquiry.name}</h1>
                    <p className="text-gray-500">Received on {new Date(inquiry.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                            inquiry.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                'bg-yellow-100 text-yellow-700'
                        }`}>
                        {inquiry.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b">
                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Email</p>
                            <a href={`mailto:${inquiry.email}`} className="text-lg font-medium text-primary hover:underline">{inquiry.email}</a>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Purpose</p>
                            <p className="text-lg font-medium text-dark">{inquiry.purpose}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-4">Message</p>
                        <div className="bg-gray-50 p-6 rounded-xl text-gray-700 leading-relaxed font-sans whitespace-pre-wrap">
                            {inquiry.message}
                        </div>
                    </div>

                    {/* Quick Resolve Button - simplified for now */}
                    <div className="flex justify-end pt-4">
                        <Button variant="outline" className="mr-4">Mark In Progress</Button>
                        <Button variant="primary">Mark as Resolved</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}