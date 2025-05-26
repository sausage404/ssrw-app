import { notFound } from "next/navigation";
import Client from "./client"
import { db } from "@/config";
import admissionForm from "@/schema/admission-form";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const exists = await db().admissionForm.get(id);

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

    const exists = await db().admissionForm.get(id);

    const length = db().admission.size;

    if (!exists) {
        return notFound();
    }

    return <Client data={exists} length={length} />
}