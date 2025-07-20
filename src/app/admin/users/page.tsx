import { prisma } from "@/lib/prisma"
import Client from "./client"

export default async () => {
    const user = await prisma.user.findMany({});
    return <Client user={user} />
}