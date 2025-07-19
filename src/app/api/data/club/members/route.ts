import { db } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;

        const id = params.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
        }

        const users = await db().user.filter(item => item.clubId === id);
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
    }
}