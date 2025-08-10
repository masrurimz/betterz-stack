import { eq } from 'drizzle-orm';
import * as z from 'zod';
import { todo } from '@/db/schema/todo';
import { publicProcedure } from '@/lib/orpc';

export const listTodos = publicProcedure.handler(async ({ context }) => {
  return await context.db.select().from(todo);
});

export const addTodo = publicProcedure
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

export const deleteTodo = publicProcedure
  .input(z.object({ id: z.string().uuid() }))
  .handler(async ({ input, context }) => {
    await context.db.delete(todo).where(eq(todo.id, input.id));
    return { success: true };
  });
