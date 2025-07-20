import { prisma } from "@/lib/prisma";

export async function GET() {
    const users = await prisma.user.findMany();

    for (const user of users) {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                level: Math.floor(Math.random() * 6) + 1
            }
        })
    }

    return new Response("Hello, Next.js!");
}