import Client from "./client";
import { prisma } from "@/lib/prisma";

export default async () => {
    const data = await prisma.announcement.findMany({
        where: {
            occurredAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
            }
        }
    })
    return <Client announcements={data} />
}
