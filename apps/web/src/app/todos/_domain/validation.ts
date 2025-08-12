import { z } from 'zod';

export const createTodoSchema = z.object({
  text: z
    .string()
    .min(1, 'Todo text is required')
    .max(500, 'Todo text too long'),
});

export const updateTodoSchema = z.object({
  id: z.string().uuid('Invalid todo ID'),
  completed: z.boolean(),
});

export const deleteTodoSchema = z.object({
  id: z.string().uuid('Invalid todo ID'),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type DeleteTodoInput = z.infer<typeof deleteTodoSchema>;
