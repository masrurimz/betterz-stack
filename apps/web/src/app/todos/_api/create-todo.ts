import * as z from 'zod';
import { todo } from '@/db/schema/todo';
import { publicProcedure } from '@/lib/orpc';

export const createTodo = publicProcedure
  .input(z.object({ text: z.string().min(1) }))
  .handler(async ({ input, context }) => {
    const [newTodo] = await context.db
      .insert(todo)
      .values({
        text: input.text,
      })
      .returning();
    return newTodo;
  });
