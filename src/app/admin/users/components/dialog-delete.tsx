"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import React from "react"
import { toast } from "sonner"
import { DialogData } from "@/hooks/use-dialog-data"
import { deleteUser } from "@/data/user"
import { User } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"

export default (dialog: DialogData<User>) => {

    const router = useRouter();

    const onSubmit = () => {
        toast.promise(
            async () => {
                await deleteUser(dialog.data.id);
            },
            {
                loading: "กําลังเพิ่มผู้ใช้งาน",
                success: "เพิ่มผู้ใช้งานเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน"
            }
        ).unwrap().then(() => {
            dialog.setData(undefined);
            dialog.onOpenChange(false);
            router.refresh();
        })
    }

    return (
        <Dialog
            open={dialog.open}
            onOpenChange={(open) => {
                dialog.onOpenChange(open);
                dialog.setData(undefined);
            }}
        >
            <DialogTrigger asChild>
                <Button size="sm">เพิ่มผู้ใช้งาน</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>คุณแน่ใจหรือไม่</DialogTitle>
                    <DialogDescription>ไม่สามารถย้อนกลับการดำเนินการนี้ได้ การดำเนินการนี้จะลบข้อมูลพาร์ทเนอร์ออกอย่างถาวร</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"outline"} onClick={onSubmit}>ยืนยัน</Button>
                    <DialogClose asChild>
                        <Button variant="destructive">
                            ยกเลิก
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}