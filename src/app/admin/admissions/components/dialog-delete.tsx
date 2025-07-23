"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import React from "react"
import { toast } from "sonner"
import { DialogData } from "@/hooks/use-dialog-data"
import { Admission } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteAdmission } from "@/data/admission"

export default (dialog: DialogData<Admission>) => {

    const router = useRouter();

    const onSubmit = () => {
        toast.promise(
            async () => {
                await deleteAdmission(dialog.data.id);
            },
            {
                loading: "กําลังลบข้อมูลรับสมัคร",
                success: "ลบข้อมูลรับสมัครเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการลบข้อมูลรับสมัคร"
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