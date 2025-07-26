"use server"

import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { User } from '@prisma/client'

export type Auth = JWTPayload & Omit<User, 'password'>;

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
    throw new Error('SESSION_SECRET environment variable is required');
}

const cookieName = 'session';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Omit<User, 'password'>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .setJti(crypto.randomUUID()) // Add unique JWT ID
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    if (!session) {
        return null;
    }

    try {
        const { payload } = await jwtVerify<Omit<User, 'password'>>(session, encodedKey, {
            algorithms: ['HS256'],
        });
        
        // Check if token is close to expiry (within 1 day)
        const exp = payload.exp;
        if (exp && exp * 1000 - Date.now() < 24 * 60 * 60 * 1000) {
            // Token expires within 24 hours, consider refreshing
            console.log('Token expires soon, consider refreshing');
        }
        
        return payload;
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to verify session:', error.message);
        }
        return null;
    }
}

export async function createSession(payload: Omit<User, 'password'>) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt(payload);

    const cookieStore = await cookies();
    cookieStore.set(cookieName, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    return session;
}

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(cookieName)?.value;
        return session || null;
    } catch (error) {
        console.error('Failed to get session:', error);
        return null;
    }
}

export async function getCurrentUser(): Promise<Auth | null> {
    const session = await getSession();

    if (!session) {
        return null;
    }

    const payload = await decrypt(session);
    return payload;
}

export async function deleteSession() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(cookieName);
    } catch (error) {
        console.error('Failed to delete session:', error);
        throw new Error('Failed to sign out');
    }
}

export async function updateSession(payload: Omit<User, 'password'>) {
    const session = await encrypt(payload);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set(cookieName, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });

    return payload;
}

// Helper function to check if session needs refresh
export async function shouldRefreshSession(): Promise<boolean> {
    const session = await getSession();
    if (!session) return false;

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        
        const exp = payload.exp;
        if (!exp) return false;
        
        // Refresh if token expires within 24 hours
        return exp * 1000 - Date.now() < 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
}