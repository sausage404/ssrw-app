"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import DialogCreate from "./components/dialog-create"
import DialogMoveClass from "./components/dialog-move-class"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@prisma/client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default ({ user }: { user: User[] }) => {
    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    จัดการผู้ใช้งาน
                </h1>
                <div className="flex flex-wrap gap-4">
                    <DialogCreate />
                    <DialogMoveClass />
                </div>
            </div>
            <div className="w-full p-6">
                <ScrollArea>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ไอดี</TableHead>
                                <TableHead>อีเมล</TableHead>
                                <TableHead>ชื่อ</TableHead>
                                <TableHead>ระดับชั้น</TableHead>
                                <TableHead>เลขที่</TableHead>
                                <TableHead>ความประพฤติ</TableHead>
                                <TableHead>บทบาท</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user.length > 0 ? user.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.prefix}{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>ระดับชั้นปีที่ {user.level}/{user.room}</TableCell>
                                    <TableCell>{user.no}</TableCell>
                                    <TableCell>{user.behaviorPoint}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">ไม่มีสมาชิก</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}