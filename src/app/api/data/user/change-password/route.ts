import user from "@/schema/user";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcrypt'
import { db } from "@/config";

export async function PATCH(request: Request) {
    try {

        const data = await request.json() as z.infer<typeof user.changePassword>;

        const validation = user.changePassword.safeParse(data);

        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        const { id, current, new: newPassword } = data;

        const existingUser = await db().user.find(item => item.id === id);

        if (!existingUser) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        if (!bcrypt.compareSync(current, existingUser.password)) {
            return NextResponse.json({ success: false, message: 'New password cannot be the same as the current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await db().user.update(id, {
            password: hashedPassword
        });

        return NextResponse.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to change password' }, { status: 500 });
    }
}