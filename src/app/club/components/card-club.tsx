"use client";

import user from "@/schema/user";
import axios from "axios";
import React from "react";
import { z } from "zod";
import club from "@/schema/club";
import { Crown, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default ({ value }: Readonly<{ value: z.infer<typeof club.club> }>) => {
    const [owner, setOwner] = React.useState<z.infer<typeof user.user> | null>(null);
    const [members, setMembers] = React.useState<z.infer<typeof user.user>[]>([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/data/user", { params: { id: value.userId } });
            if (data.success) {
                setOwner(data.data);
            }
            const { data: members } = await axios.get("/api/data/club/members", { params: { id: data.data.id } });
            if (members.success) {
                setMembers(members.data);
            }
        })()
    }, []);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="grid gap-2">
                    <p className="font-semibold">ชุมนุม {value.name}</p>
                    <p className="flex gap-2">
                        <span className="flex gap-2 items-center">
                            ผู้ดูแล {owner?.prefix}{owner?.firstName} {owner?.lastName}
                        </span>
                        <span className="flex gap-2 items-center">
                            จํานวนสมาชิก {members.length}/{value.maxMember} คน
                        </span>
                    </p>
                    <p className="text-muted-foreground">{value.description.substring(0, 100)} {value.description.length > 100 && "..."}</p>
                    <div>
                        <Button variant="outline">เข้าร่วมชุมนุม</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}