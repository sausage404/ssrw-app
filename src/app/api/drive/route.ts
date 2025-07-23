import { drive } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const name = data.get("name") as string;
        const file = data.get("file") as Blob;
        const mimeType = data.get("mimeType") as string;
        const parentId = data.get("parentId") as string;


        if (!name || !file) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const response = await drive.uploadFile(
            name,
            Buffer.from(await file.arrayBuffer()),
            mimeType,
            parentId
        );

        return NextResponse.json({ success: true, id: response.id, message: 'File updated successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: 'Failed to update File' }, { status: 500 });
    }
}