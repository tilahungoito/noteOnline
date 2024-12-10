import { z } from "zod"
const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",

    }
    ),
    description: z.string().min(5,
        { message: "too short" }),
})
export default formSchema;