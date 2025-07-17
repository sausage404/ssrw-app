"use client";

import { useAuth } from "@/components/context/use-auth"
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CircleAlert, CircleEllipsisIcon, CircleMinus } from "lucide-react";

export default () => {
    const { auth } = useAuth();

    if (!auth) {
        return null;
    }

    return (
        <div className="container-fluid mx-auto w-full border-x border-t border-dashed p-4 sm:p-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-4">
                    <div className="grid">
                        <p className="font-semibold">{auth.prefix}{auth.firstName} {auth.lastName}</p>
                        <p>ระดับชั้น {auth.level}/{auth.room}</p>
                    </div>
                    <div className="grid">
                        <p className="font-semibold">ชุมนุม</p>
                        <p>ICT And Technology</p>
                    </div>
                    <div className="grid">
                        <p className="font-semibold">ความประพฤติ</p>
                        <p>{auth.behaviorPoint}/100 คะแนน</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="destructive">เข้าโรงเรียน ยังไม่ทำการ</Badge>
                    <Badge variant="outline">เข้าแถว ลา</Badge>
                    <Badge variant="outline">คาบ 1 ลา</Badge>
                    <Badge variant="outline">คาบ 2 ลา</Badge>
                    <Badge variant="outline">คาบ 3 มา</Badge>
                    <Badge variant="outline">คาบ 4 มา</Badge>
                    <Badge variant="outline">คาบ 5 มา</Badge>
                    <Badge variant="outline">คาบ 6 มา</Badge>
                    <Badge variant="outline">คาบ 7 ขาด</Badge>
                    <Badge variant="outline">คาบ 8 ไม่พบ</Badge>
                </div>
            </div>
        </div>
    )
}