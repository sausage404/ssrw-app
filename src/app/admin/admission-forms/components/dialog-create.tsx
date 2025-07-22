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
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import DialogForm from "./dialog-form"
import { useRouter } from "next/navigation"
import admissionForm from "@/schema/admission-form"
import { createAdmissionForm } from "@/data/admission-form"

export default () => {

    const router = useRouter();

    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof admissionForm.admissionForm>>({
        resolver: zodResolver(admissionForm.admissionForm),
        defaultValues: {
            openedAt: new Date(),
            closedAt: new Date()
        }
    })

    const handleSubmit = (value: z.infer<typeof admissionForm.admissionForm>) => {
        toast.promise(
            async () => {
                await createAdmissionForm(value);
            },
            {
                loading: "กําลังเพิ่มแบบรับสมัคร",
                success: "เพิ่มแบบรับสมัครเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการเพิ่มแบบรับสมัคร"
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
                <Button>เพิ่มแบบรับสมัคร</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เพิ่มแบบรับสมัคร</DialogTitle>
                    <DialogDescription>กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน</DialogDescription>
                </DialogHeader>
                <DialogForm form={form} onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    )
}