import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import admissionForm from "@/schema/admission-form";
import { UserPlus2 } from "lucide-react";
import Link from "next/link";

export const metadata = () => {
    title: 'Admission'
}

export const dynamic = 'force-dynamic';

export default async () => {
    const data = await prisma.admissionForm.findMany({})

    const Card = ({ form }: { form: typeof data[number] }) => {
        const openedAt = form.openedAt.toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        const closedAt = form.closedAt.toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        const isOpen = new Date() >= form.openedAt && new Date() <= form.closedAt
        return (
            <div>
                <h3 className="flex gap-2 items-center text-xl font-semibold leading-tight tracking-tighter lg:leading-[1.5]">
                    {admissionForm.typeView[form.type]} {admissionForm.roundView[form.round]}
                </h3>
                <p className="max-w-2xl text-sm font-light text-muted-foreground sm:text-base">
                    ระดับชั้นมัธยมศึกษาปีที่ {form.class}
                </p>
                <p className="text-sm">
                    {openedAt} <span className="text-gray-500">ถึง</span> {closedAt}
                </p >
                <div className="pt-3">
                    <Button variant="outline" size="sm" disabled={!isOpen} asChild>
                        {isOpen ? (
                            <Link href={`/admission/form/${form.id}`}>เปิดรับสมัคร</Link>
                        ) : (
                            <span>ปิดรับสมัคร</span>
                        )}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="p-8">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    ระบบรับสมัครนักเรียน
                </h1>
            </div>
            <div className="border-t border-dashed p-8 flex flex-col gap-8">
                <p className="text-muted-foreground flex gap-2 items-center">
                    <UserPlus2 className="w-4 h-4" /> {admissionForm.typeView.NEW}
                </p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full gap-8">
                    {data.filter((form) => form.type === "NEW").map((form, index) => (
                        <Card key={index} form={form} />
                    ))}
                </div>
            </div>
            <div className="border-t border-dashed p-8 flex flex-col gap-8">
                <p className="text-muted-foreground flex gap-2 items-center">
                    <UserPlus2 className="w-4 h-4" /> {admissionForm.typeView.MOVE}
                </p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full gap-8">
                    {data.filter((form) => form.type === "MOVE").map((form, index) => (
                        <Card key={index} form={form} />
                    ))}
                </div>
            </div>
        </div>
    )
}
