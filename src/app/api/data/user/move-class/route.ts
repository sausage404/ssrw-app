import { prisma } from "@/lib/prisma";
import user from "@/schema/user";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: Request) {
    try {
        const data = await request.json() as z.infer<typeof user.moveClass>;

        const validation = user.moveClass.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        const userWithClasses = await prisma.user.findMany({
            where: {
                level: data.beforeLevel,
                room: data.beforeRoom
            }
        });

        if (userWithClasses.length === 0) {
            return NextResponse.json({ success: false, message: 'No user found with the specified class' });
        }

        await prisma.user.updateMany({
            where: {
                level: data.beforeLevel,
                room: data.beforeRoom
            },
            data: {
                level: data.afterLevel,
                room: data.afterRoom
            }
        })

        return NextResponse.json({ success: true, message: 'Class moved successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to move class' }, { status: 500 });
    }
}