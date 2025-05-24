import { z } from 'zod';

const prefix = z.enum(['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง', 'Mr.', 'Mrs.', 'Ms.'], { required_error: 'กรุณาเลือกคํานําหน้า' });

const role = z.enum(['admin', 'teacher', 'student', 'supervisor']);

export default {
    credentials: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
        verified: z.literal(true, { invalid_type_error: 'ผู้ใช้ยังไม่ได้รับการยืนยัน' })
    }),
    user: z.object({
        id: z.string(),
        prefix,
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8),
        role
    }),
    changePassword: z.object({
        id: z.string(),
        current: z.string().min(8).max(50),
        new: z.string().min(8).max(50),
        confirm: z.string().min(8).max(50)
    }),
    prefix,
    role
}