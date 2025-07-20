import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DialogTrigger } from "@radix-ui/react-dialog"
import React from "react"
import { toast } from "sonner"
import { createLeave } from "../utils"
import { Auth } from "@/lib/session"

export default ({ auth }: Readonly<{ auth: Auth }>) => {
    const [reason, setReason] = React.useState("");

    const onSubmit = async () => {
        toast.promise(async () => {
           const result = await createLeave({ reason, id: auth.id });
           if (result) {
               window.location.reload();
           }
        }, {
            loading: 'กําลังบันทึกการลา',
            success: 'บันทึกการลาสําเร็จ',
            error: 'บันทึกการลาไม่สําเร็จ'
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    ลงบันทึกการลาวันนี้
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ลงบันทึกการลาวันนี้</DialogTitle>
                    <DialogDescription>
                        คุณแน่ใจหรือไม่ว่าต้องการลงบันทึกการลาวันนี้ กรุณาระบุเหตุผล และการลาเป็นการลาทั้งวันหรือบ้างคาบ
                    </DialogDescription>
                </DialogHeader>
                <Textarea placeholder="เหตุผลการลา" onChange={(e) => setReason(e.target.value)} value={reason} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" size="sm" variant="destructive" onClick={onSubmit}>บันทึก</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button size="sm" variant="outline">ยกเลิก</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}