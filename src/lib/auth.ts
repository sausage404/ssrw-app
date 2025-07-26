"use server";

import user from '@/schema/user';
import { z } from 'zod';
import { deleteSession, encrypt, getCurrentUser } from './session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { prisma } from './prisma';

// Rate limiting map (in production, use Redis or similar)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export const signIn = async (credentials: z.infer<typeof user.credentials>) => {
    const validation = user.credentials.safeParse(credentials);

    if (!validation.success) {
        throw new Error('Invalid credentials format');
    }

    // Basic rate limiting
    const clientId = credentials.email; // In production, use IP + email
    const now = Date.now();
    const attempts = loginAttempts.get(clientId);

    if (attempts && attempts.count >= MAX_LOGIN_ATTEMPTS) {
        if (now - attempts.lastAttempt < LOCKOUT_DURATION) {
            throw new Error('Too many login attempts. Please try again later.');
        } else {
            // Reset attempts after lockout period
            loginAttempts.delete(clientId);
        }
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: credentials.email.toLowerCase().trim(),
            }
        });

        if (!existingUser) {
            // Record failed attempt
            const currentAttempts = loginAttempts.get(clientId) || { count: 0, lastAttempt: 0 };
            loginAttempts.set(clientId, {
                count: currentAttempts.count + 1,
                lastAttempt: now
            });
            throw new Error('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
            // Record failed attempt
            const currentAttempts = loginAttempts.get(clientId) || { count: 0, lastAttempt: 0 };
            loginAttempts.set(clientId, {
                count: currentAttempts.count + 1,
                lastAttempt: now
            });
            throw new Error('Invalid email or password');
        }

        // Successful login - clear attempts
        loginAttempts.delete(clientId);

        const userWithoutPassword = await prisma.user.findFirst({
            where: {
                id: existingUser.id,
            },
            omit: {
                password: true,
            }
        });

        if (!userWithoutPassword) {
            throw new Error('User data not found');
        }

        const sessionToken = await encrypt(userWithoutPassword);

        const cookieStore = await cookies();
        cookieStore.set('session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: 'lax',
            path: '/',
        });

        return userWithoutPassword;

    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await deleteSession();
    } catch (error) {
        console.error('Sign out error:', error);
        // Continue with redirect even if session deletion fails
    }
    redirect("/auth");
};

// Additional helper function for checking if user is authenticated
export const requireAuth = async () => {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth");
    }
    return user;
};