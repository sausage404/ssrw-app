import { db } from "@/config";
import club from "@/schema/club";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof club.club>;

        const validation = club.club.safeParse(data);
        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        await db().club.create(validation.data);
        return NextResponse.json({ success: true, message: 'Club created successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create club' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;

        const id = params.get('id');

        if (id) {
            const club = await db().club.find(item => item.userId === id);
            if (!club) {
                return NextResponse.json({ success: false, message: 'Club not found' });
            }
            return NextResponse.json({ success: true, data: club });
        } else {
            const clubs = await db().club.getAll();
            return NextResponse.json({ success: true, data: clubs });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch clubs' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof club.club>;

        const validation = club.club.safeParse(data);
        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        await db().club.update(data.id, data);
        return NextResponse.json({ success: true, message: 'Club updated successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to update club' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;

        const id = params.get('id');

        if (id) {
            if (await db().club.delete(id)) {
                return NextResponse.json({ success: true, message: 'Club deleted successfully' });
            } else {
                return NextResponse.json({ success: false, message: 'Failed to delete club' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ success: false, message: 'Failed to delete club' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to delete club' }, { status: 500 });
    }
}