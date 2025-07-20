import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        if (data.id && data.clubId) {
            await prisma.club.update({
                where: {
                    id: data.clubId
                },
                data: {
                    members: {
                        connect: {
                            id: data.id
                        }
                    }
                }
            })
            return NextResponse.json({ success: true, message: 'Joined successfully' })
        } else {
            return NextResponse.json({ success: false, message: 'Failed to join' })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to join' }, { status: 500 })
    }
}