import { NextRequest, NextResponse } from "next/server";
import user from "@/schema/user";
import bcrypt from 'bcrypt'
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;

        const id = params.get('id');

        if (id) {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return NextResponse.json({ success: false, message: 'User not found' });
            }
            return NextResponse.json({ success: true, data: user });
        } else {
            const users = await prisma.user.findMany();
            return NextResponse.json({ success: true, data: users });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof user.user>;

        const validation = user.user.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        const exitingUser = await prisma.user.findUnique({ where: { email: data.email } });

        if (exitingUser) {
            return NextResponse.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        await prisma.user.create({
            data: {
                ...validation.data,
                password: hashedPassword
            }
        })

        return NextResponse.json({ success: true, message: 'User created successfully' });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json() as User;

        const validation = user.user.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        const exitingUser = await prisma.user.findUnique({ where: { id: data.id } });

        if (!exitingUser) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        await prisma.user.update({ where: { id: data.id }, data: validation.data });

        return NextResponse.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to update user' }, { status: 500 });
    }
}