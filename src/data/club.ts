"use server"

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getClubs(option?: Prisma.ClubFindManyArgs) {
    try {
        return await prisma.club.findMany(option);
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getClub(option: Prisma.ClubFindFirstArgs) {
    try {
        return await prisma.club.findFirst(option);
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function getClubCount() {
    try {
        return await prisma.club.count();
    } catch (error) {
        console.error(error);
        return 0
    }
}

export async function deleteClub(id: string) {
    try {
        await prisma.club.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete club");
    }
}

export async function updateClub(id: string, data: Prisma.ClubUpdateInput) {
    try {
        await prisma.club.update({ where: { id }, data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update club");
    }
}

export async function createClub(data: Prisma.ClubUncheckedCreateInput) {
    try {
        await prisma.club.create({ data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create club");
    }
}