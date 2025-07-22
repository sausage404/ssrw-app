"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt'
import user from "@/schema/user";
import { z } from "zod";
import { Prisma, User } from "@prisma/client";

export const getUsers = async (option: Prisma.UserFindManyArgs) => {
    try {
        return await prisma.user.findMany(option);
    } catch (error) {
        console.error(error);
        return []
    }
}

export const getUserCount = async () => {
    try {
        return await prisma.user.count();
    } catch (error) {
        console.error(error);
        return 0
    }
}

export const createUser = async (data: z.infer<typeof user.user>) => {
    try {
        const validatedData = user.user.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.user.create({ data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
    }
}

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
    try {
        const validatedData = user.user.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        await prisma.user.update({ where: { id }, data: validatedData.data });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
    }
}

export const deleteUser = async (id: string) => {
    try {
        await prisma.user.delete({ where: { id } });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user");
    }
}

interface ClassMap {
    level: number;
    room: number;
}

export const updateClassInUser = async (beforeClass: ClassMap, afterClass: ClassMap) => {
    try {
        await prisma.user.updateMany({
            where: {
                level: beforeClass.level,
                room: beforeClass.room
            },
            data: {
                level: afterClass.level,
                room: afterClass.room
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user with class");
    }
}

export const updatePasswordInUser = async (id: string, data: z.infer<typeof user.changePassword>) => {
    try {
        const validatedData = user.changePassword.safeParse(data);
        if (!validatedData.success) {
            throw new Error(validatedData.error.message);
        }
        const { current, new: newPassword } = validatedData.data;
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (!bcrypt.compareSync(current, existingUser.password)) {
            throw new Error("New password cannot be the same as the current password");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await prisma.user.update({ where: { id }, data: { password: hashedPassword } });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user password");
    }
}