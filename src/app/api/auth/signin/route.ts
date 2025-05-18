import { AuthResponse } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import user from '@/schema/user';
import { db } from '@/config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
    try {
        const body = await request.json() as z.infer<typeof user.credentials>;
        const { email, password } = body;

        const exitingUser = db.user
            .find(item => item.email === email && bcrypt.compareSync(password, item.password));

        if (!exitingUser) {
            return NextResponse.json(
                { success: false, message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        await createSession(exitingUser);

        return NextResponse.json({ success: true, user: exitingUser, message: 'Login successful' });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Authentication failed' },
            { status: 500 }
        );
    }
}