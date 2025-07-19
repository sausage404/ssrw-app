"use client";

import React from "react";
import axios from "axios";
import { z } from "zod";
import club from "@/schema/club";
import { Auth } from "@/lib/session";
import CardClub from "./card-club";

export default ({ auth }: Readonly<{ auth: Auth }>) => {

    const [clubs, setClubs] = React.useState<z.infer<typeof club.club>[]>([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get<{ success: boolean, data: z.infer<typeof club.club>[] }>("/api/data/club");
            if (data.success) {
                setClubs(data.data);
            }
        })()
    }, []);

    return (
        <div className="w-full p-6 grid grid-cols-3 gap-6">
            {clubs.map(item => (
                <CardClub key={item.id} value={item} />
            ))}
        </div>
    )
}