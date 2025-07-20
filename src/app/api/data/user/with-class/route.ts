import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;
        const level = params.get('level');
        const room = params.get('room');

        if (!level || !room) {
            return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
        }

        const numLevel = parseInt(level);
        const numRoom = parseInt(room);

        if (isNaN(numLevel) || isNaN(numRoom)) {
            return NextResponse.json({ success: false, message: 'Invalid parameters' }, { status: 400 });
        }

        const users = await prisma.user.findMany({ where: { level: numLevel, room: numRoom } });

        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
    }
}