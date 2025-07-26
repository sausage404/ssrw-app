import { User } from "@prisma/client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { changeBehaviorUser } from "../utils";

export default ({
    student,
    setStudents,
    open,
    setOpen
}: {
    student: User,
    setStudents: React.Dispatch<React.SetStateAction<User[]>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [point, setPoint] = React.useState(0);

    const handleBehavior = (point: number) => {
        toast.promise(async () => {
            const calculatedbehavior = student.behaviorPoint + point;
            const behavior = calculatedbehavior > 100 ? 100 : calculatedbehavior < 0 ? 0 : calculatedbehavior;
            await changeBehaviorUser({
                id: student.id,
                behavior
            });
            setStudents(prev => prev.map(user => user.id === student.id ? { ...user, behaviorPoint: behavior } : user));
            setOpen(false);
            setPoint(0);
        }, {
            loading: 'กําลังปรับคะแนนความประพฤติ',
            success: 'ปรับคะแนนความประพฤติสําเร็จ',
            error: 'เกิดข้อผิดพลาดในการปรับคะแนนความประพฤติ'
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ปรับคะแนนความประพฤติ</DialogTitle>
                    <DialogDescription>
                        คุณต้องการปรับคะแนนความประพฤติหรือไม่ ขณะนี้คะแนนความประพฤติของ {student.prefix}{student.firstName} {student.lastName} คือ {student.behaviorPoint}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid items-center gap-2">
                        <Label>คะแนนความประพฤติ</Label>
                        <Input value={isNaN(point) ? 0 : point} onChange={(e) => setPoint(parseInt(e.target.value))} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Button variant="destructive" onClick={() => handleBehavior(-point)}>ลดคะแนน</Button>
                        <Button onClick={() => handleBehavior(point)}>เพิ่มคะแนน</Button>
                        <DialogClose asChild>
                            <Button variant="outline">ยกเลิก</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}