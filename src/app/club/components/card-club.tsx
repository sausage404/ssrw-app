"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ClubPayload } from "./section-student";
import { updateClub } from "@/data/club";
import { User } from "@prisma/client";

export default ({ user, value }: Readonly<{ value: ClubPayload, user: User }>) => {
    const join = async () => {

        if (value.maxMember <= value.members.length) {
            toast.error("จํานวนสมาชิกของชุมนุมถึงสูงสุดแล้ว");
            return;
        }

        if (!value.status) {
            toast.error("ชุมนุมปิดรับสมาชิก");
            return;
        }

        toast.promise(async () => {
            await updateClub(value.id, { members: { connect: { id: user.id } } });
        }, {
            loading: "กําลังเข้าร่วมชุมนุม",
            success: "เข้าร่วมชุมนุมเรียบร้อย",
            error: "เกิดข้อผิดพลาดในการเข้าร่วมชุมนุม"
        }).unwrap().then(() => {
            window.location.reload();
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <div className="grid gap-2">
                    <p className="font-semibold">ชุมนุม {value.name}</p>
                    <p className="flex gap-2">
                        <span className="flex gap-2 items-center">
                            ผู้ดูแล {value.owner?.prefix}{value.owner?.firstName} {value.owner?.lastName}
                        </span>
                        <span className="flex gap-2 items-center">
                            จํานวนสมาชิก {value.members.length}/{value.maxMember} คน
                        </span>
                    </p>
                    <p className="text-muted-foreground">{value.description.substring(0, 100)} {value.description.length > 100 && "..."}</p>
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">เข้าร่วมชุมนุม</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>เข้าร่วมชุมนุม</DialogTitle>
                                    <DialogDescription>
                                        คุณแน่ใจหรือไม่ว่าต้องการเข้าร่วมชุมนุมนี้ หากเข้าร่วมชุมนุมนี้แล้วจะไม่สามารถยกเลิกได้
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={join} type="button" size="sm">เข้าร่วม</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button size="sm" variant="outline">ยกเลิก</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}