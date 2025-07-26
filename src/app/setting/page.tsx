import { Metadata } from "next";
import Client from "./client";
import { auth } from "@/lib/auth";
import { getUserById } from "@/data/user";

export const metadata: Metadata = {
    title: 'Setting'
}

export default async () => {
    const session = await auth();

    if (!session?.user) {
        return null
    }

    const user = await getUserById(session.user.id);

    if (!user) {
        return null
    }

    return <Client user={user} />
}