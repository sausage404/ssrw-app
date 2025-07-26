import { redirect } from "next/navigation";
import SectionStudent from "./components/section-student"
import SectionTeacher from "./components/section-teacher";
import { auth } from "@/lib/auth";
import { getUserById } from "@/data/user";

export const metadata = {
    title: 'Attendance'
}

export default async () => {
    const session = await auth();

    if (!session?.user) {
        return null
    }

    const user = await getUserById(session.user.id);

    if (!user) {
        return null;
    }

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    เช็คชื่อและการเข้าเรียน
                </h1>
            </div>
            {session?.user.role === "TEACHER" && <SectionTeacher />}
            {session?.user.role === "STUDENT" && <SectionStudent user={user} />}
        </div>
    )
}