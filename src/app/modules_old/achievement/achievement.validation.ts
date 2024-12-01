import { z } from "zod";

const achievementValidationSchema = z.object({
    body: z.object({
        achievement: z.string({required_error: 'Achievement is required'}),
    })
})

export default achievementValidationSchema;