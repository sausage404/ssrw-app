import { getAdmission } from "@/data/admission"
import { notFound } from "next/navigation"

export default async ({ params }: { params: Promise<{ id: string }> }) => {

    const id = (await params)?.id

    if (!id) {
        return notFound()
    }

    const data = await getAdmission({ where: { id: id } });

    if (!data) {
        return notFound()
    }

    return (
        <iframe src={data.pdf} className="w-full h-screen" />
    )
}