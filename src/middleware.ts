import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './lib/session';

const protectedRoutes = ['/dashboard', '/profile'];

export async function middleware(request: NextRequest) {
    const isAuthenticated = await getCurrentUser();

    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute && !isAuthenticated) {
        const url = new URL('/login', request.url);
        url.searchParams.set('from', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname === '/login' && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}