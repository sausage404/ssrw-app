import { prisma } from "@/lib/prisma";
import Client from "./client";
import { auth } from "@/lib/auth";

export default async () => {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user) {
        return null;
    }

    return <Client user={user} />
}