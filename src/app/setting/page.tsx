import { Metadata } from "next";
import Client from "./client";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
    title: 'Setting'
}

export default async () => {
    const user = await getCurrentUser();

    if (!user) {
        return null
    }

    return <Client auth={user} />
}