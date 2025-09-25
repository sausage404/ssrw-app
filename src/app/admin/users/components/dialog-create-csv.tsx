"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import user from "@/schema/user"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { toast } from "sonner"
import { createUsers } from "@/data/user"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Grid2x2Plus } from "lucide-react"

export default () => {

    const router = useRouter();

    const [open, setOpen] = React.useState(false)

    const [csv, setCsv] = React.useState("");

    const [data, setData] = React.useState<z.infer<typeof user.user>[]>([]);

    const form = useForm<z.infer<typeof user.user>>({
        resolver: zodResolver(user.user),
        defaultValues: {
            prefix: "--",
            firstName: "--",
            lastName: "--",
            email: "test@ssrw.ac.th",
            password: "12345678",
            role: "STUDENT",
            behaviorPoint: 100,
            level: 0,
            room: 0,
            no: 0
        }
    })

    const onSubmit = (_: z.infer<typeof user.user>) => {
        toast.promise(
            async () => {
                await createUsers(data);
            },
            {
                loading: "กําลังเพิ่มผู้ใช้งาน",
                success: "เพิ่มผู้ใช้งานเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน"
            }
        ).unwrap().then(() => {
            setOpen(false);
            form.reset();
            router.refresh();
        })
    }

    React.useEffect(() => {
        if (csv.trim() === "") return;
        if (csv.search(/\n+/) === -1) return
        const rows = csv.trim()
            .split("\n")
            .map(line => {
                const [index, id, firstName, lastName] = line.trim().split(/\s+/);
                const prefix = user.prefix.options.find((i) => firstName.split(i).length > 1) ?? "";
                return {
                    prefix: prefix,
                    no: Number(index),
                    email: `${id}@ssrw.ac.th`,
                    firstName: firstName.replace(prefix, ""),
                    lastName,
                    password: form.watch("password"),
                    role: form.watch("role"),
                    behaviorPoint: form.watch("behaviorPoint"),
                    level: form.watch("level"),
                    room: form.watch("room")
                } satisfies z.infer<typeof user.user>;
            });

        setData(rows);
    }, [csv, form.watch("room"), form.watch("level")])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='icon'><Grid2x2Plus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เพิ่มผู้ใช้งาน</DialogTitle>
                    <DialogDescription>กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Textarea placeholder="กรุณากรอกข้อมูล CSV" value={csv} onChange={(e) => setCsv(e.target.value)} className="h-96" />
                        <div className="grid grid-cols-3 gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>ระดับชั้น</FormLabel>
                                        <FormControl>
                                            <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="room"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>ห้อง</FormLabel>
                                        <FormControl>
                                            <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>บทบาท</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="บทบาท" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {user.role.options.map((role, index) => (
                                                        <SelectItem key={index} value={role}>
                                                            {role}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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