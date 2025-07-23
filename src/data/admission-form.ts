"use server";

import { prisma } from "@/lib/prisma";
import admissionForm from "@/schema/admission-form";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const getAdmissionForms = async (option: Prisma.AdmissionFormFindManyArgs) => {
    try {
        return await prisma.admissionForm.findMany(option);
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getAdmissionFormCount = async () => {
    try {
        return await prisma.admissionForm.count();
    } catch (error) {
        console.error(error);
        return 0
    }
}

export const createAdmissionForm = async (data: z.infer<typeof admissionForm.admissionForm>) => {
    try {
        const validatedData = admissionForm.admissionForm.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.admissionForm.create({ data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create admissionForm");
    }
}

export const updateAdmissionForm = async (id: string, data: Prisma.AdmissionFormUpdateInput) => {
    try {
        const validatedData = admissionForm.admissionForm.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.admissionForm.update({ where: { id }, data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update admissionForm");
    }
}

export const deleteAdmissionForm = async (id: string) => {
    try {
        await prisma.admissionForm.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete admissionForm");
    }
}