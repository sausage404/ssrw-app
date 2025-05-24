"use client"

import { Auth } from "@/lib/session"
import React from "react"
import SectionInformation from "./components/section-information"
import SectionIdentify from "./components/section-identify"
import SectionPassword from "./components/section-password"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default ({ auth }: { auth: Auth }) => {
    
    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70,
                behavior: "smooth",
            })
        }
    };

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    จัดการบัญชี
                </h1>
            </div>
            <div className="flex">
                <div className="w-[18rem] md:border-e p-6 border-dashed">
                    <p className="text-muted-foreground text-sm px-2 py-1.5">Shortcuts</p>
                    {[
                        { id: "section-information", title: "ข้อมูลส่วนตัว" },
                        { id: "section-identify", title: "ไอดีบัญชี" },
                        { id: "section-password", title: "รหัสผ่าน" },
                    ].map((item) => (
                        <Button
                            variant="ghost"
                            key={item.id}
                            onClick={() => scrollToId(item.id)}
                            className="w-full justify-start"
                            asChild
                        >
                            <Link href={`#${item.id}`}>{item.title}</Link>
                        </Button>
                    ))}
                </div>
                <div className="w-full p-6 border-dashed flex flex-col gap-6">
                    <SectionInformation auth={auth} />
                    <SectionIdentify auth={auth} />
                    <SectionPassword auth={auth} />
                </div>
            </div>
        </div>
    );
};