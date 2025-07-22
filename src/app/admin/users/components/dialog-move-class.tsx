"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import user from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import React from "react"
import { toast } from "sonner"
import { updateClassInUser } from "@/data/user"
import { Input } from "@/components/ui/input"

export default () => {

    const [open, setOpen] = React.useState(false)

    const form = useForm<z.infer<typeof user.moveClass>>({
        resolver: zodResolver(user.moveClass),
        defaultValues: {
            beforeLevel: 0,
            beforeRoom: 0,
            afterLevel: 0,
            afterRoom: 0
        }
    })

    const onSubmit = (value: z.infer<typeof user.moveClass>) => {
        toast.promise(
            async () => {
                await updateClassInUser({
                    level: value.beforeLevel,
                    room: value.beforeRoom
                }, {
                    level: value.afterLevel,
                    room: value.afterRoom
                })
            },
            {
                loading: "กําลังย้ายระดับผู้ใช้งาน",
                success: "ย้ายระดับผู้ใช้งานเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการย้ายระดับผู้ใช้งาน"
            }
        ).unwrap().then(() => {
            setOpen(false);
            form.reset();
            location.reload();
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">ย้ายระดับผู้ใช้งาน</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ย้ายระดับผู้ใช้งาน</DialogTitle>
                    <DialogDescription>กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="beforeLevel"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>ชั้นเดิม</FormLabel>
                                        <FormControl>
                                            <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="beforeRoom"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>ห้องเดิม</FormLabel>
                                        <FormControl>
                                            <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="afterLevel"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>ชั้นใหม่</FormLabel>
                                        <FormControl>
                                            <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="afterRoom"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>ห้องใหม่</FormLabel>
                                        <FormControl>
                                            <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button type="submit" disabled={form.formState.isSubmitting}>บันทึก</Button>
                            <DialogClose asChild>
                                <Button variant="outline">ยกเลิก</Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}