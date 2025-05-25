import { drive, folder } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const name = data.get("name") as string;
        const studentPhoto = data.get("studentPhoto") as Blob;

        if (!name || !studentPhoto) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const response = await drive.uploadFile(
            name,
            Buffer.from(await studentPhoto.arrayBuffer()),
            "image/jpeg",
            folder.studentPhoto
        );
        return NextResponse.json({ success: true, data: response.id, message: 'Photo updated successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to update photo' }, { status: 500 });
    }
}