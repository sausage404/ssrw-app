import { prisma } from "@/lib/prisma"
import Client from "./client"
export const dynamic = "force-dynamic";
export default async () => {
    const user = await prisma.user.findMany({});
    return <Client user={user} />
}