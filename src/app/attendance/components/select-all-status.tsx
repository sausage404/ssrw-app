import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import attendance from "@/schema/attendance"
import React from "react"
import { z } from "zod"

export default ({
    checks,
    setChecks,
    col,
}: {
    isChangeAll?: boolean,
    col: number
    checks: { id: string, status: (keyof typeof attendance.period)[] }[],
    setChecks: React.Dispatch<React.SetStateAction<{ id: string, status: (keyof typeof attendance.period)[] }[]>>
}) => {

    const onChange = (value: (keyof typeof attendance.period)) => {
        setChecks(prev => prev.map(c => ({
            ...c,
            status: c.status.map((s, i) => i === col ? value : s)
        })))
    }

    return (
        <div className="py-2 w-full flex justify-center">
            <Select onValueChange={onChange}>
                <SelectTrigger size="sm" className="w-fit">
                    <SelectValue placeholder={{
                        null: "ไม่พบ",
                        present: "มา",
                        absent: "ขาด",
                        leave: "ลา"
                    }[checks.find(s => s.status.length > 0)?.status[0] || "null"]} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="null">ไม่พบ</SelectItem>
                    <SelectItem value="present">มา</SelectItem>
                    <SelectItem value="absent">ขาด</SelectItem>
                    <SelectItem value="leave">ลา</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}