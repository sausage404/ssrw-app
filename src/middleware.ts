import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

const routes = ["/setting", "/announcement", "/attendance", "/club"];

export async function middleware(request: NextRequest) {
    const isAuthenticated = await auth();

    // if (!isAuthenticated && routes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    //     return NextResponse.redirect(new URL("/auth", request.url));
    // }

    // if (isAuthenticated && request.nextUrl.pathname.startsWith("/auth")) {
    //     return NextResponse.redirect(new URL("/", request.url));
    // }

    // if (isAuthenticated?.user.role !== "ADMIN" && request.nextUrl.pathname.startsWith("/admin")) {
    //     return NextResponse.rewrite(new URL("/not-found", request.url));
    // }

    return NextResponse.next();
}