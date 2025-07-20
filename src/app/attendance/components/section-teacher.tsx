"use client"

import React from "react"
import InputUsersWithClass from "../components/input-users-with-class"
import { User } from "@prisma/client"
import { ThaiCalendarPopover } from "@/components/thai-calendar-popover"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SelectAllStatus from "../components/select-all-status"
import SelectStatus from "../components/select-status"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createAttendance, getAttendance, hasAttendance, updateAttendance } from "../utils"
import attendance from "@/schema/attendance"
import DialogBehavior from "../components/dialog-behavior"

export default () => {

    const [students, setStudents] = React.useState<User[]>([])
    const [date, setDate] = React.useState(new Date())
    const [checks, setChecks] = React.useState<{ id: string, status: (keyof typeof attendance.period)[] }[]>([])
    const [behaviorDialog, setBehaviorDialog] = React.useState(false);
    const [behaviorUser, setBehaviorUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        (async () => {
            if (students.length === 0) return
            const attendanceList = await getAttendance(students[0].level, students[0].room, date)
            if (attendanceList.length > 0) {
                setChecks(attendanceList.map(attendance => ({
                    id: attendance.userId,
                    status: attendance.period
                })))
            } else {
                setChecks(students.map(user => ({ id: user.id, status: Array.from({ length: 10 }).map(() => 'null') })))
            }
        })()
    }, [students, date])

    const onSubmit = async () => {
        toast.promise(async () => {
            if (await hasAttendance(students[0].level, students[0].room, date)) {
                await updateAttendance(checks, date)
            } else {
                await createAttendance(checks, date)
            }
        }, {
            loading: 'กําลังบันทึก',
            success: 'บันทึกสําเร็จ',
            error: 'บันทึกไม่สําเร็จ'
        })
    }

    return (
        <React.Fragment>
            <div className="px-4 md:px-8 py-4 gap-4 border-b border-dashed">
                <div className="flex flex-wrap justify-between gap-4">
                    <InputUsersWithClass setStudents={setStudents} />
                    {behaviorUser && (
                        <DialogBehavior setStudents={setStudents} student={behaviorUser} open={behaviorDialog} setOpen={setBehaviorDialog} />
                    )}
                    <div className="grid grid-cols-3 gap-4 items-end md:w-auto w-full">
                        <div className="col-span-2">
                            <Label className="mb-2">วันที่</Label>
                            <ThaiCalendarPopover label="เลือกวัน" className="sm:w-[10rem] w-full" value={date} onChange={(date) => date && setDate(date)} />
                        </div>
                        <Button disabled={students.length === 0} onClick={onSubmit} type="submit">บันทึก</Button>
                    </div>
                </div>
            </div>
            <div>
                <Table className="**:border-dashed">
                    <TableHeader>
                        <TableRow className="divide-x *:text-center">
                            <TableHead rowSpan={3}>เลขที่</TableHead>
                            <TableHead rowSpan={3}>ชื่อ</TableHead>
                            <TableHead rowSpan={3}>ความประพฤติ</TableHead>
                            <TableHead colSpan={10}>คาบ</TableHead>
                        </TableRow>
                        <TableRow className="divide-x *:text-center">
                            <TableHead rowSpan={2}>เข้าโรงเรียน</TableHead>
                            <TableHead>หน้าเสาธง</TableHead>
                            <TableHead>คาบ 1</TableHead>
                            <TableHead>คาบ 2</TableHead>
                            <TableHead>คาบ 3</TableHead>
                            <TableHead>คาบ 4</TableHead>
                            <TableHead>คาบ 5</TableHead>
                            <TableHead>คาบ 6</TableHead>
                            <TableHead>คาบ 7</TableHead>
                            <TableHead>คาบ 8</TableHead>
                        </TableRow>
                        <TableRow className="divide-x *:text-center">
                            {Array.from({ length: 9 }).map((_, il) => (
                                <TableHead key={il}>
                                    <SelectAllStatus checks={checks} setChecks={setChecks} col={il + 1} />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.length > 0 && checks.length > 0 ? students.map((user, index) => (
                            <TableRow className="divide-x" key={index}>
                                <TableCell className="text-center">{user.no}</TableCell>
                                <TableCell>{user.prefix}{user.firstName} {user.lastName}</TableCell>
                                <TableCell>
                                    <div className="w-full flex items-center justify-center">
                                        <Button type="button" variant="outline" size="sm" onClick={() => {
                                            setBehaviorUser(user)
                                            setBehaviorDialog(true)
                                        }}>{user.behaviorPoint} (ดู)</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">{attendance.period[checks[index]?.status?.[0] ?? 'null'] || 'ไม่พบ'}</TableCell>
                                {Array.from({ length: 9 }).map((_, il) => (
                                    <TableCell key={il}>
                                        <SelectStatus checks={checks.find(c => c.id === user.id)!} setChecks={setChecks} col={il + 1} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={14} className="text-center">ไม่มีสมาชิก</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </React.Fragment>
    )
}