"use server";

import { prisma } from "@/lib/prisma";
import admission from "@/schema/admission";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export async function getAdmission(option: Prisma.AdmissionFindFirstArgs) {
    try {
        return await prisma.admission.findFirst(option);
    } catch (error) {
        console.error(error);
        return null
    }
}

export const getAdmissions = async (option: Prisma.AdmissionFindManyArgs) => {
    try {
        return await prisma.admission.findMany(option);
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getAdmissionCount = async () => {
    try {
        return await prisma.admission.count();
    } catch (error) {
        console.error(error);
        return 0
    }
}

export const createAdmission = async (data: z.infer<typeof admission.admission>) => {
    try {
        const validatedData = admission.admission.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.admission.create({ data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create admission");
    }
}

export const updateAdmission = async (id: string, data: Prisma.AdmissionUpdateInput) => {
    try {
        const validatedData = admission.admission.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.admission.update({ where: { id }, data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update admission");
    }
}

export const deleteAdmission = async (id: string) => {
    try {
        await prisma.admission.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete admission");
    }
}