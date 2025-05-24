"use server";

import user from '@/schema/user';
import { z } from 'zod';
import { deleteSession, encrypt } from './session';
import { db } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

export const signIn = async (credentials: z.infer<typeof user.credentials>) => {
    const validation = user.credentials.safeParse(credentials);

    if (!validation.success) {
        throw new Error(validation.error.message);
    }

    const existingUser = await db().user.find(item => {
        const emailMatch = item.email === credentials.email;
        const passwordMatch = bcrypt.compareSync(credentials.password, item.password);
        return emailMatch && passwordMatch;
    });

    if (!existingUser) {
        throw new Error('Invalid email or password');
    }

    const sessionToken = await encrypt(existingUser);

    (await cookies()).set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: 'lax',
        path: '/',
    });

    return existingUser;
}

export const signOut = async () => {
    await deleteSession();
    redirect("/auth")
}