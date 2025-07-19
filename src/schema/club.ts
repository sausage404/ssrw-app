import { z } from "zod";

export default {
    club: z.object({
        id: z.string(),
        name: z.string().min(3),
        description: z.string().min(10),
        status: z.boolean(),
        userId: z.string(),
        maxMember: z.number().min(5).max(30)
    })
}