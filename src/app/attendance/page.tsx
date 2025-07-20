import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import SectionStudent from "./components/section-student"
import SectionTeacher from "./components/section-teacher";

export const metadata = {
    title: 'Attendance'
}

export default async () => {
    const auth = await getCurrentUser();

    if (!auth) {
        return redirect("/auth")
    }

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    เช็คชื่อและการเข้าเรียน
                </h1>
            </div>
            {auth.role === "TEACHER" && <SectionTeacher />}
            {auth.role === "STUDENT" && <SectionStudent auth={auth} />}
        </div>
    )
}