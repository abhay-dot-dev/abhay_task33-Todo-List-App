import { z } from 'zod'

export const todoSchema = z.object({
    description: z.string().min(1),
    completed: z.boolean()
})

export const patchTodoSchema = todoSchema.partial();

