import { prisma } from "@/lib/prisma";

export async function GET() {
    await prisma.user.updateMany({
        where: {
            password: "12345678"
        },
        data: {
            password: "$2b$10$VtLWwDRrNbrw9q2anM.mOeqt.QL5jW2nFIF9RJiH24DxO2AuXPG4q"
        }
    })

    return new Response("Hello, Next.js!");
}