import { db } from "@/config";
import announcement from "@/schema/announcement";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof announcement.announcement>;

        const validation = announcement.announcement.safeParse({
            ...data,
            occurredAt: new Date(data.occurredAt)
        });
        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        await db().announcement.create(validation.data);
        return NextResponse.json({ success: true, message: 'Announcement created successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create announcement' }, { status: 500 });
    }
}