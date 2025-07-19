"use client"

import { Auth } from "@/lib/session"
import club from "@/schema/club"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import SectionTeacher from "./components/section-teacher"
import SectionStudent from "./components/section-student"

export default ({ auth }: Readonly<{ auth: Auth }>) => {

    

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    ชุมชน
                </h1>
            </div>
            {/* <SectionTeacher auth={auth} /> */}
            <SectionStudent auth={auth} />
        </div>
    )
}