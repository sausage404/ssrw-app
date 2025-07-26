import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './lib/session';

const routes = ["/setting", "/announcement", "/attendance", "/club"];

export async function middleware(request: NextRequest) {
    const isAuthenticated = await getCurrentUser();

    if (!isAuthenticated && routes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (isAuthenticated && request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (isAuthenticated?.role !== "ADMIN" && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    return NextResponse.next();
}