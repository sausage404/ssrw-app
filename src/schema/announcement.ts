import { z } from "zod";

export default {
    announcement: z.object({
        description: z.string(),
        isSummarize: z.boolean(),
        occurredAt: z.date()
    })
}