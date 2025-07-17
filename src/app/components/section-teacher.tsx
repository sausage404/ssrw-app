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
                        <p>ที่ปรึกษาระดับชั้น {auth.level}/{auth.room}</p>
                    </div>
                    <div className="grid">
                        <p className="font-semibold">ผู้ดูแลชุมนุม</p>
                        <p>ICT And Technology</p>
                    </div>
                </div>
            </div>
        </div>
    )
}