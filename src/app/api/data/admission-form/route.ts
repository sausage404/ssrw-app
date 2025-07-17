import { db } from "@/config";
import admissionForm from "@/schema/admission-form";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as z.infer<typeof admissionForm.admissionForm>;

        // const validation = admissionForm.admissionForm.safeParse(data);
        // if (!validation.success) {
        //     return NextResponse.json({ success: false, message: validation.error.message });
        // }

        console.log(data);

        await db().admissionForm.create({
            ...data,
            openedAt: new Date(),
            closedAt: new Date()
        });
        return NextResponse.json({ success: true, message: 'Admission form created successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create admission form' }, { status: 500 });
    }
}