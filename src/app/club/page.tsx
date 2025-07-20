import { prisma } from "@/lib/prisma";
import Client from "./client";
import { getCurrentUser } from "@/lib/session";

export default async () => {
    const auth = await getCurrentUser();

    if (!auth) {
        return null;
    }

    const user = await prisma.user.findUnique({ where: { id: auth.id } });

    if (!user) {
        return null;
    }

    return <Client user={user} />
}