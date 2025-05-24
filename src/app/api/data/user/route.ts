import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config";
import user from "@/schema/user";
import bcrypt from 'bcrypt'
import { z } from "zod";
import { SheetBase } from "@/lib/sheet";

export async function GET(request: NextRequest) {
    try {
        const users = await db().user.getAll();
        return NextResponse.json({ success: true, data: users });
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

        const exitingUser = await db().user.find(item => item.email === data.email);

        if (exitingUser) {
            return NextResponse.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        await db().user.create({
            prefix: data.prefix,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
            role: data.role
        })

        return NextResponse.json({ success: true, message: 'User created successfully' });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json() as SheetBase<z.infer<typeof user.user>>;

        const validation = user.user.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        const exitingUser = await db().user.get(data.id);

        if (!exitingUser) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        await db().user.update(data.id, data);

        return NextResponse.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to update user' }, { status: 500 });
    }
}