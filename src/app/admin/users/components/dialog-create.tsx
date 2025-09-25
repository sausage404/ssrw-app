"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import user from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import DialogForm from "./dialog-form"
import { createUser } from "@/data/user"
import { useRouter } from "next/navigation"
import { UserPlus } from "lucide-react"

export default () => {

    const router = useRouter();

    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof user.user>>({
        resolver: zodResolver(user.user),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "STUDENT",
            behaviorPoint: 100,
            level: 0,
            room: 0,
            no: 0
        }
    })

    const handleSubmit = (value: z.infer<typeof user.user>) => {
        toast.promise(
            async () => {
                await createUser(value);
            },
            {
                loading: "กําลังเพิ่มผู้ใช้งาน",
                success: "เพิ่มผู้ใช้งานเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน"
            }
        ).unwrap().then(() => {
            setOpen(false);
            router.refresh();
            form.reset();
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
           <Button size='icon'><UserPlus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เพิ่มผู้ใช้งาน</DialogTitle>
                    <DialogDescription>กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน</DialogDescription>
                </DialogHeader>
                <DialogForm form={form} onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    )
}