// Common TypeScript types for the application

export interface User {
    _id: string;
    auth0Id: string;
    email: string;
    name: string;
    role: 'customer' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    _id: string;
    orderNumber: string;
    userId: string;
    items: CartItem[];
    total: number;
    shippingInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    status: 'Pending Payment' | 'Payment Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
    trackingNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentMethod {
    _id: string;
    name: string;
    type: string;
    instructions: string;
    details: string;
    active: boolean;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContactInquiry {
    _id: string;
    name: string;
    email: string;
    purpose: string;
    message: string;
    status: 'New' | 'In Progress' | 'Resolved';
    adminReply?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
