"use client";

import InputCopy from "@/components/input-copy";
import { Auth } from "@/lib/session";

export default ({ auth }: Readonly<{ auth: Auth }>) => {
    return (
        <div id="section-identify" className="rounded-lg border-accent border">
            <div className="p-4 rounded-t-lg">
                <h1 className="text-lg font-bold leading-tight tracking-tighter lg:leading-[2]">
                    ไอดีบัญชี
                </h1>
                <p className="text-muted-foreground text-sm">นี่คือ ID ผู้ใช้ของคุณภายในระบบ</p>
            </div>
            <div className="pb-4 px-4">
                <div className="flex gap-4">
                    <InputCopy defaultValue={auth.id} />
                </div>
            </div>
            <div className="p-4 border-t rounded-b-lg">
                <p className="text-muted-foreground text-sm">ใช้เมื่อโต้ตอบกับเว็บไซต์</p>
            </div>
        </div>
    )
}