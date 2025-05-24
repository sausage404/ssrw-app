"use server"

import { z } from 'zod'
import user from '@/schema/user'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SheetBase } from './sheet'
import bcrypt from 'bcrypt'

export type Auth = JWTPayload & SheetBase<z.infer<typeof user.user>>;

const secretKey = process.env.SESSION_SECRET
const cookieName = 'session'
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: z.infer<typeof user.user>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify<SheetBase<z.infer<typeof user.user>>>(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session:', error)
        return null
    }
}

export async function createSession(payload: SheetBase<z.infer<typeof user.user>>) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt(payload);

    (await cookies()).set(cookieName, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    return session
}

export async function getSession() {
    const cookieStore = (await cookies())
    const session = cookieStore.get(cookieName)?.value

    if (!session) {
        return null
    }

    return session
}

export async function getCurrentUser() {
    const session = await getSession()

    if (!session) {
        return null
    }

    const payload = await decrypt(session)
    return payload
}

export async function deleteSession() {
    (await cookies()).delete(cookieName)
}

export async function updateSession(payload: SheetBase<z.infer<typeof user.user>>) {

    const session = await encrypt(payload);

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    (await cookies()).set(cookieName, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })

    return payload
}