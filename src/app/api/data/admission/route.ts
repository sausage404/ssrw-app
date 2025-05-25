import { db } from "@/config";
import admission from "@/schema/admission";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof admission.admission>;

        const validation = admission.admission.safeParse({
            ...data,
            birthDate: new Date(data.birthDate)
        });
        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        await db().admission.create(validation.data);
        return NextResponse.json({ success: true, message: 'Admission form created successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to create admission form' }, { status: 500 });
    }
}