import React from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogData } from "@/hooks/use-dialog-data"
import { Announcement } from "@prisma/client"
import announcement from "@/schema/announcement"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createAnnouncement } from "@/data/announcement"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThaiCalendarPopover } from "@/components/module/thai-calendar-popover"

export default () => {
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
                await createAnnouncement(value);
            },
            {
                loading: "กําลังเพิ่มประชาสัมพันธ์",
                success: "เพิ่มประชาสัมพันธ์เรียบร้อย",
                error: "เกิดข้อผิดพลาดในการเพิ่มประชาสัมพันธ์"
            }
        ).unwrap().then(() => {
            setOpen(false);
            form.reset();
            window.location.reload();
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">เพิ่มประชาสัมพันธ์</Button>
            </DialogTrigger>
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
    )
}