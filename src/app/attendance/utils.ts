"use server";

import { prisma } from "@/lib/prisma";
import attendance from "@/schema/attendance";
import { Attendance } from "@prisma/client";

export type AttendanceResponse = {
    period: (keyof typeof attendance.period)[]
} & Attendance

export async function getAttendanceTodayWithUserId(userId: string) {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        return await prisma.attendance.findFirst({
            where: {
                userId,
                studedAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        }) as AttendanceResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAttendance(level: number, room: number, date: Date) {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const attendanceList = await prisma.attendance.findMany({
            where: {
                User: {
                    level,
                    room,
                },
                studedAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        return attendanceList as AttendanceResponse[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function hasAttendance(level: number, room: number, date: Date) {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const attendanceList = await prisma.attendance.findMany({
            where: {
                User: {
                    level,
                    room
                },
                studedAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });
        return attendanceList.length > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function createAttendance(data: { id: string, status: string[] }[], date: Date) {
    try {
        await Promise.all(
            data.map(attendance =>
                prisma.attendance.create({
                    data: {
                        User: {
                            connect: {
                                id: attendance.id
                            }
                        },
                        period: attendance.status,
                        studedAt: date
                    }
                })
            )
        )
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateAttendance(data: { id: string, status: string[] }[], date: Date) {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        await Promise.all(
            data.map(attendance =>
                prisma.attendance.update({
                    where: {
                        userId: attendance.id,
                        studedAt: {
                            gte: startOfDay,
                            lte: endOfDay
                        }
                    },
                    data: {
                        period: { set: attendance.status }
                    }
                })
            )
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function changeBehaviorUser(data: { id: string, behavior: number }) {
    try {
        await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                behaviorPoint: data.behavior
            }
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function recordAttendance(id: string | undefined, data: string[], userId: string) {
    try {
        if (id) {
            await prisma.attendance.update({
                where: {
                    id
                },
                data: {
                    period: { set: data }
                }
            });
        } else {
            await prisma.attendance.create({
                data: {
                    User: {
                        connect: {
                            id: userId
                        }
                    },
                    period: data,
                    studedAt: new Date()
                }
            });
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function createLeave(data: { reason: string, id: string }) {
    try {
        await prisma.leave.create({
            data: {
                User: {
                    connect: {
                        id: data.id
                    }
                },
                reason: data.reason
            }
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteLeave(id: string) {
    try {
        await prisma.leave.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getLeaves(userId: string, date: Date) {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const leaveList = await prisma.leave.findMany({
            where: {
                User: {
                    id: userId
                },
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });
        return leaveList;
    } catch (error) {
        console.error(error);
        return [];
    }
}