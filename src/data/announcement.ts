"use server";

import { prisma } from "@/lib/prisma";
import announcement from "@/schema/announcement";
import { z } from "zod";

export async function createAnnouncement(data: z.infer<typeof announcement.announcement>) {
    try {
        const validatedData = announcement.announcement.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.announcement.create({ data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create announcement");
    }
}

export async function deleteAnnouncement(id: string) {
    try {
        await prisma.announcement.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete announcement");
    }
}