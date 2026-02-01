import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
                Home
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="text-gray-400">/</span>
                    {item.href && index < items.length - 1 ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-dark font-medium">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
