# PeptideLab - E-Commerce Platform

**Precision Peptides for Advanced Research**

A modern, full-stack e-commerce platform for research-grade peptides built with Next.js, TypeScript, and TailwindCSS.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Authentication**: Auth0
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Image Storage**: Supabase Storage
- **Email**: Nodemailer
- **State Management**: Zustand (cart), React Context
- **Forms**: React Hook Form + Zod validation
- **Hosting**: Vercel

## 🎨 Brand Identity

- **Primary Color**: Deep Ocean Blue (#0A4D7D)
- **Secondary Color**: Bright Cyan (#00B4D8)
- **Accent Color**: Electric Teal (#48CAE4)
- **Fonts**: Inter (body), Outfit (headings)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `env.example.txt` and create `.env.local` with your credentials:
   - MongoDB Atlas connection string
   - Auth0 credentials
   - Supabase URL and keys
   - SMTP email configuration

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
peptides/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/           # Auth group routes
│   ├── (shop)/           # Public shop routes
│   └── admin/            # Admin dashboard
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── shop/             # Shop-specific components
│   └── admin/            # Admin components
├── lib/                   # Utilities and configs
│   ├── db/               # Database connection
│   ├── email/            # Email templates
│   └── utils/            # Helper functions
├── models/                # MongoDB models
├── types/                 # TypeScript types
└── public/                # Static assets
```

## ✨ Features

### Customer Features
- Browse products with filtering and search
- Shopping cart with persistence
- 3-stage checkout process
- User account dashboard
- Order tracking
- Email notifications

### Admin Features
- Product management (CRUD with images)
- Order management with status updates
- Payment method configuration
- User management
- Contact inquiry management
- Direct email replies to customers
- Analytics dashboard

### Payment System
- Manual payment workflow
- Admin-configurable payment methods
- Payment details sent via email
- Order status tracking (Pending → Paid → Shipped → Delivered)

## 📧 Email Templates

Professional email templates for:
- Welcome/registration
- Order confirmation (user & admin)
- Payment details
- Order status updates
- Contact form responses
- Admin direct replies

## 🔐 Authentication

Auth0 integration with:
- Universal Login
- Email verification
- Role-based access control (Admin, Customer)
- Protected routes

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Environment Variables

See `env.example.txt` for all required environment variables.

## 🚢 Deployment

This project is configured for deployment on Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📄 License

© 2026 PeptideLab. All rights reserved.
