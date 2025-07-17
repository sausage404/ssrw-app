import { db } from "@/config"
import Client from "./client";

export default async () => {
    const data = await db().announcement.filter(item => {
        const thisMonth = new Date().getMonth() === new Date(item.occurredAt).getMonth();
        const thisYear = new Date().getFullYear() === new Date(item.occurredAt).getFullYear();
        return thisMonth && thisYear
    })

    const sorting = data
        .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
        .slice(0, 5);

    return <Client data={sorting} />
}