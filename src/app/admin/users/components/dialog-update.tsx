"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import user from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import DialogForm from "./dialog-form"
import { DialogData } from "@/hooks/use-dialog-data"
import { updateUser } from "@/data/user"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"

export default (dialog: DialogData<User>) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof user.user>>({
        resolver: zodResolver(user.user),
        defaultValues: {
            ...dialog.data,
            password: "not changed"
        }
    })

    const onSubmit = (value: z.infer<typeof user.user>) => {
        toast.promise(
            async () => {
                let password;
                if (value.password !== "not changed") {
                    if (value.password.length > 8) {
                        password = value.password;
                    } else {
                        throw new Error("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
                    }
                } else {
                    password = undefined;
                }
                await updateUser(dialog.data.id, {
                    ...value,
                    password
                });
            },
            {
                loading: "กําลังแก้ไขผู้ใช้งาน",
                success: "แก้ไขผู้ใช้งานเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการแก้ไขผู้ใช้งาน"
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
                    <DialogTitle>แก้ไขผู้ใช้งาน</DialogTitle>
                    <DialogDescription>กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน</DialogDescription>
                </DialogHeader>
                <DialogForm form={form} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}