"use client"

import React from "react"
import { User } from "@prisma/client"
import SectionInformation from "./components/section-information"
import SectionIdentify from "./components/section-identify"
import SectionPassword from "./components/section-password"

export default ({ user }: { user: User }) => {
    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    จัดการบัญชี
                </h1>
            </div>
            <div className="w-full p-6 flex flex-col gap-6">
                <SectionInformation user={user} />
                <SectionIdentify user={user} />
                <SectionPassword user={user} />
            </div>
        </div>
    );
};