"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import club from "@/schema/club"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { ClubPayload } from "./section-student"
import { createClub, deleteClub, getClub, updateClub } from "@/data/club"
import { User } from "@prisma/client"

export default ({ user }: Readonly<{ user: User }>) => {

    const [thisClub, setThisClub] = React.useState<ClubPayload | null>(null);

    const form = useForm<z.infer<typeof club.club>>({
        resolver: zodResolver(club.club),
        defaultValues: {
            name: "",
            userId: user.id,
            description: "",
            maxMember: 1
        }
    })

    const onSubmit = (value: z.infer<typeof club.club>) => {
        if (thisClub) {
            toast.promise(
                async () => {
                    await updateClub(thisClub.id, value);
                },
                {
                    loading: "กําลังแก้ไขชุมนุม",
                    success: "แก้ไขชุมนุมเรียบร้อย",
                    error: "เกิดข้อผิดพลาดในการแก้ไขชุมนุม"
                }
            ).unwrap().then(() => {
                window.location.reload();
            })
        } else {
            toast.promise(
                async () => {
                    await createClub({
                        ...value,
                        owner: {
                            connect: {
                                id: user.id
                            }
                        }
                    });
                },
                {
                    loading: "กําลังเพิ่มชุมนุม",
                    success: "เพิ่มชุมนุมเรียบร้อย",
                    error: "เกิดข้อผิดพลาดในการเพิ่มชุมนุม"
                }
            )
        }
    }

    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        toast.promise(
            async () => {
                await deleteClub(thisClub!.id);
            },
            {
                loading: "กําลังลบชุมนุม",
                success: "ลบชุมนุมเรียบร้อย",
                error: "เกิดข้อผิดพลาดในการลบชุมนุม"
            }
        ).unwrap().then(() => {
            window.location.reload();
        })
    }

    useEffect(() => {
        (async () => {
            const data = await getClub({
                where: { userId: user.id },
                include: { members: true, owner: true }
            }) as ClubPayload;
            if (data) {
                setThisClub(data);
                form.setValue("name", data.name);
                form.setValue("description", data.description);
                form.setValue("status", data.status);
                form.setValue("maxMember", data.maxMember);
            }
        })()
    }, [])

    return (
        <div className="w-full p-6 grid grid-cols-3 gap-6">
            <div className="col-span-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อชุมนุม</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>สถานะ</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value ? "0" : "1"}
                                            onValueChange={(value) => {
                                                field.onChange(value === "0")
                                            }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="ต้องการเปิดรับสมาชิกไหม" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">เปิดรับสมาชิก</SelectItem>
                                                <SelectItem value="1">ปิดรับสมาชิก</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxMember"
                            render={({ field: { value, onChange, ...field } }) => (
                                <FormItem>
                                    <FormLabel className="flex justify-between mb-1">
                                        <span>จํานวนสมาชิก</span>
                                        <span>{value}</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Slider value={[value]} onValueChange={([value]) => onChange(value)} max={30} min={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-4">
                            {thisClub ? (
                                <Button type="submit" disabled={form.formState.isSubmitting}>บันทึก</Button>
                            ) : (
                                <Button type="submit" disabled={form.formState.isSubmitting}>สร้าง</Button>
                            )}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button type="button" variant="destructive" size="sm">ลบ</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>ลบชุมนุม</DialogTitle>
                                        <DialogDescription>
                                            คุณแน่ใจหรือไม่ว่าต้องการลบชุมนุมนี้
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" size="sm" variant="destructive" onClick={onDelete}>ลบ</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button size="sm" variant="outline">ยกเลิก</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="col-span-2">
                {thisClub && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ลำดับ</TableHead>
                                <TableHead>ชื่อสมาชิก</TableHead>
                                <TableHead>ระดับชั้น</TableHead>
                                <TableHead>เลขที่</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {thisClub.members.length > 0 ? thisClub.members.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{member.prefix}{member.firstName} {member.lastName}</TableCell>
                                    <TableCell>ระดับชั้นปีที่ {member.level}/{member.room}</TableCell>
                                    <TableCell>{member.no}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">ไม่มีสมาชิก</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}