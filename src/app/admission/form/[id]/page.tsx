import { notFound } from "next/navigation";
import Client from "./client"
import admissionForm from "@/schema/admission-form";
import { prisma } from "@/lib/prisma";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const exists = await prisma.admissionForm.findUnique({ where: { id } });

    if (!exists) {
        return notFound();
    }

    return {
        title: `${admissionForm.typeView[exists.type]} ${admissionForm.roundView[exists.round]} ระดับชั้น ม.${exists.class}`
    }
}

export default async (
    { params }: { params: Promise<{ id: string }> }
) => {
    const id = (await params).id;

    const exists = await prisma.admissionForm.findUnique({ where: { id } });

    const length = await prisma.admission.count();

    if (!exists) {
        return notFound();
    }

    return <Client data={exists} length={length} />
}