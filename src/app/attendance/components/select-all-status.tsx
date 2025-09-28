import React from "react"
import attendance from "@/schema/attendance"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
                    }[
                        checks.every(c => c.status[col] === "null") ? "null" :
                        checks.every(c => c.status[col] === "present") ? "present" :
                        checks.every(c => c.status[col] === "absent") ? "absent" :
                        checks.every(c => c.status[col] === "leave") ? "leave" : "null"
                    ]} />
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