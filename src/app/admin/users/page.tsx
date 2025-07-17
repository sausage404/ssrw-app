"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import DialogCreate from "./components/dialog-create"
import DialogMoveClass from "./components/dialog-move-class"

export default () => {
    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    จัดการผู้ใช้งาน
                </h1>
                <div className="flex gap-4">
                    <DialogCreate />
                    <DialogMoveClass />
                    <Button asChild size="sm" variant="outline">
                        <Link target="_blank" href="https://docs.google.com/spreadsheets/d/1HTE7dlrdO6cBwrNpKVZ1w7j_LOD_emP6Kps6gp0ZG6s/edit">
                            แก้ไขเพิ่มเติม
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="w-full p-6">
                <iframe
                    className="w-full h-[60vh] border-0"
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSJwAsAT56KPKttFxfVVctdfVQZkc0pFo2psitXb-GKhm0wpXiQnFDZEuSv0ICuWt_nhpiGGA5puxiD/pubhtml?gid=1602518680&amp;single=true&amp;widget=true&amp;headers=false"
                />
            </div>
        </div>
    )
}