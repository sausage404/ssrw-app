"use client"

import announcement from "@/schema/announcement"
import { z } from "zod"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/context/use-auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThaiCalendarPopover } from "@/components/thai-calendar-popover"
import axios from "axios"
import React from "react"
import { toast } from "sonner"
import Link from "next/link"
import { Announcement } from "@prisma/client"

export default ({ data }: { data: Announcement[] }) => {

    const { auth } = useAuth();

    const [open, setOpen] = React.useState(false);

    const form = useForm<z.infer<typeof announcement.announcement>>({
        resolver: zodResolver(announcement.announcement),
        defaultValues: {
            description: "",
            isSummarize: false,
            occurredAt: new Date()
        }
    })

    const onSubmit = async (value: z.infer<typeof announcement.announcement>) => {
        toast.promise(
            async () => {
                const { data } = await axios.post("/api/data/announcement", value);
                if (data.success) {
                    setOpen(false);
                    form.reset();
                    window.location.reload();
                } else {
                    console.log(data.message);
                    throw new Error(data.message);
                }
            },
            {
                loading: "กําลังเพิ่มประชาสัมพันธ์",
                success: "เพิ่มประชาสัมพันธ์เรียบร้อย",
                error: "เกิดข้อผิดพลาดในการเพิ่มประชาสัมพันธ์"
            }
        )
    }

    const dataIsSummarize = data.filter((item) => item.isSummarize);
    const dataIsNotSummarize = data.filter((item) => !item.isSummarize);

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    ประชาสัมพันธ์
                </h1>
                <div className="flex gap-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                        {auth?.role === "ADMIN" && (
                            <DialogTrigger asChild>
                                <Button size="sm">เพิ่มประชาสัมพันธ์</Button>
                            </DialogTrigger>
                        )}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>เพิ่มประชาสัมพันธ์</DialogTitle>
                                <DialogDescription>
                                    กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>รายละเอียด</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="isSummarize"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>รูปแบบ</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value === "0")
                                                            }}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="เลือกรูปแบบ" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="0">ประชาสัมพันธ์</SelectItem>
                                                                <SelectItem value="1">สรุปหน้าเสาธง</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="occurredAt"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>เกิดเมื่อ</FormLabel>
                                                    <FormControl>
                                                        <ThaiCalendarPopover label="เลือกวัน" {...field} />
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
                </div>
            </div>
            <div className="w-full p-6 md:grid-cols-2 grid gap-4 sm:gap-8">
                <div>
                    <p className="text-muted-foreground flex gap-2 items-center">สรุปหน้าเสาธง</p>
                    <Accordion defaultValue={dataIsNotSummarize[0]?.id} type="single" collapsible>
                        {dataIsNotSummarize.filter(item => !item.isSummarize).map(item => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger>{item.occurredAt.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}</AccordionTrigger>
                                <AccordionContent>{item.description}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                <div>
                    <p className="text-muted-foreground flex gap-2 items-center">ประชาสัมพันธ์</p>
                    <Accordion defaultValue={dataIsSummarize[0]?.id} type="single" collapsible>
                        {dataIsSummarize.filter(item => item.isSummarize).map(item => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger>{item.occurredAt.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}</AccordionTrigger>
                                <AccordionContent>{item.description}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}