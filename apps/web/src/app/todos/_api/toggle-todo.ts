import { eq } from 'drizzle-orm';
import * as z from 'zod';
import { todo } from '@/lib/db/schema/todo';
import { publicProcedure } from '@/lib/orpc';

export const toggleTodo = publicProcedure
  .input(z.object({ id: z.string().uuid(), completed: z.boolean() }))
  .handler(async ({ input, context }) => {
    const [updatedTodo] = await context.db
      .update(todo)
      .set({ completed: input.completed })
      .where(eq(todo.id, input.id))
      .returning();
    return updatedTodo;
  });