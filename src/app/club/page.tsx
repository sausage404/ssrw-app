import Client from "./client";
import { getCurrentUser } from "@/lib/session";

export default async () => {
    const auth = await getCurrentUser();

    if (!auth) {
        return null;
    }

    return <Client auth={auth} />
}