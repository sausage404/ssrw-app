"use server";

import user from '@/schema/user';
import { z } from 'zod';
import { deleteSession, encrypt } from './session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { prisma } from './prisma';

export const signIn = async (credentials: z.infer<typeof user.credentials>) => {
    const validation = user.credentials.safeParse(credentials);

    if (!validation.success) {
        throw new Error(validation.error.message);
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: credentials.email,
        },
    })

    if(!existingUser) {
        throw new Error('User not found');
    }

    const passwordMatch = bcrypt.compareSync(credentials.password, existingUser.password);

    if (!passwordMatch) {
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