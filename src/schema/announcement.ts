import { z } from "zod";

export default {
    announcement: z.object({
        id: z.string(),
        description: z.string(),
        isSummarize: z.boolean(),
        occurredAt: z.date()
    })
}