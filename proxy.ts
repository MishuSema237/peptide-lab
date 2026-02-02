import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /admin routes, but allow /admin-login
    if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
        const session = request.cookies.get('admin_session');

        if (!session || session.value !== 'true') {
            // Not authenticated as admin, redirect to login
            const loginUrl = new URL('/admin-login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    proxy: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
    ]
};
