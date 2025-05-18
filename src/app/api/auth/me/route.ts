import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log((await cookies()).get('session'))
    const cookie = (await cookies()).get('session')?.value
    const user = await decrypt(cookie)

    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    return NextResponse.json({ success: true, user });
}