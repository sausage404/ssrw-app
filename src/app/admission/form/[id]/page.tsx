import { notFound } from "next/navigation";
import Client from "./client"
import { db } from "@/config";

export const metadata = () => {
    return {
        title: 'Admission Form'
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