import { z } from 'zod';

const prefix = z.enum(['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง', 'Mr.', 'Mrs.', 'Ms.'], { required_error: 'กรุณาเลือกคํานําหน้า' });

const role = z.enum(['ADMIN', 'TEACHER', 'STUDENT', 'SUPERVISOR'], { required_error: 'กรุณาเลือกบทบาท' });

export default {
    credentials: z.object({
        prefix: z.string().min(1),
        password: z.string().min(8).max(50),
        verified: z.literal(true, { invalid_type_error: 'ผู้ใช้ยังไม่ได้รับการยืนยัน' })
    }),
    user: z.object({
        prefix: z.string().min(1),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8),
        behaviorPoint: z.number().min(0),
        clubId: z.string().optional(),
        level: z.number().min(0),
        room: z.number().min(0),
        no: z.number().min(0),
        role
    }),
    changePassword: z.object({
        id: z.string(),
        current: z.string().min(8).max(50),
        new: z.string().min(8).max(50),
        confirm: z.string().min(8).max(50)
    }),
    moveClass: z.object({
        beforeLevel: z.number().min(0),
        beforeRoom: z.number().min(0),
        afterLevel: z.number().min(0),
        afterRoom: z.number().min(0),
    }),
    withClass: z.object({
        level: z.number().min(0),
        room: z.number().min(0)
    }),
    prefix,
    role
}