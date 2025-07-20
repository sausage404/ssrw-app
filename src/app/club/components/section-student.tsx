"use client";

import React from "react";
import axios from "axios";
import { Auth } from "@/lib/session";
import CardClub from "./card-club";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Prisma } from "@prisma/client";

export type ClubPayload = Prisma.ClubGetPayload<{ include: { members: true, owner: true } }>

export default ({ auth }: Readonly<{ auth: Auth }>) => {
    const [clubs, setClubs] = React.useState<ClubPayload[]>([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get<{ success: boolean, data: ClubPayload[] }>("/api/data/club");
            if (data.success) {
                setClubs(data.data);
            }
        })()
    }, []);

    const join = clubs.find((item) => item.members.some((member) => member.id === auth.id));

    return !join ? (
        <div className="w-full p-6 grid grid-cols-3 gap-6">
            {clubs.map((item, index) => (
                <CardClub key={index} value={item} auth={auth} />
            ))}
        </div>
    ) : (
        <div className="w-full p-6 gap-6">
            <div className="grid gap-2">
                <p className="font-semibold">ชุมนุม {join.name}</p>
                <p className="flex gap-2">
                    <span className="flex gap-2 items-center">
                        ผู้ดูแล {join.owner?.prefix}{join.owner?.firstName} {join.owner?.lastName}
                    </span>
                    <span className="flex gap-2 items-center">
                        จํานวนสมาชิก {join.members.length}/{join.maxMember} คน
                    </span>
                </p>
                <p className="text-muted-foreground">{join.description}</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ลำดับ</TableHead>
                        <TableHead>ชื่อสมาชิก</TableHead>
                        <TableHead>ระดับชั้น</TableHead>
                        <TableHead>เลขที่</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {join.members.length > 0 ? join.members.map((member, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{member.prefix}{member.firstName} {member.lastName}</TableCell>
                            <TableCell>ระดับชั้นปีที่ {member.level}/{member.room}</TableCell>
                            <TableCell>{member.no}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">ไม่มีสมาชิก</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}