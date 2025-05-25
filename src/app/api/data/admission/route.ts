import { db } from "@/config";
import admission from "@/schema/admission";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof admission.admission>;
        console.log(data);

        const validation = admission.admission.safeParse(data);
        if (!validation.success) {
            return NextResponse.json({ success: false, message: validation.error.message });
        }

        await db().admission.create({
            ...data,
            birthDate: new Date(data.birthDate)
        });
        return NextResponse.json({ success: true, message: 'Admission form created successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to create admission form' }, { status: 500 });
    }
}