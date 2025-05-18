import { z } from 'zod';

export default {
    credentials: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
        verified: z.literal(true, { message: 'User is not verified' })
    }),
    user: z.object({
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
        role: z.enum(['admin', 'teacher', 'student', 'supervisor'])
    })
}