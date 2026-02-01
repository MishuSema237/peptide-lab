import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Auth0Provider } from '@auth0/nextjs-auth0/client';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Auth0Provider>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 ml-64 flex flex-col min-h-screen">
                    <AdminHeader />
                    <main className="flex-1 p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </Auth0Provider>
    );
}
