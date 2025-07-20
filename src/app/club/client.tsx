"use client"

import SectionTeacher from "./components/section-teacher"
import SectionStudent from "./components/section-student"
import { User } from "@prisma/client"

export default ({ user }: Readonly<{ user: User }>) => {
    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    ชุมชน
                </h1>
            </div>
            {user.role === "TEACHER" && <SectionTeacher auth={user} />}
            {user.role === "STUDENT" && <SectionStudent auth={user} />}
        </div>
    )
}