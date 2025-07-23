import React from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogData } from "@/hooks/use-dialog-data"
import { Announcement } from "@prisma/client"
import { toast } from "sonner"
import { deleteAnnouncement } from "@/data/announcement"

export default (deleteDialog: DialogData<Announcement>) => {
    const onDelete = async (id: string) => {
        toast.promise(
            async () => {
                await deleteAnnouncement(id);
            },
            {
                loading: "กําลังลบประชาสัมพันธ์",
                success: "ลบประชาสัมพันธ์เรียบร้อย",
                error: "เกิดข้อผิดพลาดในการลบประชาสัมพันธ์"
            }
        ).unwrap().then(() => {
            window.location.reload();
        })
    }

    return (
        <Dialog open={deleteDialog.open} onOpenChange={(open) => {
            deleteDialog.onOpenChange(open);
            deleteDialog.setData(undefined);
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>คุณแน่ใจหรือไม่</DialogTitle>
                    <DialogDescription>ไม่สามารถย้อนกลับการดำเนินการนี้ได้ การดำเนินการนี้จะลบข้อมูลพาร์ทเนอร์ออกอย่างถาวร</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => onDelete(deleteDialog.data?.id!)}>ยืนยัน</Button>
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