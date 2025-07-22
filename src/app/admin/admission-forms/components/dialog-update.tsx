"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import DialogForm from "./dialog-form"
import { DialogData } from "@/hooks/use-dialog-data"
import { AdmissionForm } from "@prisma/client"
import { useRouter } from "next/navigation"
import { updateAdmissionForm } from "@/data/admission-form"
import admissionForm from "@/schema/admission-form"

export default (dialog: DialogData<AdmissionForm>) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof admissionForm.admissionForm>>({
        resolver: zodResolver(admissionForm.admissionForm),
        defaultValues: dialog.data
    })

    const onSubmit = (value: z.infer<typeof admissionForm.admissionForm>) => {
        toast.promise(
            async () => {
                await updateAdmissionForm(dialog.data.id, value);
            },
            {
                loading: "กําลังแก้ไขแบบรับสมัคร",
                success: "แก้ไขแบบรับสมัครเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการแก้ไขแบบรับสมัคร"
            }
        ).unwrap()
            .then(() => {
                dialog.setData(undefined);
                dialog.onOpenChange(false);
                router.refresh();
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
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
                    <DialogTitle>แก้ไขแบบรับสมัคร</DialogTitle>
                    <DialogDescription>กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน</DialogDescription>
                </DialogHeader>
                <DialogForm form={form} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}