'use client';

import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-600 hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-primary font-medium">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
