import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import attendance from "@/schema/attendance"
import React from "react"

export default ({
    checks,
    setChecks,
    col,
}: {
    col: number
    checks: { id: string, status: (keyof typeof attendance.period)[] }
    setChecks: React.Dispatch<React.SetStateAction<{ id: string, status: (keyof typeof attendance.period)[] }[]>>
}) => {

    const onChange = (value: (keyof typeof attendance.period)) => {
        setChecks(prev => prev.map(c => c.id === checks.id ? { ...c, status: c.status.map((s, i) => i === col ? value : s) } : c))
    }

    return (
        <div className="w-full flex justify-center">
            <Select value={checks?.status[col] || "null"} onValueChange={onChange}>
                <SelectTrigger size="sm" className="w-fit">
                    <SelectValue placeholder={attendance.period[checks?.status[col] || "ไม่พบ"]} />
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